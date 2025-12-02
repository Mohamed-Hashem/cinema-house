import React, { Component } from "react";

export default class Movie extends Component {
	render() {
		const { movie, goToMovieAbout, height } = this.props;
		let style = null;

		if (height === "350") style = "col-xl-3 col-lg-4 col-md-6 ";
		else style = "col-xl-2 col-lg-3 col-md-4 ";

		return (
			<>
				<div
					className={`item ${style} col-sm-6 my-2 card card-body`}
					onClick={() => goToMovieAbout(movie)}
				>
					<div className="text-center position-relative mb-2">
						<div className="captionLayer overflow-hidden mb-2">
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
								width="100%"
								height={height}
								alt={movie.title !== "undefined" ? movie.title : movie.name}
								title={movie.title === "undefined" ? movie.name : movie.title}
							/>
							<div className="item-layer position-absolute w-100 h-100"></div>
						</div>

						<b>
							{movie.title} {movie.name}
						</b>
						<span
							className={`${
								movie.poster_path !== null
									? movie.vote_average >= 7
										? "vote vote1"
										: "vote vote2"
									: ""
							}`}
						>
							{movie.poster_path !== null ? movie.vote_average : ""}
						</span>
					</div>
				</div>
			</>
		);
	}
}
