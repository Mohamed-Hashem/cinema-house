import React, { Component } from "react";
import axios from "axios";
import { LoadingSpinner, SkeletonCard } from "../../Components/shared";
import Serie from "./Serie";
import "./Series.scss";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

class Series extends Component {
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
                `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`,
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
                console.error("Error fetching series:", error);
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

    goToSeriesAbout = (serie) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/series/${serie.id}`, serie);
    };

    render() {
        const { results, loading, initialLoading } = this.state;

        if (initialLoading) {
            return (
                <section
                    className="container series"
                    style={{ minHeight: "67vh" }}
                    aria-label="TV Series"
                >
                    <h1 className="sr-only">Popular TV Series</h1>
                    <div className="row">
                        <SkeletonCard count={18} />
                    </div>
                </section>
            );
        }

        const filteredSeries = results.filter((serie) => serie.poster_path);

        return (
            <section className="container series" style={{ minHeight: "67vh" }} aria-label="Series">
                <h1 className="sr-only">Popular Series</h1>
                {filteredSeries.length > 0 ? (
                    <>
                        <div className="row">
                            {filteredSeries.map((serie, index) => (
                                <Serie
                                    key={serie.id}
                                    serie={serie}
                                    goToSeriesAbout={this.goToSeriesAbout}
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
                        <p className="text-muted h5">No series available</p>
                    </div>
                )}
            </section>
        );
    }
}

export default Series;
