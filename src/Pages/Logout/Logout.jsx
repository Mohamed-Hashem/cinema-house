import { Component } from "react";
import { LoadingSpinner } from "../../Components/shared";

export default class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem("token");
        setTimeout(() => {
            window.location.href = window.location.origin + "/#/login";
        }, 100);
    }

    render() {
        return (
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh", backgroundColor: "#141414" }}
            >
                <LoadingSpinner height={80} width={80} color="#e50914" />
            </div>
        );
    }
}
