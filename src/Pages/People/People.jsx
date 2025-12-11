import React, { Component } from "react";
import axios from "axios";

import { LoadingSpinner } from "../../Components/shared";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default class People extends Component {
    isLoading = false;
    _isMounted = false;
    controller = new AbortController();

    constructor() {
        super();

        this.state = {
            people: [],
            page: 1,
            prevY: 1,
            isFull: false,
        };

        window.scrollTo(0, 0);
    }

    getPeople(page) {
        this.isLoading = true;

        axios
            .get(`https://api.themoviedb.org/3/person/popular?api_key=${TMDB_API_KEY}&page=${page}`)
            .then((res) => {
                if (!this._isMounted) return;
                let { results } = res.data;

                this.setState({
                    people: [...this.state.people, ...results],
                });
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPeople(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        this.observer = new IntersectionObserver(this.handleObserver.bind(this), options);
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities) {
        if (!this._isMounted) return;
        const y = entities[0].boundingClientRect.y;

        if (this.state.prevY > y) {
            const curPage = this.state.page + 1;

            this.getPeople(curPage);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.isLoading = false;
        this.controller.abort();
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    goToPersonAbout = (actor) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/actors/${actor.id}`, actor);
    };

    render() {
        const { people } = this.state;

        return (
            <section className="container people" style={{ minHeight: "71vh" }}>
                {this.isLoading && people.length > 0 ? (
                    <div className="row">
                        {people
                            .filter((person) => person.profile_path)
                            .map((value) => (
                                <div
                                    key={value.id}
                                    className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body"
                                    onClick={() => this.goToPersonAbout(value)}
                                >
                                    <div className="text-center position-relative mb-2">
                                        <div className="captionLayer overflow-hidden mb-2">
                                            <img
                                                src={`https://image.tmdb.org/t/p/original/${value.profile_path}`}
                                                width="100%"
                                                height="350"
                                                alt={value.name}
                                                title={value.name}
                                            />
                                            <div className="item-layer position-absolute w-100 h-100"></div>
                                        </div>
                                        <b>{value.name}</b>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : !this.isLoading ? (
                    <LoadingSpinner type="Bars" color="#00BFFF" height={100} width={100} />
                ) : null}

                <div
                    ref={(loadingRef) => (this.loadingRef = loadingRef)}
                    style={{ height: "100px", margin: "30px" }}
                >
                    <span
                        style={{ display: this.isLoading ? "block" : "none" }}
                        className="py-2 text-center"
                    >
                        <LoadingSpinner />
                    </span>
                </div>
            </section>
        );
    }
}
