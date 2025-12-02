import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { getAllData } from "./../../Redux/Actions/Actions";
import Movie from "./Movie";

class Movies extends Component {
	isLoading = false;

	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			prevY: 1,
		};

		window.scrollTo(0, 0);
	}

	getMovies(page) {
		this.props.getAllData(page, "movie"); // mapDispatchToProps
	}

	componentDidMount() {
		this.getMovies(this.state.page);

		this.isLoading = true;

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
			this.getMovies(curPage);
			this.setState({ page: curPage });
		}

		this.setState({ prevY: y });
	}

	componentWillUnmount() {
		this.isLoading = false;
	}

	goToMovieAbout = (movie) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/movies/${movie.id}`, movie);
	};

	render() {
		return (
			<>
				<section className="container movies" style={{ minHeight: "67vh" }}>
					{this.isLoading ? (
						<div className="row">
							{React.Children.toArray(
								// that handle a unique key itself

								this.props.movies.map((movie) => {
									return movie.poster_path ? (
										<Movie
											movie={movie}
											goToMovieAbout={this.goToMovieAbout}
											height="350"
										/>
									) : null;
								})
							)}
						</div>
					) : (
						<div className="Loader">
							<Loader type="Bars" color="#00BFFF" height={100} width={100} />
						</div>
					)}

					<div
						ref={(loadingRef) => (this.loadingRef = loadingRef)}
						style={{ height: "100px", margin: "30px" }}
					>
						<span
							style={{ display: this.isLoading ? "block" : "none" }}
							className="py-2 text-center"
						>
							<Loader
								type="Bars"
								color="#00BFFF"
								height={80}
								width={80}
								timeout={3000}
							/>
						</span>
					</div>
				</section>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		movies: state.movies,
	};
};

export default connect(mapStateToProps, { getAllData })(Movies);
