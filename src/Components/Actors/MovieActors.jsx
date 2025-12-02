import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchActors } from "./../../Redux/Actions/Actions";

const handleDragStart = (e) => e.preventDefault();

const MovieActors = ({ actor, goToPersonAbout }) => {
	const dispatch = useDispatch();

	const credits = useSelector((state) => state.credits);

	const [loading, setLoading] = useState(false);

	const items = React.Children.toArray(
		credits?.map((actor) => {
			return actor.profile_path ? (
				<div className="item card card-body mb-3">
					<div
						className="position-relative text-center"
						onClick={() => goToPersonAbout(actor)}
					>
						<div className="captionLayer overflow-hidden carouselItem mb-2">
							<img
								src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
								width="100%"
								height="300"
								className="carouselItem__img"
								alt={actor.title ? actor.title : actor.name}
								title={actor.title ? actor.title : actor.name}
								onDragStart={handleDragStart}
							/>
							<div className="item-layer position-absolute w-100 h-100"></div>
						</div>

						<b>
							{actor.title} {actor.name}
						</b>
					</div>
				</div>
			) : null;
		})
	);

	const responsive = {
		0: {
			items: 1,
		},
		512: {
			items: 2,
		},
		1024: {
			items: 5,
		},
	};

	useEffect(() => {
		dispatch(fetchActors("movie", actor.id, "credits"));
		setLoading(true);

		return () => {
			setLoading(false);
		}; // eslint-disable-next-line
	}, [actor]);

	return loading && credits.length > 0 ? (
		<>
			<div className="w-100 line my-5"></div>

			<div className="item text-center my-3">
				<h3>
					The Actors Who Take Part In{" "}
					<b className="text-info">{actor.name ? actor.name : actor.title}</b>
				</h3>
			</div>

			<AliceCarousel
				autoPlay
				responsive={responsive}
				infinite
				autoPlayInterval={2000}
				disableDotsControls
				mouseTracking
				items={items}
			/>
		</>
	) : null;
};

export default MovieActors;
