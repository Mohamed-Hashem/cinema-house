import React from "react";

const handleDragStart = (e) => e.preventDefault();

const Episode = (props) => {
	return (
		<>
			<section style={{ minHeight: "73vh" }}>
				<div className="container about">
					<div className="row  d-flex justify-content-start">
						<div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 my-2">
							<div className="text-center position-relative mb-2">
								<div className="mb-3">
									<img
										src={`https://image.tmdb.org/t/p/original${props.location.state.still_path}`}
										style={{ width: "100%", height: "100%" }}
										alt={props.location.state.name}
										title={props.location.state.name}
										onDragStart={handleDragStart}
									/>
								</div>

								<span
									className={`${
										props.location.state.vote_average >= 7
											? "vote vote1"
											: "vote vote2"
									}`}
								>
									{props.location.state.still_path !== null
										? props.location.state.vote_average
										: ""}
								</span>
								<b> Episode {props.location.state.episode_number}</b>
							</div>
						</div>

						<div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 my-2 mx-auto">
							<table className="table table-borderless">
								<thead>
									<tr>
										<th style={{ width: "200px" }}>Episode Number </th>
										<td> {props.location.state.episode_number}</td>
									</tr>
								</thead>

								<tbody>
									<tr>
										<th>Season Name</th>
										<td>Season {props.location.state.name}</td>
									</tr>
								</tbody>

								<tfoot>
									<tr>
										<th>overview</th>
										<td> {props.location.state.overview}</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Episode;
