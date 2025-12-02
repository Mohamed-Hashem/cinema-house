import React, { Component } from "react";
import SolidNavbar from "../../Components/Solid Navbar/SolidNavbar";

export default class Logout extends Component {
	render() {
		localStorage.removeItem("token");

		return (
			<>
				<SolidNavbar />

				<div
					style={{ minHeight: "73vh" }}
					className="d-flex justify-content-center align-items-center p-5"
				>
					<div className="d-flex justify-content-center align-items-center mt-5">
						<i className="fas fa-sign-out-alt fa-7x mr-4"></i>
						<div className="fa-4x font-weight-bold text-gray">
							You have been logout
						</div>
					</div>
				</div>
			</>
		);
	}
}
