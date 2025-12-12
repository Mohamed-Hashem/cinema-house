import { useState } from "react";
import { StarIcon } from "../shared";
import axios from "axios";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
};

function MovieRating({ rate }) {
    const [currentValue, setCurrentValue] = useState(null);
    const [hoverValue, setHoverValue] = useState(undefined);

    const stars = Array(10).fill(0);

    const handleClick = async (value) => {
        setCurrentValue(value);

        try {
            await axios.post(
                `https://api.themoviedb.org/3/movie/${rate.id}/rating?api_key=${TMDB_API_KEY}`,
                { value: value }
            );
        } catch (err) {
            console.error("Error submitting movie rating:", err);
        }
    };

    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };

    return (
        <>
            <div className="my-5">
                <div className="w-100 line my-3"></div>

                <div style={styles.container}>
                    <div className="item  text-center my-3">
                        <h3>Leave Rate To The Movie </h3>
                    </div>

                    <div style={styles.stars}>
                        {/* eslint-disable react/no-array-index-key */}
                        {stars.map((_, index) => {
                            return (
                                <StarIcon
                                    key={`star-${index}`}
                                    size={24}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClick(index + 1)}
                                    color={
                                        (hoverValue || currentValue) > index
                                            ? colors.orange
                                            : colors.grey
                                    }
                                    style={{ marginRight: 10, cursor: "pointer" }}
                                />
                            );
                        })}
                        {/* eslint-enable react/no-array-index-key */}
                    </div>
                </div>
            </div>
        </>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
};

export default MovieRating;
