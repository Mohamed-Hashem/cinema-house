import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import Loader from "react-loader-spinner";

const handleDragStart = (e) => e.preventDefault();

const PersonShow = ({ poster }) => {
	const [credits, setCredits] = useState([]);

	const [loading, setLoading] = useState(false);

	const items = credits?.map((img) => {
		return img.file_path ? (
			<div className="itemHover card card-body">
				<div className="captionLayer overflow-hidden carouselItem">
					<img
						src={`https://image.tmdb.org/t/p/original${img.file_path}`}
						className="carouselItem__img"
						height="350"
						alt={poster.name ? poster.name : poster.title}
						onDragStart={handleDragStart}
					/>
				</div>
			</div>
		) : null;
	});

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
				`https://api.themoviedb.org/3/person/${poster.id}/images?api_key=0c46ad1eb5954840ed97f5e537764be8`
			)
			.then((res) => {
				if (res.data.profiles.length > 0) {
					setLoading(true);
					setCredits(res.data.profiles);
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
		}; // eslint-disable-next-line
	}, [poster]);

	return loading ? (
		<>
			<div className="w-100 line my-5"></div>

			<div className="item  text-center my-3">
				<h3>Posters For {poster.name} </h3>
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
	);
};

export default PersonShow;
