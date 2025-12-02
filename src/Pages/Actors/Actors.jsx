import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { getAllData } from "./../../Redux/Actions/Actions";
import Actor from "./Actor";

class Actors extends Component {
	isLoading = false;

	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			prevY: 1,
		};

		window.scrollTo(0, 0);
	}

	getActors(page) {
		this.props.getAllData(page, "person");
	}

	componentDidMount() {
		this.getActors(this.state.page);

		this.isLoading = true;

		var options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		};

		this.observer = new IntersectionObserver(
			this.handleObserver.bind(this),
			options
		);
		this.observer.observe(this.loadingRef);
	}

	handleObserver(entities) {
		const y = entities[0].boundingClientRect.y;

		if (this.state.prevY > y) {
			const curPage = this.state.page + 1;
			this.getActors(curPage);
			this.setState({ page: curPage });
		}
		this.setState({ prevY: y });
	}

	componentWillUnmount() {
		this.isLoading = false;
	}

	goToActorsAbout = (actor) => {
		window.scrollTo(0, 0);
		this.props.history.push(`/actors/${actor.id}`, actor);
	};

	render() {
		return (
			<>
				<section className="container people" style={{ minHeight: "71vh" }}>
					{this.isLoading ? (
						<div className="row">
							{React.Children.toArray(
								// that handle a unique key itself

								this.props.actors.map((actor) => {
									return actor.profile_path !== null ? (
										<Actor
											actor={actor}
											goToActorsAbout={this.goToActorsAbout}
											height="350"
										/>
									) : null;
								})
							)}
						</div>
					) : (
						<div className="Loader">
							<Loader type="Bars" color="#00BFFF" height={100} width={100} />
						</div>
					)}

					<div
						ref={(loadingRef) => (this.loadingRef = loadingRef)}
						style={{ height: "100px", margin: "30px" }}
					>
						<span
							style={{ display: this.isLoading ? "block" : "none" }}
							className="py-2 text-center"
						>
							<Loader
								type="Bars"
								color="#00BFFF"
								height={80}
								width={80}
								time={1000}
							/>
						</span>
					</div>
				</section>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		actors: state.actors,
	};
};

export default connect(mapStateToProps, { getAllData })(Actors);
