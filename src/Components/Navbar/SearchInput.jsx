import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./SearchInput.scss";

export default class SearchInput extends Component {
	constructor() {
		super();
		this.fireRedirect = false;
		this.state = { searchQuery: null };
	}

	searchKey = (e) => {
		//onSubmit
		e.preventDefault();
		this.setState({ fireRedirect: true });
		localStorage.removeItem("searchQuery");
		localStorage.setItem("searchQuery", this.state.searchQuery);
		e.target.reset();
	};
	setSearch = (e) => {
		e.preventDefault();
		this.setState({ searchQuery: e.target.value });
	};

	componentWillUnmount() {
		this.setState({ searchQuery: null });
		this.fireRedirect = false;
		clearTimeout();
	}

	render() {
		return (
			<>
				<form onSubmit={this.searchKey} className="mr-4">
					<input
						onChange={this.setSearch}
						className="mr-5 form-control bg-transparent text-white focus"
						type="search"
						placeholder="Search . . ."
						autoFocus
					/>
				</form>
				{this.state.fireRedirect && (
					<Redirect exact from="/" to={`/search/${this.state.searchQuery}`} />
				)}
			</>
		);
	}
}
