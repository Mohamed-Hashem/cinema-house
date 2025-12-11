import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
};

function SeriesRating({ rate }) {
    const [currentValue, setCurrentValue] = useState(null);
    const [hoverValue, setHoverValue] = useState(undefined);

    const stars = Array(10).fill(0);

    const handleClick = async (value) => {
        setCurrentValue(value);

        try {
            await axios.post(
                `https://api.themoviedb.org/3/tv/${rate.id}/rating?api_key=${TMDB_API_KEY}`,
                { value: value }
            );
        } catch (err) {
            console.error("Error submitting series rating:", err);
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
                        {stars.map((_, index) => {
                            return (
                                <FaStar
                                    key={index}
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
                    </div>
                </div>

                {/*
                <form onSubmit={Feedback} className="d-flex my-4">
                <input placeholder="Leave a Review" onChange={setField} className="form-control mr-4" />
                <button style={styles.button} className="btn">Submit</button>
            </form>

            {

                loading ?
                    <div>
                        <table>
                            <thead>
                                {

                                    review.map((user) => {
                                        return (
                                            <tr key={Math.random()}>
                                                <th style={{ width: "200px" }}>{user.author}</th>
                                                <td>{String(user.content).slice(0, 50)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </thead>
                        </table>
                    </div> : false
            } 
            */}
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
    button: {
        border: "1px solid #a8a8a83d",
        borderRadius: 5,
        backgroundColor: "#1e2d55",
        color: "#fff",
    },
};

export default SeriesRating;
