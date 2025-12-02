import React, { Component } from "react";
import axios from "axios";
import Navbar from './../../Components/Navbar/Navbar';

import Loader from "react-loader-spinner"
import ScrollToTop from './../../Components/ScrollToTop/ScrollToTop';

export default class People extends Component {

    isLoading = false;
    controller = new AbortController();

    constructor() {
        super();

        this.state = {
            people: [],
            page: 1,
            prevY: 1,
            isFull: false
        };

        window.scrollTo(0, 0);
    }

    getPeople(page) {

        this.isLoading = true;

        axios.get(`https://api.themoviedb.org/3/person/popular?api_key=0c46ad1eb5954840ed97f5e537764be8&page=${page}`)
            .then(res => {

                let { results } = res.data;

                this.setState({
                    people: [...this.state.people, ...results],
                })
            });
    }

    componentDidMount() {
        this.getPeople(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities) {

        const y = entities[0].boundingClientRect.y;

        if (this.state.prevY > y) {
            const curPage = this.state.page + 1;

            this.getPeople(curPage);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    componentWillUnmount() {
        this.isLoading = false;
        this.controller.abort();
    }

    goToPersonAbout = (actor) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/aboutPerson/${actor.id}`, actor)
    }

    render() {
        return (
            <>
                <Navbar />

                <ScrollToTop />

                <section className="container people" style={{ minHeight: "71vh" }} >
                    {
                        this.isLoading ?
                            (
                                <div className="row">
                                    {
                                        React.Children.toArray(  // that handle a unique key itself
                                            this.state.people.map((value) => {
                                                return (
                                                    <div className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body" onClick={() => this.goToPersonAbout(value)}>

                                                        <div className="text-center position-relative mb-2">

                                                            <div className="captionLayer overflow-hidden mb-2">
                                                                <img src={value.profile_path !== null ? `https://image.tmdb.org/t/p/original/${value.profile_path}` : 'https://via.placeholder.com/468x700/1E2D55 ?Text=Digital.com'} width="100%" height="350" alt={value.title !== "undefined" ? value.title : value.name} title={value.title === "undefined" ? value.name : value.title} />
                                                                <div className="item-layer position-absolute w-100 h-100"></div>
                                                            </div>

                                                            <b>{value.title} {value.name}</b>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }

                                </div>
                            ) : (<div className="Loader" >
                                <Loader type="Bars" color="#00BFFF" height={100} width={100} />
                            </div>)
                    }

                    <div ref={loadingRef => (this.loadingRef = loadingRef)} style={{ height: "100px", margin: "30px" }} >
                        <span style={{ display: this.isLoading ? "block" : "none" }} className="py-2 text-center">
                            <Loader type="Bars" color="#00BFFF" height={80} width={80} time={1000} />
                        </span>
                    </div>

                </section >
            </>
        );
    }
}