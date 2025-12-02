import axios from "axios";
import React, { useEffect, useState } from "react";

const handleDragStart = (e) => e.preventDefault();

const SeasonData = (props) => {
	const [episode, setEpisode] = useState([]); //eslint-disable
	const [epsLoading, setEpsLoading] = useState(false); // eslint-disable
	const [season, setSeason] = useState([]); //eslint-disable
	const [seasonLoading, setSeasonLoading] = useState(false); // eslint-disable
	const [seasonData, setSeasonData] = useState([]);

	const goToSeason = (season) => {
		window.scrollTo(0, 0);

		props.history.push({
			pathname: `/season/${season.season_number}`,
			state: props.location.state,
		});
	};

	const goToEpisode = (episode) => {
		window.scrollTo(0, 0);

		props.history.push({
			pathname: `/episode/${episode.episode_number}`,
			state: episode,
		});
	};

	const fetchSessions = async (season) => {
		await axios
			.get(
				`https://api.themoviedb.org/3/tv/${season.id}?api_key=0c46ad1eb5954840ed97f5e537764be8&append_to_response=all`
			)
			.then((res) => {
				if (res.data.seasons.length > 0) {
					setSeasonData(res.data);
					setSeasonLoading(true);
					setSeason(res.data.seasons);
				} else {
					setSeason([]);
					setSeasonData([]);
				}
			})
			.catch((err) => {
				console.log(err);
				setSeason([]);
			});
	};

	const fetchEpisodes = async (season) => {
		await axios
			.get(
				`https://api.themoviedb.org/3/tv/${season.id}/season/${season.season_number}?api_key=0c46ad1eb5954840ed97f5e537764be8&append_to_response=all`
			)
			.then((res) => {
				if (res.data.episodes.length > 0) {
					setEpisode(res.data.episodes);
					setEpsLoading(true);
				} else setEpisode([]);
			})
			.catch((err) => {
				console.log(err);
				setEpisode([]);
			});
	};

	useEffect(() => {
		fetchSessions(props.location.state);
		fetchEpisodes(props.location.state);

		return () => {
			setEpsLoading(false);
			setSeasonLoading(false);
			setEpisode([]);
			setSeason([]);
		}; // eslint-disable-next-line
	}, [props]);

	return (
		<>
			<section style={{ minHeight: "71vh" }}>
				<div className="container about">
					{seasonLoading ? (
						<div className="row  d-flex justify-content-start">
							<div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 my-2">
								<div className="text-center position-relative mb-2">
									<div className="mb-3">
										<img
											src={`${
												seasonData.poster_path
													? `https://image.tmdb.org/t/p/original${seasonData.poster_path}`
													: `https://via.placeholder.com/245x380/1e2d55/fff?text=${seasonData.name}`
											} `}
											className="w-100 h-100"
											alt={
												seasonData.name === "undefined"
													? seasonData.name
													: seasonData.name
											}
											name={
												seasonData.name === "undefined"
													? seasonData.name
													: seasonData.name
											}
											onDragStart={handleDragStart}
										/>
									</div>

									<span
										className={`${
											seasonData.vote_average >= 7 ? "vote vote1" : "vote vote2"
										}`}
									>
										{seasonData.poster_path !== null
											? seasonData.vote_average
											: ""}
									</span>
									<b>
										{seasonData.title} {seasonData.name}
									</b>
								</div>
							</div>

							<div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 my-2 mx-auto">
								<table className="table table-borderless">
									<thead>
										<tr>
											<th style={{ width: "200px" }}>Name </th>
											<td>
												{" "}
												{seasonData.title}
												{seasonData.name}
											</td>
										</tr>
										<tr>
											<th>Season </th>
											<td> {props.location.pathname.substr(8)}</td>
										</tr>
									</thead>

									<tbody>
										<tr>
											<th>Genres</th>
											<td>
												<span className="genres">
													{seasonData.genres[0].name}
												</span>
											</td>
										</tr>
										<tr>
											<th>First air date</th>
											<td>
												{" "}
												{seasonData.first_air_date != null
													? seasonData.first_air_date
													: "Not Release"}
											</td>
										</tr>
										<tr>
											<th>Number of Episodes</th>
											<td> {seasonData.number_of_episodes}</td>
										</tr>
										<tr>
											<th>Number of Seasons</th>
											<td> {seasonData.number_of_seasons}</td>
										</tr>
									</tbody>
									<tfoot>
										<tr>
											<th>Overview</th>
											<td> {seasonData.overview}</td>
										</tr>
									</tfoot>
								</table>
							</div>

							{epsLoading ? (
								<>
									<div className="w-100 line my-5"></div>
									<div className="item  text-center my-3 col-md-12">
										<h3>
											Episodes Of season {props.location.state.season_number}{" "}
										</h3>
									</div>
									{React.Children.toArray(
										episode.map((eps) => {
											return (
												<div
													className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body"
													onClick={() => goToEpisode(eps)}
												>
													<div className="text-center position-relative">
														<div className="captionLayer overflow-hidden mb-2">
															<img
																src={`${
																	eps.still_path
																		? `https://image.tmdb.org/t/p/original${eps.still_path}`
																		: `https://via.placeholder.com/245x380/1e2d55/fff?text=${eps.episode_number}`
																} `}
																width="100%"
																height="350"
																alt={
																	eps.name === "undefined" ? eps.name : eps.name
																}
																name={
																	eps.name === "undefined" ? eps.name : eps.name
																}
																onDragStart={handleDragStart}
															/>
															<div className="item-layer position-absolute w-100 h-100"></div>
														</div>
														<span className={`${eps.vote_average} vote vote1`}>
															{eps.vote_average}
														</span>
														<b>Episode {eps.episode_number}</b>
													</div>
												</div>
											);
										})
									)}
								</>
							) : null}

							{seasonLoading ? (
								<div className="row">
									<div className="w-100 line my-5"></div>
									<div className="col-md-12">
										<div className=" text-center my-3">
											<h3>The Seasons Of This Tv Serries</h3>
										</div>
									</div>
									{React.Children.toArray(
										season.map((ss) => {
											return (
												<div
													className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body"
													onClick={() => goToSeason(ss)}
												>
													<div className="text-center position-relative mb-2">
														<div className="captionLayer overflow-hidden mb-2">
															<img
																src={`${
																	ss.poster_path
																		? `https://image.tmdb.org/t/p/original${ss.poster_path}`
																		: `https://via.placeholder.com/245x380/1e2d55/fff?text=${ss.name}`
																} `}
																width="100%"
																height="350"
																alt={
																	ss.name === "undefined" ? ss.name : ss.name
																}
																name={
																	ss.name === "undefined" ? ss.name : ss.name
																}
																onDragStart={handleDragStart}
															/>
															<div className="item-layer position-absolute w-100 h-100"></div>
														</div>
														<span className={`${ss.episode_count} vote vote1`}>
															{ss.episode_count} e
														</span>
														<b>{ss.name}</b>
													</div>
												</div>
											);
										})
									)}
								</div>
							) : null}
						</div>
					) : null}
				</div>
			</section>
		</>
	);
};

export default SeasonData;
