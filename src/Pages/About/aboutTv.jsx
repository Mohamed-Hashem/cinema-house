import axios from "axios";
import React, { Component } from "react";
import { LoadingSpinner } from "../../Components/shared";
import { getPosterUrl } from "../../utils/imageUtils";
import SeriesSimilar from "../../Components/Recommendations/SeriesSimilar";
import SeriesActors from "./../../Components/Actors/SeriesActors";
import SeriesRecommendations from "./../../Components/Recommendations/SeriesRecommendations";
import SeriesShow from "./../../Components/ShowImages/SeriesShow";
import Seasons from "./../../Components/Tv Seasons/Seasons";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default class aboutTv extends Component {
    isLoading = false;
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            iFrame: null,
            seriesDetails: null,
            series: null,
        };
        window.scrollTo(0, 0);
    }

    getSeriesData = () => {
        const id = this.props.match?.params?.id;
        if (id && !isNaN(id)) {
            if (this.props.location.state?.id) {
                return this.props.location.state;
            }
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
            return { id: parseInt(id, 10) };
        }
        return null;
    };

    SeriesDetails = async (series) => {
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
                    this.setState({ seriesDetails: res.data });
                    this.isLoading = true;
                }
            })
            .catch((err) => {
                console.error("Error fetching series details:", err);
                if (this._isMounted) {
                    this.setState({ seriesDetails: null });
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
            this.SeriesDetails(seriesData);
            this.IFrame(seriesData);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.isLoading = false;
    }

    componentDidUpdate(prevProps) {
        if (this.props.match?.params?.id !== prevProps.match?.params?.id) {
            const seriesData = this.getSeriesData();
            if (seriesData) {
                this.SeriesDetails(seriesData);
                this.IFrame(seriesData);
            }
        }
    }

    goToSeriesAbout = (item) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/series/${item.id}`, item);
    };

    goToActorAbout = (actor) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/actors/${actor.id}`, actor);
    };

    goToSeason = (season) => {
        window.scrollTo(0, 0);
        const seriesId = this.state.series?.id || this.props.match?.params?.id;

        this.props.history.push({
            pathname: `/series/${seriesId}/season/${season.season_number}`,
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
                                                src={getPosterUrl(
                                                    this.state.seriesDetails.poster_path,
                                                    true
                                                )}
                                                className="w-100 h-100"
                                                alt={
                                                    this.state.seriesDetails.title !== "undefined"
                                                        ? this.state.seriesDetails.title
                                                        : this.state.seriesDetails.name
                                                }
                                                title={
                                                    this.state.seriesDetails.title === "undefined"
                                                        ? this.state.seriesDetails.name
                                                        : this.state.seriesDetails.title
                                                }
                                            />
                                        </div>

                                        <b>
                                            {this.state.seriesDetails.title}{" "}
                                            {this.state.seriesDetails.name}
                                        </b>
                                        <span
                                            className={`${
                                                this.state.seriesDetails.vote_average >= 7
                                                    ? "vote vote1"
                                                    : "vote vote2"
                                            }`}
                                        >
                                            {this.state.seriesDetails.poster_path !== null
                                                ? this.state.seriesDetails.vote_average
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
                                                    {this.state.seriesDetails.title}
                                                    {this.state.seriesDetails.name}
                                                </td>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <th>tagline</th>
                                                <td> {this.state.seriesDetails.tagline}</td>
                                            </tr>
                                            <tr>
                                                <th>Homepage To Site</th>
                                                <td>
                                                    <a
                                                        href={
                                                            this.state.seriesDetails.homepage
                                                                ? this.state.seriesDetails.homepage
                                                                : `/about`
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-decoration-none font-weight-bold"
                                                    >
                                                        {this.state.seriesDetails.homepage
                                                            ? "Homepage"
                                                            : "Not Supported"}{" "}
                                                    </a>{" "}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Genres</th>
                                                <td>
                                                    {this.state.seriesDetails.genres?.length > 0 ? (
                                                        React.Children.toArray(
                                                            this.state.seriesDetails.genres
                                                                .slice(0, 2)
                                                                .map((genre) => (
                                                                    <span className="genres">
                                                                        {genre.name}
                                                                    </span>
                                                                ))
                                                        )
                                                    ) : (
                                                        <span>N/A</span>
                                                    )}
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>Language</th>
                                                <td>
                                                    {" "}
                                                    {this.state.seriesDetails.original_language}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>First air date</th>
                                                <td>
                                                    {" "}
                                                    {this.state.seriesDetails.first_air_date != null
                                                        ? this.state.seriesDetails.first_air_date
                                                        : "Not Release"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Popularity</th>
                                                <td> {this.state.seriesDetails.popularity}</td>
                                            </tr>
                                            <tr>
                                                <th>Media Type</th>
                                                <td> Tv Series </td>
                                            </tr>
                                            <tr>
                                                <th>Vote Average</th>
                                                <td>
                                                    {" "}
                                                    {Number(
                                                        this.state.seriesDetails.vote_average
                                                    ).toFixed(1)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Vote Count</th>
                                                <td> {this.state.seriesDetails.vote_count}</td>
                                            </tr>
                                            <tr>
                                                <th>Networks</th>
                                                <td>
                                                    {" "}
                                                    {this.state.seriesDetails.networks[0].name}
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>Number of Seasons</th>
                                                <td>
                                                    {" "}
                                                    {this.state.seriesDetails.number_of_seasons}
                                                </td>
                                            </tr>

                                            <tr>
                                                <th>Number of Episodes</th>
                                                <td>
                                                    {" "}
                                                    {this.state.seriesDetails.number_of_episodes}
                                                </td>
                                            </tr>
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <th>overview</th>
                                                <td> {this.state.seriesDetails.overview}</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div>
                                        <button
                                            className="btn btn-info mr-3"
                                            onClick={() =>
                                                this.getDownload(
                                                    this.state.seriesDetails.title
                                                        ? this.state.seriesDetails.title
                                                        : this.state.seriesDetails.name
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
                                                {this.state.seriesDetails.name
                                                    ? this.state.seriesDetails.name
                                                    : this.state.seriesDetails.title}
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

                        <SeriesShow poster={this.state.seriesDetails} />

                        <SeriesActors
                            actors={this.state.seriesDetails}
                            goToActorAbout={this.goToActorAbout}
                        />

                        <Seasons Season={this.state.seriesDetails} goToSeason={this.goToSeason} />

                        <SeriesSimilar
                            series={this.state.seriesDetails}
                            goToSeriesAbout={this.goToSeriesAbout}
                        />

                        <SeriesRecommendations
                            series={this.state.seriesDetails}
                            goToSeriesAbout={this.goToSeriesAbout}
                        />
                    </div>
                </section>
            </>
        );
    }
}
