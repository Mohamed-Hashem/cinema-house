import React, { Component } from "react";

export default class Serie extends Component {
	render() {
		const { serie, goToSeriesAbout, height } = this.props;

		let style = null;

		if (height === "350") style = "col-xl-3 col-lg-4 col-md-6 ";
		else style = "col-xl-2 col-lg-3 col-md-4 ";

		return (
			<>
				<div
					className={`item ${style} col-sm-6 my-2 card card-body mb-3`}
					onClick={() => goToSeriesAbout(serie)}
				>
					<div className="text-center position-relative">
						<div className="captionLayer overflow-hidden mb-2">
							<img
								src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
								width="100%"
								height={height}
								alt={serie.title !== "undefined" ? serie.title : serie.name}
								title={serie.title === "undefined" ? serie.name : serie.title}
							/>
							<div className="item-layer position-absolute w-100 h-100"></div>
						</div>

						<b>
							{serie.title} {serie.name}
						</b>
						<span
							className={`${
								serie.poster_path !== null
									? serie.vote_average >= 7
										? "vote vote1"
										: "vote vote2"
									: ""
							}`}
						>
							{serie.poster_path !== null ? serie.vote_average : ""}
						</span>
					</div>
				</div>
			</>
		);
	}
}
