import jwt_decode from "jwt-decode";
import React, { useMemo, memo, useState, useCallback, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import img from "./../../images/movie.svg";
import "./Navbar.scss";
import SearchInput from "./SearchInput";

const Navbar = memo(() => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [token] = useState(() => localStorage.getItem("token"));
    const dropdownRef = useRef(null);

    // Memoize user decoding - only decode once on mount
    const user = useMemo(() => {
        if (!token) return null;

        try {
            return jwt_decode(token);
        } catch (error) {
            localStorage.removeItem("token");
            console.error("Token decode error:", error.message);
            return null;
        }
    }, [token]);

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen((prev) => !prev);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <nav
            className="navbar navbar-expand-lg fixed-top navbar-dark pb-4 pt-3"
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/home">
                    <img src={img} alt="" aria-hidden="true" />
                    cinema house
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/movies">
                                Movies
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/series">
                                Series
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/actors">
                                Actors
                            </NavLink>
                        </li>
                    </ul>

                    <SearchInput />

                    <div className="btn-group dropdown" ref={dropdownRef}>
                        <button
                            type="button"
                            className="btn bg-purple dropdown-toggle dropdown-toggle-split"
                            onClick={toggleDropdown}
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen}
                            aria-label="User menu"
                        >
                            Menu
                        </button>

                        <div className={`dropdown-menu my-2${isDropdownOpen ? " show" : ""}`}>
                            <Link
                                className="dropdown-item text-white"
                                to="/profile"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Profile
                            </Link>
                            {user && (
                                <div className="dropdown-item disabled text-muted">
                                    {user.first_name} {user.last_name}
                                </div>
                            )}

                            <div className="dropdown-divider"></div>
                            <Link
                                className="dropdown-item text-white"
                                to="/logout"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
});

Navbar.displayName = "Navbar";

export default Navbar;
