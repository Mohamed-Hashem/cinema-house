import React, { Component } from "react";

export default class NotFound extends Component {
    mystyle = {
        position: "relative",
        left: "50%",
        transform: "translate(-50%,100%)",
    };

    render() {
        return (
            <>
                <section
                    className="d-flex justify-content-center align-items-center "
                    style={{ minHeight: "71.5vh" }}
                >
                    <div>
                        <h1
                            style={this.mystyle}
                            className="font-weight-bolder fa-4x text-secondary"
                        >
                            Page Not Found
                        </h1>
                    </div>
                </section>
            </>
        );
    }
}
