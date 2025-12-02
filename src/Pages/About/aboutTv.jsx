import axios from "axios";
import React, { Component } from "react";
import Loader from "react-loader-spinner";
import TvSimilar from "../../Components/Recommendations/TvSimilar";
import TvActors from "./../../Components/Actors/TvActors";
import TvRecommendations from "./../../Components/Recommendations/TvRecommendations";
import TvShow from "./../../Components/ShowImages/TvShow";
import Seasons from "./../../Components/Tv Seasons/Seasons";

export default class aboutTv extends Component {
  isLoading = false;

  constructor() {
    super();
    this.state = {
      iFrame: null,
      tvShowDetails: null,
      series: null,
    };
    window.scrollTo(0, 0);
  }

  TvShowDetails = async (series) => {
    let currentSeries;
    if (this.props.location.pathname !== undefined) {
      currentSeries = series;
      localStorage.removeItem("series");
      localStorage.setItem("series", JSON.stringify(currentSeries));
    } else {
      currentSeries = JSON.parse(localStorage.getItem("series"));
    }
    this.setState({ series: currentSeries });

    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${series.id}?api_key=0c46ad1eb5954840ed97f5e537764be8&append_to_response=all`
      )
      .then((res) => {
        this.setState({ tvShowDetails: res.data });
        this.isLoading = true;
      })
      .catch((err) => {
        console.log(err);

        this.setState({ tvShowDetails: null });
      });
  };

  IFrame = async (item) => {
    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=0c46ad1eb5954840ed97f5e537764be8&`
      )
      .then((res) => {
        this.setState({ iFrame: res.data.results[0].key });
        this.isLoading = true;
      })
      .catch((err) => {
        console.log(err);
        this.setState({ iFrame: null });
      });
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.TvShowDetails(this.props.location.state);

    this.IFrame(this.props.location.state);
  }

  componentWillUnmount() {
    this.isLoading = false;
    clearTimeout();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.state !== prevProps.location.state) {
      this.setState({ value: this.props.location.state });

      this.TvShowDetails(this.props.location.state);

      this.IFrame(this.props.location.state);
    }
  }

  goToTvAbout = (item) => {
    window.scrollTo(0, 0);
    this.props.history.push(`/aboutTv/${item.id}`, item);
  };

  goToPersonAbout = (actor) => {
    window.scrollTo(0, 0);
    this.props.history.push(`/aboutPerson/${actor.id}`, actor);
  };

  goToSeason = (season) => {
    window.scrollTo(0, 0);

    this.props.history.push({
      pathname: `/season/${season.season_number}`,
      state: this.props.location.state,
    });
  };

  getDownload = async (query) => {
    await axios
      .get(`https://yts.mx/api/v2/list_movies.json?page=1&query_term=${query}`)
      .then((res) => {
        window.location = res.data.data.movies[0].torrents[0].url;
      })
      .catch((err) => {
        console.log(err);
      });
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
                                <span className="genres">{genre.name}</span>
                              ))
                          )}
                        </td>
                      </tr>

                      <tr>
                        <th>Language</th>
                        <td> {this.state.tvShowDetails.original_language}</td>
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
                        <td> {this.state.tvShowDetails.networks[0].name}</td>
                      </tr>

                      <tr>
                        <th>Number of Seasons</th>
                        <td> {this.state.tvShowDetails.number_of_seasons}</td>
                      </tr>

                      <tr>
                        <th>Number of Episodes</th>
                        <td> {this.state.tvShowDetails.number_of_episodes}</td>
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
              <div className="Loader">
                <Loader
                  type="Bars"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={3000}
                />
              </div>
            )}

            <TvShow poster={this.props.location.state} />

            <TvActors
              actors={this.props.location.state}
              goToPersonAbout={this.goToPersonAbout}
            />

            <Seasons
              Season={this.props.location.state}
              goToSeason={this.goToSeason}
            />

            <TvSimilar
              series={this.props.location.state}
              goToTvAbout={this.goToTvAbout}
            />

            <TvRecommendations
              series={this.props.location.state}
              goToTvAbout={this.goToTvAbout}
            />
          </div>
        </section>
      </>
    );
  }
}
