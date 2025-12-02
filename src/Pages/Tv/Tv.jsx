import React, { Component } from "react";
import axios from "axios";
import Navbar from './../../Components/Navbar/Navbar';
import ScrollToTop from './../../Components/ScrollToTop/ScrollToTop';
import Loader from "react-loader-spinner"

export default class Tv extends Component {

    isLoading = false

    constructor() {
        super();
        this.state = {
            tv: [],
            page: 1,
            prevY: 1,
        };

        window.scrollTo(0, 0);
    }

    getTvSerries(page) {


        axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=0c46ad1eb5954840ed97f5e537764be8&page=${page}`)
            .then(res => {
                let { results } = res.data;

                this.isLoading = true
                this.setState({ tv: [...this.state.tv, ...results] })
            });
    }

    componentDidMount() {
        this.getTvSerries(this.state.page);

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

            this.getTvSerries(curPage);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    componentWillUnmount() {
        this.setState({ tv: [] })
        this.isLoading = false
    }

    goToTvAbout = (item) => {
        this.props.history.push(`/aboutTv/${item.id}`, item)
    }

    render() {
        return (
            <>
                <Navbar />
                <ScrollToTop />

                <section className="container tv" style={{ minHeight: "67vh" }}>
                    {
                        this.isLoading ?
                            (
                                <div className="row">
                                    {
                                        React.Children.toArray(  // that handle a unique key itself
                                            this.state.tv.map((value) => {
                                                return (
                                                    value.poster_path !== null ?
                                                        (
                                                            <div className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body mb-3" onClick={() => this.goToTvAbout(value)}>

                                                                <div className="text-center position-relative">

                                                                    <div className="captionLayer overflow-hidden mb-2">
                                                                        <img src={`https://image.tmdb.org/t/p/original/${value.poster_path}`} width="100%" height="350" alt={value.title !== "undefined" ? value.title : value.name} title={value.title === "undefined" ? value.name : value.title} />
                                                                        <div className="item-layer position-absolute w-100 h-100"></div>
                                                                    </div>

                                                                    <b>{value.title} {value.name}</b>
                                                                    <span className={`${value.poster_path !== null ? value.vote_average >= 7 ? "vote vote1" : "vote vote2" : ""}`}>{value.poster_path !== null ? value.vote_average : ""}</span>
                                                                </div>
                                                            </div>
                                                        ) : null
                                                )
                                            })
                                        )
                                    }

                                </div>
                            ) : (<div className="Loader" >
                                <Loader type="Bars" color="#00BFFF" height={100} width={100} timeout={3000} />
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