import React, { Component } from "react";
import axios from "axios";
import { LoadingSpinner, SkeletonCard } from "../../Components/shared";
import Actor from "./Actor";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

class Actors extends Component {
    _isMounted = false;
    abortController = null;

    state = {
        results: [],
        page: 1,
        loading: false,
        hasMore: true,
        initialLoading: true,
    };

    componentDidMount() {
        this._isMounted = true;
        this.abortController = new AbortController();
        window.scrollTo(0, 0);
        this.getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
        if (this.abortController) {
            this.abortController.abort();
        }
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    componentDidUpdate(_prevProps, _prevState) {
        if (this.loadMoreRef && !this.observer) {
            this.setupInfiniteScroll();
        }
    }

    setupInfiniteScroll = () => {
        const options = {
            root: null,
            rootMargin: "200px",
            threshold: 0.01,
        };

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.state.loading && this.state.hasMore) {
                this.loadMore();
            }
        }, options);

        if (this.loadMoreRef) {
            this.observer.observe(this.loadMoreRef);
        }
    };

    getData = () => {
        const { page, results } = this.state;

        if (!this._isMounted) return;
        this.setState({ loading: true });

        axios
            .get(
                `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${page}`,
                { signal: this.abortController?.signal }
            )
            .then((response) => {
                if (!this._isMounted) return;
                const newResults = response.data.results;
                const combinedResults = [...results, ...newResults];
                const uniqueResults = Array.from(
                    new Map(combinedResults.map((item) => [item.id, item])).values()
                );
                this.setState({
                    results: uniqueResults,
                    loading: false,
                    initialLoading: false,
                    hasMore: newResults.length > 0 && page < response.data.total_pages,
                });
            })
            .catch((error) => {
                console.error("Error fetching actors:", error);
                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        initialLoading: false,
                        hasMore: false,
                    });
                }
            });
    };

    loadMore = () => {
        if (!this._isMounted) return;
        this.setState(
            (prevState) => ({ page: prevState.page + 1 }),
            () => {
                this.getData();
            }
        );
    };

    goToActorsAbout = (actor) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/actors/${actor.id}`, actor);
    };

    render() {
        const { results, loading, initialLoading } = this.state;

        if (initialLoading) {
            return (
                <section
                    className="container people"
                    style={{ minHeight: "71vh" }}
                    aria-label="Actors"
                >
                    <h1 className="sr-only">Popular Actors</h1>
                    <div className="row">
                        <SkeletonCard count={18} />
                    </div>
                </section>
            );
        }

        const filteredActors = results.filter((actor) => actor.profile_path);

        return (
            <section className="container people" style={{ minHeight: "71vh" }} aria-label="Actors">
                <h1 className="sr-only">Popular Actors</h1>
                {filteredActors.length > 0 ? (
                    <>
                        <div className="row">
                            {filteredActors.map((actor, index) => (
                                <Actor
                                    key={actor.id}
                                    actor={actor}
                                    goToActorsAbout={this.goToActorsAbout}
                                    index={index}
                                />
                            ))}
                        </div>

                        <div
                            ref={(loadMoreRef) => (this.loadMoreRef = loadMoreRef)}
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: "100px", margin: "30px" }}
                        >
                            {loading && (
                                <LoadingSpinner
                                    type="Bars"
                                    color="#00BFFF"
                                    height={80}
                                    width={80}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: "50vh" }}
                    >
                        <p className="text-muted h5">No actors available</p>
                    </div>
                )}
            </section>
        );
    }
}

export default Actors;
