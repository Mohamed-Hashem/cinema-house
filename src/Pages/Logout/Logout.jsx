import { Component } from "react";

export default class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem("token");
        window.location.href = window.location.origin + "/#/login";
    }

    render() {
        return null;
    }
}
