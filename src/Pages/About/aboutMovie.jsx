import axios from "axios";
import React, { Component } from "react";
import Loader from "react-loader-spinner";
import MovieSimilar from "../../Components/Recommendations/MovieSimilar";
import MovieActors from "./../../Components/Actors/MovieActors";
import MovieRecommendations from "./../../Components/Recommendations/MovieRecommendations";
import MovieShow from "./../../Components/ShowImages/MovieShow";
import { connect } from "react-redux";
import {
	getMediaType_Iframe,
	getMediaType_Data,
} from "../../Redux/Actions/Actions";

class aboutMovie extends Component {
	isLoading = false;

	constructor(props) {
		super(props);
		window.scrollTo(0, 0);
	}

	MoviesDetails = (id) => {
		this.props.getMediaType_Data(id, "movie");
	};

	IFrame = (id) => {
		this.props.getMediaType_Iframe(id, "movie");
	};

	componentDidMount() {
		this.isLoading = true;

		window.scrollTo(0, 0);

		this.MoviesDetails(this.props.match.params.id);

		setTimeout(() => this.IFrame(this.props.match.params.id), 500);
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.MoviesDetails(this.props.match.params.id);
			setTimeout(() => this.IFrame(this.props.match.params.id), 500);
		}
	}
	componentWillUnmount() {
		this.isLoading = false;
		clearTimeout();
	}

	goToPersonAbout = (actor) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/actors/${actor.id}`, actor);
	};

	goToMovieAbout = (movie) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/movies/${movie.id}`, movie);
	};

	goToTvAbout = (series) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/series/${series.id}`, series);
	};

	torrentDownload = async (query) => {
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
										<div className="overflow-hidden mb-3">
											<img
												src={`https://image.tmdb.org/t/p/original/${this.props.movieDetails.poster_path}`}
												className="w-100 h-100"
												alt={
													this.props.movieDetails.title !== "undefined"
														? this.props.movieDetails.title
														: this.props.movieDetails.name
												}
												title={
													this.props.movieDetails.title === "undefined"
														? this.props.movieDetails.name
														: this.props.movieDetails.title
												}
											/>
											<div className="item-layer position-absolute w-100 h-100"></div>
										</div>

										<b>
											{this.props.movieDetails.title}{" "}
											{this.props.movieDetails.name}
										</b>
										<span
											className={`${
												this.props.movieDetails.vote_average >= 7
													? "vote vote1"
													: "vote vote2"
											}`}
										>
											{this.props.movieDetails.poster_path !== null
												? this.props.movieDetails.vote_average
												: ""}
										</span>
									</div>
								</div>

								<div className=" w-65 col-xl-7 col-lg-7 col-md-7 col-sm-12 my-2 mx-auto">
									<table className="table table-borderless">
										<thead>
											<tr>
												<th style={{ width: "180px" }}>Name </th>
												<td>
													{" "}
													{this.props.movieDetails.title
														? this.props.movieDetails.title
														: this.props.movieDetails.name}
												</td>
											</tr>
										</thead>

										<tbody>
											<tr>
												<th>Revenue</th>
												<td>$ {this.props.movieDetails.revenue} </td>
											</tr>

											<tr>
												<th>Homepage To Site</th>
												<td>
													<a
														href={
															this.props.movieDetails.homepage
																? this.props.movieDetails.homepage
																: `/about`
														}
														target="_blank"
														rel="noreferrer"
														className="text-decoration-none font-weight-bold"
													>
														{this.props.movieDetails.homepage
															? "Homepage"
															: "Not Supported"}{" "}
													</a>{" "}
												</td>
											</tr>

											<tr>
												<th>Genres</th>
												<td>
													{React.Children.toArray(
														this.props.movieDetails.genres
															.slice(0, 2)
															.map((genre) => {
																return (
																	<span className="genres" key={Math.random()}>
																		{genre.name}
																	</span>
																);
															})
													)}
												</td>
											</tr>

											<tr>
												<th>Language</th>
												<td> {this.props.movieDetails.original_language}</td>
											</tr>

											<tr>
												<th>Release Date</th>
												<td>
													{" "}
													{this.props.movieDetails.release_date != null
														? this.props.movieDetails.release_date
														: "Not Release"}
												</td>
											</tr>
											<tr>
												<th>Popularity</th>
												<td> {this.props.movieDetails.popularity}</td>
											</tr>
											<tr>
												<th>Media Type</th>
												<td> Movie </td>
											</tr>
											<tr>
												<th>Vote Average</th>
												<td> {this.props.movieDetails.vote_average}</td>
											</tr>
											<tr>
												<th>Vote Count</th>
												<td> {this.props.movieDetails.vote_count}</td>
											</tr>
										</tbody>

										<tfoot>
											<tr>
												<th>overview</th>
												<td>
													{" "}
													{this.props.movieDetails.overview.substr(0, 250)}
												</td>
											</tr>
										</tfoot>
									</table>

									<div>
										<button
											className="btn btn-info mr-3"
											onClick={() =>
												this.torrentDownload(
													this.props.movieDetails.title
														? this.props.movieDetails.title
														: this.props.movieDetails.name
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

								{this.props.iFrame ? (
									<>
										<div className="w-100 line my-5"></div>

										<div className="col-lg-8 col-md-10 col-sm-12 mx-auto ">
											<h1 className="text-center mb-4">
												{" "}
												Trial For{" "}
												<b className="text-info">
													{" "}
													{this.props.movieDetails.title
														? this.props.movieDetails.title
														: this.props.movieDetails.name}
												</b>
											</h1>
											<div>
												<iframe
													width="100%"
													height="300px"
													src={`https://www.youtube-nocookie.com/embed/${this.props.iFrame}`}
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

						<MovieShow poster={this.props.location.state} />

						<MovieActors
							actor={this.props.location.state}
							goToPersonAbout={this.goToPersonAbout}
						/>

						<MovieSimilar
							movie={this.props.location.state}
							goToMovieAbout={this.goToMovieAbout}
						/>

						<MovieRecommendations
							movie={this.props.location.state}
							goToMovieAbout={this.goToMovieAbout}
						/>
					</div>
				</section>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		movieDetails: state.mediaType_Details,
		iFrame: state.mediaType_Iframe,
	};
};

export default connect(mapStateToProps, {
	getMediaType_Data,
	getMediaType_Iframe,
})(aboutMovie);
