import React, { Component } from "react";
import * as Joi from "joi-browser";
import { toast } from "react-toastify";
import { formData } from "../../Redux/Actions/Actions";
import { connect } from "react-redux";

class Login extends Component {
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
            email: "",
            password: "",
        };

        this.Schema = {
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    handleChange = (e) => {
        this.User[e.target.name] = e.target.value;
        this.setState({ errors: {}, status: "d-none" });
    };

    Validation = () => {
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
            await this.props.formData(this.User, "signin");

            if (!this._isMounted) return;

            if (this.props.LoginData && this.props.LoginData.token) {
                toast.success("Login Successful");

                localStorage.setItem("token", this.props.LoginData.token);
                window.location.href = window.location.origin + "/#/home";
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
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh", paddingTop: "100px" }}
                aria-label="Login section"
            >
                <div className="container text-center" style={{ width: "35%" }}>
                    <h1 className="mb-4">Login</h1>
                    <form onSubmit={this.sendData} aria-label="Login form">
                        <div className="form-group">
                            <label htmlFor="login-email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="login-email"
                                onChange={this.handleChange}
                                type="email"
                                name="email"
                                className="form-control my-3"
                                placeholder="Email"
                                autoComplete="email"
                                disabled={this.state.waiting}
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
                            <label htmlFor="login-password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="login-password"
                                onChange={this.handleChange}
                                type="password"
                                name="password"
                                className="form-control my-3"
                                placeholder="Password"
                                autoComplete="current-password"
                                disabled={this.state.waiting}
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

                        <button type="submit" className="btn btn-auth w-50 my-3">
                            {this.state.waiting ? "Waiting ... " : "Login"}
                        </button>
                    </form>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        LoginData: state.LoginData,
    };
};

export default connect(mapStateToProps, { formData })(Login);
