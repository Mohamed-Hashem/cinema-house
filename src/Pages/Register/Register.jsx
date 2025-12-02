import React, { Component } from "react";
import { connect } from "react-redux";
import { formData } from "../../Redux/Actions/Actions";
import SolidNavbar from "./../../Components/Solid Navbar/SolidNavbar";
import * as Joi from "joi-browser";
import { toast } from "react-toastify";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
            status: "",
            waiting: false,
            errors: {},
        };

        this.User = {
            first_name: "",
            last_name: "",
            age: "",
            email: "",
            password: "",
        };

        this.Schema = {
            // Joi Validation
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            age: Joi.number().min(18).required(),
        };
    }

    handleChange = (e) => {
        this.User[e.target.name] = e.target.value;
        this.setState({ errors: {}, status: "d-none" });
    };

    Validation = async () => {
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
            await this.props.formData(this.User, "signup");

            if (this.props.errorMessage === "success") {
                toast.success("Created Successfully");

                this.setState({
                    errorMessage: this.props.errorMessage,
                    status: "alert alert-success text-center font-weight-bolder",
                    errors: {},
                });

                e.target.reset();
            } else if (this.props.errorMessage === "Network Error") {
                this.setState({
                    errorMessage: this.props.errorMessage,
                    status: "alert alert-danger text-center font-weight-bolder",
                });
            } else {
                toast.error("Email Already Exists");

                this.setState({
                    errorMessage: "Email Already Exists",
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
                    className="d-flex justify-content-center align-items-center position-relative"
                    style={{ minHeight: "73vh", top: "100px" }}
                >
                    <div
                        className="container text-center"
                        style={{ width: "35%" }}
                    >
                        <form onSubmit={this.sendData}>
                            <input
                                onChange={this.handleChange}
                                type="text"
                                name="first_name"
                                className="form-control my-3"
                                placeholder="First Name"
                                autoFocus
                            />
                            {this.state.errors.first_name && (
                                <div className="alert alert-danger">
                                    {this.state.errors.first_name}
                                </div>
                            )}

                            <input
                                onChange={this.handleChange}
                                type="text"
                                name="last_name"
                                className="form-control my-3"
                                placeholder="Last Name"
                            />
                            {this.state.errors.last_name && (
                                <div className="alert alert-danger">
                                    {this.state.errors.last_name}
                                </div>
                            )}

                            <input
                                onChange={this.handleChange}
                                type="number"
                                name="age"
                                className="form-control my-3"
                                placeholder="Age"
                            />
                            {this.state.errors.age && (
                                <div className="alert alert-danger">
                                    {this.state.errors.age}
                                </div>
                            )}

                            <input
                                onChange={this.handleChange}
                                type="email"
                                name="email"
                                className="form-control my-3"
                                placeholder="Email"
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
                            />
                            {this.state.errors.password && (
                                <div className="alert alert-danger">
                                    {this.state.errors.password}
                                </div>
                            )}

                            <div className={this.state.status}>
                                {this.state.errorMessage}
                            </div>

                            <button className="btn btn-info w-50 my-3">
                                {this.state.waiting
                                    ? "Waiting ... "
                                    : "Register"}
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
        errorMessage: state.errorMessage,
    };
};

export default connect(mapStateToProps, { formData })(Register);
