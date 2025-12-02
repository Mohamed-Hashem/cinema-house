import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "../../Redux/Actions/Actions";

const handleDragStart = (e) => e.preventDefault();

const MovieRecommendations = ({ movie, goToMovieAbout }) => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	const recommendations = useSelector((state) => state.recommendations);

	const items = React.Children.toArray(
		recommendations?.map((poster) => {
			return poster.poster_path ? (
				<div
					className="item card card-body mb-3"
					onClick={() => goToMovieAbout(poster)}
				>
					<div className="text-center position-relative">
						<div className="captionLayer overflow-hidden mb-2  carouselItem">
							<img
								src={`https://image.tmdb.org/t/p/original${poster.poster_path}`}
								width="100%"
								height="300"
								className="carouselItem__img"
								alt={poster.title === "undefined" ? poster.name : poster.title}
								title={
									poster.title === "undefined" ? poster.name : poster.title
								}
								onDragStart={handleDragStart}
							/>

							<div className="item-layer position-absolute w-100 h-100"></div>
						</div>
						<span
							className={`${
								poster.vote_average >= 7 ? "vote vote1" : "vote vote2"
							}`}
						>
							{poster.poster_path !== null
								? Number(poster.vote_average).toFixed(1)
								: ""}
						</span>
						<b>
							{poster.title} {poster.name}
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
			items: 3,
		},
		1024: {
			items: 5,
		},
	};

	useEffect(() => {
		dispatch(fetchRecommendations("movie", movie.id, "recommendations"));

		setLoading(true);

		return () => {
			setLoading(false);
		}; // eslint-disable-next-line
	}, [movie]);

	return loading ? (
		<>
			<div className="w-100 line my-5"></div>
			<div className="item text-center my-3">
				<h3>
					Recommendations Movies as{" "}
					<b className="text-info">{movie.title ? movie.title : movie.name}</b>{" "}
					to Watch Now
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

export default MovieRecommendations;
