import React, { Component } from "react";
import SolidNavbar from "./../../Components/Solid Navbar/SolidNavbar";
import * as Joi from "joi-browser";
import { toast } from "react-toastify";
import { formData } from "../../Redux/Actions/Actions";
import { connect } from "react-redux";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errorMessage: "",
			status: "",
			waiting: false,
			errors: {},
		};

		this.User = {
			email: "",
			password: "",
		};

		this.Schema = {
			// Joi Validation
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required(),
		};
	}

	handleChange = (e) => {
		this.User[e.target.name] = e.target.value;
		this.setState({ errors: {}, status: "d-none" });
	};

	Validation = () => {
		// Clone
		const errors = {};
		// Edit
		const { error } = Joi.validate(this.User, this.Schema);

		if (error === null) {
			this.setState({ errors: {} });
			return null;
		} else {
			for (const err of error.details) errors[err.path] = err.message;

			// Set State
			this.setState({ errors });
		}
	};

	sendData = async (e) => {
		e.preventDefault();

		this.setState({ waiting: true });

		const errors = await this.Validation();

		if (errors) return errors;
		else if (errors === null) {
			await this.props.formData(this.User, "signin");

			if (this.props.LoginData.message === "success") {
				toast.success("Created Successfully");

				localStorage.setItem("token", this.props.LoginData.token);
				this.props.history.replace("/home"); // to change the direction to home and back to empty Page
			} else if (this.props.LoginData === "Network Error") {
				toast.error("Network Error");

				this.setState({
					errorMessage: this.props.LoginData,
					status: "alert alert-danger text-center font-weight-bolder",
				});
			} else {
				toast.error(this.props.LoginData.message);
				this.setState({
					errorMessage: this.props.LoginData.message,
					status: "alert alert-danger text-center font-weight-bolder",
				});
			}
		}
		this.setState({ waiting: false });
	};

	componentWillUnmount() {
		this.setState({ waiting: false });
	}

	render() {
		return (
			<>
				<SolidNavbar />

				<section
					className="d-flex align-items-center justify-content-center"
					style={{ minHeight: "73vh", top: "80px" }}
				>
					<div className="container text-center" style={{ width: "35%" }}>
						<form onSubmit={this.sendData}>
							<input
								onChange={this.handleChange}
								type="email"
								name="email"
								className="form-control my-3"
								placeholder="Email"
								autoFocus
								autoComplete="email"
							/>
							{this.state.errors.email && (
								<div className="alert alert-danger">
									{this.state.errors.email}
								</div>
							)}

							<input
								onChange={this.handleChange}
								type="password"
								name="password"
								className="form-control my-3"
								placeholder="Password"
								autoComplete="current-password"
							/>

							{this.state.errors.password && (
								<div className="alert alert-danger">
									{this.state.errors.password}
								</div>
							)}

							<div className={this.state.status}>{this.state.errorMessage}</div>

							<button className="btn btn-info w-50 my-3">
								{this.state.waiting ? "Waiting ... " : "Login"}
							</button>
						</form>
					</div>
				</section>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		LoginData: state.LoginData,
	};
};

export default connect(mapStateToProps, { formData })(Login);
