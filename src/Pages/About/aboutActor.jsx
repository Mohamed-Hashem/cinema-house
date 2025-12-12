import axios from "axios";
import React, { Component } from "react";
import { LoadingSpinner } from "../../Components/shared";
import { getProfileUrl } from "../../utils/imageUtils";
import ActorMovies from "./../../Components/Recommendations/ActorMovies";
import ActorPopular from "./../../Components/Recommendations/ActorPopular";
import ActorShow from "./../../Components/ShowImages/ActorShow";
import ActorSeries from "./../../Components/ShowImages/ActorSeries";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default class aboutActor extends Component {
    isLoading = false;
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            actorDetails: null,
        };

        window.scrollTo(0, 0);
    }

    ActorDetails = async (id) => {
        if (!id) return;

        this.isLoading = true;

        await axios
            .get(`https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_API_KEY}`)
            .then((res) => {
                if (this._isMounted) {
                    this.setState({ actorDetails: res.data });
                }
            })
            .catch((err) => {
                console.error("Error fetching actor details:", err);
                if (this._isMounted) {
                    this.setState({ actorDetails: null });
                }
            });
    };

    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        this.ActorDetails(this.props.match.params.id);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.isLoading = false;
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id)
            this.ActorDetails(this.props.match.params.id);
    }

    goToActorAbout = (actor) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/actors/${actor.id}`, actor);
    };

    goToMovieAbout = (movie) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/movies/${movie.id}`, movie);
    };

    goToSeriesAbout = (series) => {
        window.scrollTo(0, 0);
        this.props.history.push(`/series/${series.id}`, series);
    };

    render() {
        return (
            <>
                <section style={{ minHeight: "71vh" }}>
                    <div className="container about">
                        {this.isLoading ? (
                            <div className="row d-flex justify-content-start">
                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 my-2">
                                    <div className="text-center position-relative mb-2">
                                        <div className="overflow-hidden mb-3">
                                            <img
                                                src={getProfileUrl(
                                                    this.state.actorDetails.profile_path,
                                                    true
                                                )}
                                                className="w-100 h-100"
                                                alt={
                                                    this.state.actorDetails.title !== "undefined"
                                                        ? this.state.actorDetails.title
                                                        : this.state.actorDetails.name
                                                }
                                                title={
                                                    this.state.actorDetails.title === "undefined"
                                                        ? this.state.actorDetails.name
                                                        : this.state.actorDetails.title
                                                }
                                            />
                                        </div>

                                        <b>
                                            {this.state.actorDetails.title}{" "}
                                            {this.state.actorDetails.name}
                                        </b>
                                    </div>
                                </div>

                                <div className=" w-65 col-xl-7 col-lg-7 col-md-7 col-sm-12 my-2 mx-auto">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "180px" }}>Name </th>
                                                <td>
                                                    {" "}
                                                    {this.state.actorDetails.title}
                                                    {this.state.actorDetails.name}
                                                </td>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <th>Birthday</th>
                                                <td>{this.state.actorDetails.birthday} </td>
                                            </tr>
                                            <tr>
                                                <th>Place of Birth</th>
                                                <td>{this.state.actorDetails.place_of_birth} </td>
                                            </tr>
                                            <tr>
                                                <th>Homepage To Site</th>
                                                <td>
                                                    <a
                                                        href={
                                                            this.state.actorDetails.homepage
                                                                ? this.state.actorDetails.homepage
                                                                : `/about`
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-decoration-none font-weight-bold"
                                                    >
                                                        {this.state.actorDetails.homepage
                                                            ? "Homepage"
                                                            : "Not Supported"}{" "}
                                                    </a>{" "}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>deathday</th>
                                                <td>
                                                    {" "}
                                                    {this.state.actorDetails.deathday
                                                        ? "Yes"
                                                        : "No"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Gender</th>
                                                <td>
                                                    {" "}
                                                    {this.state.actorDetails.gender === 2
                                                        ? "Male"
                                                        : "Female"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Department</th>
                                                <td>
                                                    {" "}
                                                    {this.state.actorDetails.known_for_department}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Popularity</th>
                                                <td> {this.state.actorDetails.popularity}</td>
                                            </tr>
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <th>Biography</th>
                                                <td>
                                                    {" "}
                                                    {this.state.actorDetails.biography.substr(
                                                        0,
                                                        250
                                                    )}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <LoadingSpinner type="Bars" color="#00BFFF" height={100} width={100} />
                        )}

                        <ActorShow poster={this.state.actorDetails} />

                        <ActorMovies
                            movie={this.state.actorDetails}
                            goToMovieAbout={this.goToMovieAbout}
                        />

                        <ActorSeries
                            series={this.state.actorDetails}
                            goToSeriesAbout={this.goToSeriesAbout}
                        />

                        <ActorPopular
                            actor={this.state.actorDetails}
                            goToActorAbout={this.goToActorAbout}
                        />
                    </div>
                </section>
            </>
        );
    }
}
