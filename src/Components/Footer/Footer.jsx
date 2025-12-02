import React, { Component } from "react";
import "./Footer.scss";

export default class Footer extends Component {
	render() {
		return (
			<>
				<footer className="py-2">
					<div className="container d-flex justify-content-between align-items-center">
						<span>Contact Us</span>

						<div className="d-flex justify-content-center fa-1x align-items-center">
							<a
								className="nav-link"
								target="_blank"
								rel="noreferrer"
								href="https://www.facebook.com/Mohamd.Ha4em/"
							>
								<i className="fab fa-facebook " aria-hidden="true"></i>
							</a>

							<a
								className="nav-link"
								target="_blank"
								rel="noreferrer"
								href="https://www.facebook.com/Mohamd.Ha4em/"
							>
								<i className="fab fa-instagram" aria-hidden="true"></i>
							</a>

							<a
								className="nav-link"
								target="_blank"
								rel="noreferrer"
								href="https://www.facebook.com/Mohamd.Ha4em/"
							>
								<i className="fab fa-youtube" aria-hidden="true"></i>
							</a>

							<a
								className="nav-link"
								target="_blank"
								rel="noreferrer"
								href="https://www.facebook.com/Mohamd.Ha4em/"
							>
								<i className="fab fa-spotify" aria-hidden="true"></i>
							</a>
						</div>
					</div>
				</footer>
			</>
		);
	}
}
