import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";

const handleDragStart = (e) => e.preventDefault();

const TvRecommendations = ({ series, goToTvAbout }) => {
	const [loading, setLoading] = useState(false);

	const [credits, setCredits] = useState([]);

	const items = React.Children.toArray(
		credits?.map((poster) => {
			return poster.poster_path ? (
				<div
					className="item card card-body"
					onClick={() => goToTvAbout(poster)}
				>
					<div className="text-center position-relative">
						<div className="captionLayer overflow-hidden mb-2  carouselItem">
							<img
								src={`https://image.tmdb.org/t/p/original${poster.poster_path}`}
								width="100%"
								height="350"
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
			items: 2,
		},
		1024: {
			items: 4,
		},
	};

	const fetchImages = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/tv/${series.id}/recommendations?api_key=0c46ad1eb5954840ed97f5e537764be8`
			)
			.then((response) => {
				if (response.data.results.length > 0) {
					setLoading(true);
					setCredits(response.data.results);
				}
			})
			.catch(function (error) {
				console.log(error);
				setCredits([]);
			});
	};

	useEffect(() => {
		fetchImages();
		return () => {
			setLoading(false);
			setCredits([]);
		}; // eslint-disable-next-line
	}, [series]);

	return loading ? (
		<>
			<div className="w-100 line my-5"></div>
			<div className="item text-center my-3">
				<h3>
					Recommendations Tv Series as{" "}
					<b className="text-info">
						{series.title ? series.title : series.name}
					</b>{" "}
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

export default TvRecommendations;
