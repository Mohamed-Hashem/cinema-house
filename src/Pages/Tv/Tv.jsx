import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Components/shared/LoadingSpinner";
import "../../Scss/color.scss";
import "./Tv.scss";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

class Tv extends Component {
    _isMounted = false;

    state = {
        results: [],
        page: 1,
        loading: false,
        hasMore: true,
        initialLoading: true,
    };

    componentDidMount() {
        this._isMounted = true;
        this.getData();
        this.setupInfiniteScroll();
    }

    componentWillUnmount() {
        this._isMounted = false;
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    setupInfiniteScroll = () => {
        const options = {
            root: null,
            rootMargin: "100px",
            threshold: 0.1,
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
                `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`
            )
            .then((response) => {
                if (!this._isMounted) return;
                const newResults = response.data.results;
                this.setState({
                    results: [...results, ...newResults],
                    loading: false,
                    initialLoading: false,
                    hasMore: newResults.length > 0 && page < response.data.total_pages,
                });
            })
            .catch((error) => {
                console.error("Error fetching TV shows:", error);
                if (this._isMounted) {
                    this.setState({ loading: false, initialLoading: false });
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

    render() {
        const { results, loading, initialLoading } = this.state;

        if (initialLoading) {
            return <LoadingSpinner />;
        }

        return (
            <div className="tv-container">
                <h1 className="tv-title">Popular TV Shows</h1>
                {results.length > 0 ? (
                    <div className="tv-grid">
                        {results.map((tv, index) => (
                            <Link
                                to={`/series/${tv.id}`}
                                key={`${tv.id}-${index}`}
                                className="tv-card"
                            >
                                <div className="tv-poster">
                                    {tv.poster_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}
                                            alt={tv.name}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="no-poster">No Image</div>
                                    )}
                                </div>
                                <div className="tv-info">
                                    <h3 className="tv-name">{tv.name}</h3>
                                    <div className="tv-meta">
                                        <span className="tv-rating">
                                            ⭐ {tv.vote_average?.toFixed(1) || "N/A"}
                                        </span>
                                        <span className="tv-year">
                                            {tv.first_air_date?.substring(0, 4) || "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No TV shows found</p>
                )}

                <div
                    ref={(el) => {
                        this.loadMoreRef = el;
                        if (el && this.observer) {
                            this.observer.observe(el);
                        }
                    }}
                    className="load-more-trigger"
                >
                    {loading && <LoadingSpinner />}
                </div>
            </div>
        );
    }
}

export default Tv;
