import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SolidNavbar from "../../Components/Solid Navbar/SolidNavbar";

export default class Logout extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            redirectToLogin: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        // Clear token from localStorage
        localStorage.removeItem("token");

        // Redirect to login after 2 seconds
        this.timeout = setTimeout(() => {
            if (this._isMounted) {
                this.setState({ redirectToLogin: true });
            }
        }, 2000);
    }

    componentWillUnmount() {
        this._isMounted = false;
        // Clear timeout on unmount
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    render() {
        if (this.state.redirectToLogin) {
            return <Redirect to="/login" />;
        }

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
                            You have been logged out
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
