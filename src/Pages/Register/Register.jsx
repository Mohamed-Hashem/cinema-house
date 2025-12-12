import React, { Component } from "react";
import { connect } from "react-redux";
import { formData } from "../../Redux/Actions/Actions";
import * as Joi from "joi-browser";
import { toast } from "react-toastify";

class Register extends Component {
    _isMounted = false;

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
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            age: Joi.number().min(18).required(),
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    handleChange = (e) => {
        this.User[e.target.name] = e.target.value;
        this.setState({ errors: {}, status: "d-none" });
    };

    Validation = async () => {
        const errors = {};
        const { error } = Joi.validate(this.User, this.Schema);

        if (error === null) {
            this.setState({ errors: {} });
            return null;
        } else {
            for (const err of error.details) errors[err.path] = err.message;
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

            if (!this._isMounted) return;

            if (this.props.errorMessage && this.props.errorMessage.includes("success")) {
                toast.success("Registration Successful");

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

        if (this._isMounted) {
            this.setState({ waiting: false });
        }
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <section
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh", paddingTop: "100px" }}
                aria-label="Registration section"
            >
                <div className="container text-center" style={{ width: "35%" }}>
                    <h1 className="mb-4">Register</h1>
                    <form onSubmit={this.sendData} aria-label="Registration form">
                        <div className="form-group">
                            <label htmlFor="register-first-name" className="sr-only">
                                First Name
                            </label>
                            <input
                                id="register-first-name"
                                onChange={this.handleChange}
                                type="text"
                                name="first_name"
                                className="form-control my-3"
                                placeholder="First Name"
                                autoComplete="given-name"
                                aria-describedby={
                                    this.state.errors.first_name ? "first-name-error" : undefined
                                }
                            />
                        </div>
                        {this.state.errors.first_name && (
                            <div id="first-name-error" className="alert alert-danger" role="alert">
                                {this.state.errors.first_name}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="register-last-name" className="sr-only">
                                Last Name
                            </label>
                            <input
                                id="register-last-name"
                                onChange={this.handleChange}
                                type="text"
                                name="last_name"
                                className="form-control my-3"
                                placeholder="Last Name"
                                autoComplete="family-name"
                                aria-describedby={
                                    this.state.errors.last_name ? "last-name-error" : undefined
                                }
                            />
                        </div>
                        {this.state.errors.last_name && (
                            <div id="last-name-error" className="alert alert-danger" role="alert">
                                {this.state.errors.last_name}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="register-age" className="sr-only">
                                Age
                            </label>
                            <input
                                id="register-age"
                                onChange={this.handleChange}
                                type="number"
                                name="age"
                                className="form-control my-3"
                                placeholder="Age"
                                aria-describedby={this.state.errors.age ? "age-error" : undefined}
                            />
                        </div>
                        {this.state.errors.age && (
                            <div id="age-error" className="alert alert-danger" role="alert">
                                {this.state.errors.age}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="register-email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="register-email"
                                onChange={this.handleChange}
                                type="email"
                                name="email"
                                className="form-control my-3"
                                placeholder="Email"
                                autoComplete="email"
                                aria-describedby={
                                    this.state.errors.email ? "email-error" : undefined
                                }
                            />
                        </div>
                        {this.state.errors.email && (
                            <div id="email-error" className="alert alert-danger" role="alert">
                                {this.state.errors.email}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="register-password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="register-password"
                                onChange={this.handleChange}
                                type="password"
                                name="password"
                                className="form-control my-3"
                                placeholder="Password"
                                autoComplete="new-password"
                                aria-describedby={
                                    this.state.errors.password ? "password-error" : undefined
                                }
                            />
                        </div>
                        {this.state.errors.password && (
                            <div id="password-error" className="alert alert-danger" role="alert">
                                {this.state.errors.password}
                            </div>
                        )}

                        <div className={this.state.status} role="alert">
                            {this.state.errorMessage}
                        </div>

                        <button type="submit" className="btn btn-info w-50 my-3">
                            {this.state.waiting ? "Waiting ... " : "Register"}
                        </button>
                    </form>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorMessage,
    };
};

export default connect(mapStateToProps, { formData })(Register);
