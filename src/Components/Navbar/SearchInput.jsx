import React, { useState, useCallback, useRef, memo } from "react";
import { Redirect } from "react-router-dom";
import "./SearchInput.scss";

const SearchInput = memo(() => {
    const [searchQuery, setSearchQuery] = useState("");
    const [fireRedirect, setFireRedirect] = useState(false);
    const debounceTimerRef = useRef(null);

    // Debounced search input handler
    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;

        // Clear previous debounce timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Debounce the state update (300ms delay)
        debounceTimerRef.current = setTimeout(() => {
            setSearchQuery(value);
        }, 300);
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!searchQuery.trim()) return;

            setFireRedirect(true);
            localStorage.removeItem("searchQuery");
            localStorage.setItem("searchQuery", searchQuery);
            e.target.reset();

            // Reset redirect state after navigation
            setTimeout(() => setFireRedirect(false), 100);
        },
        [searchQuery]
    );

    return (
        <>
            <form onSubmit={handleSubmit} className="mr-4" role="search">
                <label htmlFor="search-input" className="sr-only">
                    Search movies, series, and actors
                </label>
                <input
                    id="search-input"
                    onChange={handleSearchChange}
                    className="mr-5 form-control bg-transparent text-white focus"
                    type="search"
                    placeholder="Search . . ."
                    aria-label="Search movies, series, and actors"
                />
            </form>
            {fireRedirect && searchQuery && (
                <Redirect exact from="/" to={`/search/${searchQuery}`} />
            )}
        </>
    );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
