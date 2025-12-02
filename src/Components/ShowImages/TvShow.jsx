import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";

const handleDragStart = (e) => e.preventDefault();

const TvShow = ({ poster }) => {
	const [credits, setCredits] = useState([]);

	const [loading, setLoading] = useState(false);

	const items = React.Children.toArray(
		credits?.map((img) => {
			return img.file_path ? (
				<div className="itemHover card card-body">
					<div className="captionLayer overflow-hidden carouselItem">
						<img
							src={`https://image.tmdb.org/t/p/original${img.file_path}`}
							width="100%"
							height="300px"
							className="carouselItem__img"
							alt={poster.name ? poster.name : poster.title}
							onDragStart={handleDragStart}
						/>
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

	const fetchImages = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/tv/${poster.id}/images?api_key=0c46ad1eb5954840ed97f5e537764be8`
			)
			.then((res) => {
				if (res.data.backdrops.length > 0) {
					setCredits(res.data.backdrops);
					setLoading(true);
				}
			})
			.catch((err) => {
				console.log(err);
				setCredits([]);
			});
	};

	useEffect(() => {
		fetchImages();
		return () => {
			setLoading(false);
			setCredits([]);
		}; //  eslint-disable-next-line
	}, [poster]);

	return loading ? (
		<>
			<div className="w-100 line my-5"></div>

			<div className="item  text-center my-3">
				<h3>
					Posters For{" "}
					<b className="text-info">
						{poster.name ? poster.name : poster.title}
					</b>{" "}
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

export default TvShow;
