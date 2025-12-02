import axios from "axios";
import React, { Component } from "react";
import Loader from "react-loader-spinner";

export default class Search extends Component {
	isLoading = false;

	constructor() {
		super();
		this.state = {
			movies: [],
			searchKey: "",
			page: 1,
			prevY: 1,
		};

		window.scrollTo(0, 0);
	}

	search = (page, searchKey) => {
		if (this.props.location.pathname) {
			searchKey = this.props.location.pathname.substr(8);
			localStorage.removeItem("searchQuery");
			localStorage.setItem(
				"searchQuery",
				this.props.location.pathname.substr(8)
			);
		} else searchKey = localStorage.getItem("searchQuery");

		axios
			.get(
				`https://api.themoviedb.org/3/search/multi?api_key=0c46ad1eb5954840ed97f5e537764be8&page=${page}&query=${searchKey}`
			)
			.then((res) => {
				let { results } = res.data;

				this.isLoading = true;

				if (results.length > 0) {
					this.props.history.push(this.props.location.pathname);
					this.setState({ movies: [...this.state.movies, ...results] });
				} else this.props.history.push(`/notfound`);
			});
	};

	componentDidMount() {
		window.scrollTo(0, 0);

		this.search(this.state.page, this.props.location.pathname);

		var options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		};

		this.observer = new IntersectionObserver(
			this.handleObserver.bind(this),
			options
		);
		this.observer.observe(this.loadingRef);
	}

	handleObserver(entities) {
		const y = entities[0].boundingClientRect.y;

		if (this.state.prevY > y) {
			const curPage = this.state.page + 1;

			this.setState({
				page: curPage,
				searchKey: this.props.location.pathname.substr(8),
			});

			this.search(curPage, this.state.searchKey);
		}
		this.setState({ prevY: y });
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.props.history.push(`/${this.props.location.pathname.substr(8)}`);
			this.setState({ searchKey: this.props.location.pathname.substr(8) });

			this.search(this.state.page, this.state.searchKey);
		}
	}

	componentWillUnmount() {
		this.setState({ movies: [], searchKey: "" });
		this.isLoading = false;
		clearTimeout();
	}

	goToMovieAbout = (movie) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/movies/${movie.id}`, movie);
	};

	goToTvAbout = (tvShow) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/series/${tvShow.id}`, tvShow);
	};

	goToPersonAbout = (actor) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/actors/${actor.id}`, actor);
	};

	render() {
		return (
			<>
				<section className="container tv" style={{ minHeight: "75.5vh" }}>
					<div className="row">
						{this.isLoading ? (
							React.Children.toArray(
								// that handle a unique key itself
								this.state.movies.map((value) => {
									return value.poster_path ? (
										<div
											className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body"
											onClick={() => {
												if (value.media_type === "movie")
													return this.goToMovieAbout(value);
												else if (value.media_type === "tv")
													return this.goToTvAbout(value);
												else return this.goToPersonAbout(value);
											}}
										>
											<div className="text-center position-relative mb-2">
												<div className="captionLayer overflow-hidden mb-2">
													<img
														src={`https://image.tmdb.org/t/p/original/${value.poster_path}`}
														className="w-100 h-100"
														alt={
															value.title !== "undefined"
																? value.title
																: value.name
														}
														title={
															value.title === "undefined"
																? value.name
																: value.title
														}
													/>
													<div className="item-layer position-absolute w-100 h-100"></div>
												</div>

												<b>
													{value.title} {value.name}
												</b>
												<span
													className={`${
														value.poster_path !== null
															? value.vote_average >= 7
																? "vote vote1"
																: "vote vote2"
															: ""
													}`}
												>
													{value.poster_path !== null ? value.vote_average : ""}
												</span>
											</div>
										</div>
									) : null;
								})
							)
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

						<div
							ref={(loadingRef) => (this.loadingRef = loadingRef)}
							style={{ height: "100px", margin: "30px auto" }}
						>
							<span
								style={{ display: this.loading ? "block" : "none" }}
								className="py-2 text-center"
							>
								<Loader
									type="Puff"
									color="#00BFFF"
									height={80}
									width={80}
									time={3000}
								/>
							</span>
						</div>
					</div>
				</section>
			</>
		);
	}
}
