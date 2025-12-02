import axios from "axios";
import React, { Component } from "react";
import Loader from "react-loader-spinner";
import PersonMovies from "./../../Components/Recommendations/PersonMovies";
import PersonPopular from "./../../Components/Recommendations/PersonPopular";
import PersonShow from "./../../Components/ShowImages/PersonShow";
import PersonTvShow from "./../../Components/ShowImages/PersonTvShow";

export default class aboutPerson extends Component {
	isLoading = false;

	constructor(props) {
		super(props);

		this.state = {
			personDetails: null,
		};

		window.scrollTo(0, 0);
	}

	PersonDetails = async (id) => {
		this.isLoading = true;

		await axios
			.get(
				`https://api.themoviedb.org/3/person/${id}?api_key=0c46ad1eb5954840ed97f5e537764be8`
			)
			.then((res) => {
				this.setState({ personDetails: res.data });
			})
			.catch((err) => {
				console.log(err);
				this.setState({ personDetails: null });
			});
	};

	componentDidMount() {
		window.scrollTo(0, 0);
		this.PersonDetails(this.props.match.params.id);
	}

	componentWillUnmount() {
		this.isLoading = false;
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.id !== prevProps.match.params.id)
			this.PersonDetails(this.props.match.params.id);
	}

	goToPersonAbout = (actor) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/actors/${actor.id}`, actor);
	};

	goToMovieAbout = (movie) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/movies/${movie.id}`, movie);
	};

	goToTvAbout = (tvShow) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/series/${tvShow.id}`, tvShow);
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
												src={`https://image.tmdb.org/t/p/original/${this.state.personDetails.profile_path}`}
												className="w-100 h-100"
												alt={
													this.state.personDetails.title !== "undefined"
														? this.state.personDetails.title
														: this.state.personDetails.name
												}
												title={
													this.state.personDetails.title === "undefined"
														? this.state.personDetails.name
														: this.state.personDetails.title
												}
											/>
										</div>

										<b>
											{this.state.personDetails.title}{" "}
											{this.state.personDetails.name}
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
													{this.state.personDetails.title}
													{this.state.personDetails.name}
												</td>
											</tr>
										</thead>

										<tbody>
											<tr>
												<th>Birthday</th>
												<td>{this.state.personDetails.birthday} </td>
											</tr>
											<tr>
												<th>Place of Birth</th>
												<td>{this.state.personDetails.place_of_birth} </td>
											</tr>
											<tr>
												<th>Homepage To Site</th>
												<td>
													<a
														href={
															this.state.personDetails.homepage
																? this.state.personDetails.homepage
																: `/about`
														}
														target="_blank"
														rel="noreferrer"
														className="text-decoration-none font-weight-bold"
													>
														{this.state.personDetails.homepage
															? "Homepage"
															: "Not Supported"}{" "}
													</a>{" "}
												</td>
											</tr>
											<tr>
												<th>deathday</th>
												<td>
													{" "}
													{this.state.personDetails.deathday ? "Yes" : "No"}
												</td>
											</tr>
											<tr>
												<th>Gender</th>
												<td>
													{" "}
													{this.state.personDetails.gender === 2
														? "Male"
														: "Female"}
												</td>
											</tr>
											<tr>
												<th>Department</th>
												<td>
													{" "}
													{this.state.personDetails.known_for_department}
												</td>
											</tr>
											<tr>
												<th>Popularity</th>
												<td> {this.state.personDetails.popularity}</td>
											</tr>
										</tbody>

										<tfoot>
											<tr>
												<th>Biography</th>
												<td>
													{" "}
													{this.state.personDetails.biography.substr(0, 250)}
												</td>
											</tr>
										</tfoot>
									</table>
								</div>
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

						<PersonShow poster={this.props.history.location.state} />

						<PersonMovies
							movie={this.props.history.location.state}
							goToMovieAbout={this.goToMovieAbout}
						/>

						<PersonTvShow
							series={this.props.location.state}
							goToTvAbout={this.goToTvAbout}
						/>

						<PersonPopular
							actor={this.props.location.state}
							goToPersonAbout={this.goToPersonAbout}
						/>
					</div>
				</section>
			</>
		);
	}
}
