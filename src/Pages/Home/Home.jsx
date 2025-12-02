import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "./../../Redux/Actions/Actions";
import Movie from "../Movies/Movie";
import Serie from "../Series/Serie";
import Actor from "../Actors/Actor";

const Home = () => {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch(); // to Dispatch date from store

	let movies = useSelector((state) => state.movies);
	let series = useSelector((state) => state.series);
	let actors = useSelector((state) => state.actors);

	useEffect(() => {
		window.scrollTo(0, 0);

		dispatch(getTrending("movie"));
		dispatch(getTrending("tv"));
		dispatch(getTrending("person"));

		setIsLoading(true);

		return () => {
			setIsLoading(false);
		};
	}, []); //eslint-disable-line

	const goToMovieAbout = (movie) => {
		window.scrollTo(0, 0);
		history.push(`/movies/${movie.id}`, movie);
	};

	const goToSeriesAbout = (series) => {
		window.scrollTo(0, 0);
		history.push(`/series/${series.id}`, series);
	};

	const goToActorsAbout = (actor) => {
		window.scrollTo(0, 0);
		history.push(`/actors/${actor.id}`, actor);
	};

	return (
		<>
			<div className="container home" style={{ minHeight: "71vh" }}>
				{/*////////////////////////////////  Movies    //////////////////////////////////////*/}

				{isLoading ? (
					<div className="row">
						<div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
							<div className="item">
								<div className="w-25 line mb-3"></div>

								<h1 className="mr-4">Trending Movies to Watch now</h1>
								<p className="secondFontColor">Most Watched Movies</p>

								<div className="w-100 line mb-4"></div>
							</div>
						</div>
						{React.Children.toArray(
							// that handle a unique key itself
							movies.slice(0, 10).map((movie) => {
								return movie.poster_path ? (
									<Movie
										movie={movie}
										goToMovieAbout={goToMovieAbout}
										height="250"
									/>
								) : null;
							})
						)}
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

				{/*////////////////////////////////  TV    //////////////////////////////////////*/}

				{isLoading ? (
					<div className="row my-3">
						<div className="col-md-4 col-sm-12  d-flex justify-content-center align-items-center">
							<div className="item">
								<div className="w-25 line mb-3"></div>

								<h1 className="mr-5">
									Trending <br />
									Series to Watch now
								</h1>
								<p className="secondFontColor">Most Watched Series </p>

								<div className="w-100 line mb-4"></div>
							</div>
						</div>
						{React.Children.toArray(
							// that handle a unique key itself
							series.slice(0, 10).map((serie) => {
								return serie.poster_path ? (
									<Serie
										serie={serie}
										goToSeriesAbout={goToSeriesAbout}
										height="250"
									/>
								) : null;
							})
						)}
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

				{/*////////////////////////////////  People   //////////////////////////////////////*/}

				{isLoading ? (
					<div className="row mt-3">
						<div className="col-md-4 col-sm-12  d-flex justify-content-center align-items-center">
							<div className="item">
								<div className="w-25 line mb-3"></div>

								<h1 className="mr-5">
									Trending <br /> Actors and Actress
								</h1>
								<p className="secondFontColor">
									Most Popular Actors and Actress
								</p>

								<div className="w-100 line mb-4"></div>
							</div>
						</div>
						{React.Children.toArray(
							// that handle a unique key itself
							actors.slice(0, 10).map((actor) => {
								return actor.profile_path ? (
									<Actor
										actor={actor}
										goToActorsAbout={goToActorsAbout}
										height="250"
									/>
								) : null;
							})
						)}
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
			</div>
		</>
	);
};

export default Home;
