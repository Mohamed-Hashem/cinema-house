import React, { Component } from "react";

export default class Actor extends Component {
	render() {
		const { actor, goToActorsAbout, height } = this.props;

		let style = null;

		if (height === "350") style = "col-xl-3 col-lg-4 col-md-6 ";
		else style = "col-xl-2 col-lg-3 col-md-4 ";

		return (
			<>
				<div
					className={`item ${style} col-sm-6 my-2 card card-body`}
					onClick={() => goToActorsAbout(actor)}
				>
					<div className="text-center position-relative mb-2">
						<div className="captionLayer overflow-hidden mb-2">
							<img
								src={
									actor.profile_path !== null
										? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
										: "https://via.placeholder.com/468x700/1E2D55 ?Text=Digital.com"
								}
								width="100%"
								height={height}
								alt={actor.title !== "undefined" ? actor.title : actor.name}
								title={actor.title === "undefined" ? actor.name : actor.title}
							/>
							<div className="item-layer position-absolute w-100 h-100"></div>
						</div>

						<b>
							{actor.title} {actor.name}
						</b>
					</div>
				</div>
			</>
		);
	}
}
