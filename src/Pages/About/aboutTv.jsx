import axios from "axios";
import React, { Component } from "react";
import { LoadingSpinner } from "../../Components/shared";
import TvSimilar from "../../Components/Recommendations/TvSimilar";
import TvActors from "./../../Components/Actors/TvActors";
import TvRecommendations from "./../../Components/Recommendations/TvRecommendations";
import TvShow from "./../../Components/ShowImages/TvShow";
import Seasons from "./../../Components/Tv Seasons/Seasons";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default class aboutTv extends Component {
    isLoading = false;
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            iFrame: null,
            tvShowDetails: null,
            series: null,
        };
        window.scrollTo(0, 0);
    }

    getSeriesData = () => {
        // Try to get from URL params first (most reliable)
        const id = this.props.match?.params?.id;
        if (id && !isNaN(id)) {
            // Check if we have full data in location state
            if (this.props.location.state?.id) {
                return this.props.location.state;
            }
            // Fallback to localStorage
            const stored = localStorage.getItem("series");
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (parsed.id === parseInt(id, 10)) {
                        return parsed;
                    }
                } catch (e) {
                    // ignore parse error
                }
            }
            // Return just the ID to fetch data
            return { id: parseInt(id, 10) };
        }
        return null;
    };

    TvShowDetails = async (series) => {
        if (!series?.id) return;

        let currentSeries;
        if (this.props.location.state?.id) {
            currentSeries = series;
            localStorage.removeItem("series");
            localStorage.setItem("series", JSON.stringify(currentSeries));
        } else {
            currentSeries = series;
        }
        if (this._isMounted) {
            this.setState({ series: currentSeries });
        }

        await axios
            .get(
                `https://api.themoviedb.org/3/tv/${series.id}?api_key=${TMDB_API_KEY}&append_to_response=all`
            )
            .then((res) => {
                if (this._isMounted) {
                    this.setState({ tvShowDetails: res.data });
                    this.isLoading = true;
                }
            })
            .catch((err) => {
                console.error("Error fetching TV show details:", err);
                if (this._isMounted) {
                    this.setState({ tvShowDetails: null });
                }
            });
    };

    IFrame = async (item) => {
        if (!item?.id) return;

        await axios
            .get(`https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=${TMDB_API_KEY}&`)
            .then((res) => {
                if (this._isMounted) {
                    this.setState({ iFrame: res.data.results[0]?.key || null });
                    this.isLoading = true;
                }
            })
            .catch((err) => {
                console.error("Error fetching video data:", err);
                if (this._isMounted) {
                    this.setState({ iFrame: null });
                }
            });
    };

    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);

        const seriesData = this.getSeriesData();
        if (seriesData) {
            this.TvShowDetails(seriesData);
            this.IFrame(seriesData);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.isLoading = false;
    }

    componentDidUpdate(prevProps) {
        // Check if URL parameter changed
        if (this.props.match?.params?.id !== prevProps.match?.params?.id) {
            const seriesData = this.getSeriesData();
            if (seriesData) {
                this.TvShowDetails(seriesData);
                this.IFrame(seriesData);
            }
        }
    }

    goToTvAbout = (item) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/series/${item.id}`, item);
    };

    goToPersonAbout = (actor) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/actors/${actor.id}`, actor);
    };

    goToSeason = (season) => {
        window.scrollTo(0, 0);

        this.props.history.push({
            pathname: `/season/${season.season_number}`,
            state: { ...this.state.series, season_number: season.season_number },
        });
    };

    getDownload = async (query) => {
        if (!this._isMounted) return;
        try {
            const res = await axios.get(
                `https://yts.mx/api/v2/list_movies.json?page=1&query_term=${encodeURIComponent(query)}`
            );
            if (res.data?.data?.movies?.[0]?.torrents?.[0]?.url) {
                window.location = res.data.data.movies[0].torrents[0].url;
            } else {
                console.warn("No torrents found for:", query);
                alert("No torrents found for this title.");
            }
        } catch (err) {
            console.error("Torrent search error:", err.message);
            alert("Could not connect to torrent service. The service may be unavailable.");
        }
    };

    render() {
        return (
            <>
                <section style={{ minHeight: "71vh" }}>
                    <div className="container about">
                        {this.isLoading ? (
                            <div className="row  d-flex justify-content-start">
                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 my-2">
                                    <div className="text-center position-relative mb-2">
                                        <div className="mb-3">
                                            <img
                                                src={`https://image.tmdb.org/t/p/original/${this.state.tvShowDetails.poster_path}`}
                                                className="w-100 h-100"
                                                alt={
                                                    this.state.tvShowDetails.title !== "undefined"
                                                        ? this.state.tvShowDetails.title
                                                        : this.state.tvShowDetails.name
                                                }
                                                title={
                                                    this.state.tvShowDetails.title === "undefined"
                                                        ? this.state.tvShowDetails.name
                                                        : this.state.tvShowDetails.title
                                                }
                                            />
                                        </div>

                                        <b>
                                            {this.state.tvShowDetails.title}{" "}
                                            {this.state.tvShowDetails.name}
                                        </b>
                                        <span
                                            className={`${
                                                this.state.tvShowDetails.vote_average >= 7
                                                    ? "vote vote1"
                                                    : "vote vote2"
                                            }`}
                                        >
                                            {this.state.tvShowDetails.poster_path !== null
                                                ? this.state.tvShowDetails.vote_average
                                                : ""}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 my-2 mx-auto">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "200px" }}>Name </th>
                                                <td>
                                                    {" "}
                                                    {this.state.tvShowDetails.title}
                                                    {this.state.tvShowDetails.name}
                                                </td>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <th>tagline</th>
                                                <td> {this.state.tvShowDetails.tagline}</td>
                                            </tr>
                                            <tr>
                                                <th>Homepage To Site</th>
                                                <td>
                                                    <a
                                                        href={
                                                            this.state.tvShowDetails.homepage
                                                                ? this.state.tvShowDetails.homepage
                                                                : `/about`
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-decoration-none font-weight-bold"
                                                    >
                                                        {this.state.tvShowDetails.homepage
                                                            ? "Homepage"
                                                            : "Not Supported"}{" "}
                                                    </a>{" "}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Genres</th>
                                                <td>
                                                    {React.Children.toArray(
                                                        this.state.tvShowDetails.genres
                                                            .slice(0, 2)
                                                            .map((genre) => (
                                                                <span className="genres">
                                                                    {genre.name}
                                                                </span>
                                                            ))
                                                    )}
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>Language</th>
                                                <td>
                                                    {" "}
                                                    {this.state.tvShowDetails.original_language}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>First air date</th>
                                                <td>
                                                    {" "}
                                                    {this.state.tvShowDetails.first_air_date != null
                                                        ? this.state.tvShowDetails.first_air_date
                                                        : "Not Release"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Popularity</th>
                                                <td> {this.state.tvShowDetails.popularity}</td>
                                            </tr>
                                            <tr>
                                                <th>Media Type</th>
                                                <td> Tv Series </td>
                                            </tr>
                                            <tr>
                                                <th>Vote Average</th>
                                                <td> {this.state.tvShowDetails.vote_average}</td>
                                            </tr>
                                            <tr>
                                                <th>Vote Count</th>
                                                <td> {this.state.tvShowDetails.vote_count}</td>
                                            </tr>
                                            <tr>
                                                <th>Networks</th>
                                                <td>
                                                    {" "}
                                                    {this.state.tvShowDetails.networks[0].name}
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>Number of Seasons</th>
                                                <td>
                                                    {" "}
                                                    {this.state.tvShowDetails.number_of_seasons}
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>Number of Episodes</th>
                                                <td>
                                                    {" "}
                                                    {this.state.tvShowDetails.number_of_episodes}
                                                </td>
                                            </tr>
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <th>overview</th>
                                                <td> {this.state.tvShowDetails.overview}</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div>
                                        <button
                                            className="btn btn-info mr-3"
                                            onClick={() =>
                                                this.getDownload(
                                                    this.state.tvShowDetails.title
                                                        ? this.state.tvShowDetails.title
                                                        : this.state.tvShowDetails.name
                                                )
                                            }
                                        >
                                            Download
                                        </button>
                                        <span className="text-danger font-weight-bold">
                                            Torrents Only !
                                        </span>
                                    </div>
                                </div>

                                {this.state.iFrame ? (
                                    <>
                                        <div className="w-100 line my-5"></div>

                                        <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
                                            <h1 className="text-center mb-4">
                                                {" "}
                                                Trial For{" "}
                                                {this.state.tvShowDetails.name
                                                    ? this.state.tvShowDetails.name
                                                    : this.state.tvShowDetails.title}
                                            </h1>
                                            <div>
                                                <iframe
                                                    width="100%"
                                                    height="300px"
                                                    src={`https://www.youtube-nocookie.com/embed/${this.state.iFrame}`}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        ) : (
                            <LoadingSpinner type="Bars" color="#00BFFF" height={100} width={100} />
                        )}

                        <TvShow poster={this.state.tvShowDetails} />

                        <TvActors
                            actors={this.state.tvShowDetails}
                            goToPersonAbout={this.goToPersonAbout}
                        />

                        <Seasons Season={this.state.tvShowDetails} goToSeason={this.goToSeason} />

                        <TvSimilar
                            series={this.state.tvShowDetails}
                            goToTvAbout={this.goToTvAbout}
                        />

                        <TvRecommendations
                            series={this.state.tvShowDetails}
                            goToTvAbout={this.goToTvAbout}
                        />
                    </div>
                </section>
            </>
        );
    }
}
