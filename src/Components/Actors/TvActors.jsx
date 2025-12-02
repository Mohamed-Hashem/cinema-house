import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";

const handleDragStart = (e) => e.preventDefault();

const TvActors = ({ actors, goToPersonAbout }) => {
	const [loading, setLoading] = useState(false);

	const [credits, setCredits] = useState([]);

	const items = React.Children.toArray(
		credits?.map((actor) => {
			return actor.profile_path ? (
				<div
					className="item card card-body"
					onClick={() => goToPersonAbout(actor)}
				>
					<div className="position-relative text-center">
						<div className="captionLayer overflow-hidden carouselItem mb-2">
							<img
								src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
								width="100%"
								height="350px"
								className="carouselItem__img"
								alt={actors.title ? actors.title : actors.name}
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
			items: 4,
		},
	};

	const fetchActors = async () => {
		await axios
			.get(
				`https://api.themoviedb.org/3/tv/${actors.id}/aggregate_credits?api_key=0c46ad1eb5954840ed97f5e537764be8`
			)
			.then((response) => {
				console.log();
				setLoading(true);
				setCredits(response.data.cast);
			})
			.catch((error) => {
				console.log(error);
				setCredits([]);
			});
	};

	useEffect(() => {
		fetchActors();

		return () => {
			setLoading(false);
			setCredits([]);
		}; // eslint-disable-next-line
	}, [actors]);

	return loading ? (
		<>
			<div className="w-100 line my-5"></div>

			<div className="item  text-center mx-auto my-3">
				<h3>
					The Actors Who Take Part In{" "}
					<b className="text-info">
						{actors.title ? actors.title : actors.name}
					</b>
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

export default TvActors;
