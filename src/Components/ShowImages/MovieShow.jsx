import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosters } from "./../../Redux/Actions/Actions";

const handleDragStart = (e) => e.preventDefault();

const MovieShow = ({ poster }) => {
	const dispatch = useDispatch();

	const allPosters = useSelector((state) => state.posters);

	const [loading, setLoading] = useState(false);

	const items = React.Children.toArray(
		allPosters?.map((img) => {
			return (
				<div className="itemHover card card-body">
					<div className="captionLayer overflow-hidden carouselItem">
						<img
							src={`https://image.tmdb.org/t/p/original${img.file_path}`}
							width="100%"
							height="300"
							className="carouselItem__img"
							alt={poster.name ? poster.name : poster.title}
							onDragStart={handleDragStart}
						/>
					</div>
				</div>
			);
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
		dispatch(fetchPosters("movie", poster.id, "images"));
		setLoading(true);

		return () => {
			setLoading(false);
		}; // eslint-disable-next-line
	}, []);

	return loading && allPosters.length > 0 ? (
		<>
			<div className="w-100 line my-5"></div>

			<div className="item text-center my-3">
				<h3>
					Posters For{" "}
					<b className="text-info">
						{poster.name ? poster.name : poster.title}{" "}
					</b>
				</h3>
			</div>

			<AliceCarousel
				autoPlay
				responsive={responsive}
				infinite
				autoPlayInterval={2000}
				disableDotsControls
				disableButtonsControls
				mouseTracking
				items={items}
			/>
		</>
	) : null;
};

export default MovieShow;
