import React, { Component } from "react";

export default class ScrollToTop extends Component {

    constructor(props) {
        super(props);
        this.state = { is_visible: false };
    }

    componentDidMount() {
        var scrollComponent = this;
        document.addEventListener("scroll", function () {
            scrollComponent.toggleVisibility();
        });
    }

    toggleVisibility() {
        if (window.pageYOffset > 500) {
            this.setState({
                is_visible: true
            });
        } else {
            this.setState({
                is_visible: false
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        return (
            <div className="back-to-top show-back-to-top">
                {
                    this.state.is_visible && (
                        <div className="top" onClick={() => this.scrollToTop()}>
                            <i className="fas fa-arrow-circle-up"></i>
                        </div>
                    )
                }
            </div>
        );
    }
}