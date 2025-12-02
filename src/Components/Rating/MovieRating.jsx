import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from 'axios';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};

function MovieRating({ rate }) {

    const [currentValue, setCurrentValue] = useState(null);
    const [hoverValue, setHoverValue] = useState(undefined);
    // const [feedback, setFeedback] = useState("");
    // const [review, setReview] = useState([]);
    // const [loading, setLoading] = useState(false);

    const stars = Array(10).fill(0);

    const handleClick = async (value) => {
        setCurrentValue(value);
        console.log(value);

        await axios.post(`https://api.themoviedb.org/3/movie/${rate.id}/rating?api_key=0c46ad1eb5954840ed97f5e537764be8`, { value: currentValue }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    // const fetchReviews = async () => {
    //     await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=0c46ad1eb5954840ed97f5e537764be8`).then((res) => {

    //         setLoading(true);
    //         console.log(res.data.results);
    //         setReview([feedback, ...res.data.results]);
    //         console.log(feedback);

    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }

    // useEffect(() => {
    //     fetchReviews();
    //     return () => {
    //         setReview([]);
    //     }
    // }, []);

    return (
        <>

            <div className="my-5">
                <div className="w-100 line my-3"></div>

                <div style={styles.container} >

                    <div className="item  text-center my-3">
                        <h3>Leave Rate To The Movie  </h3>
                    </div>

                    <div style={styles.stars}>
                        {
                            stars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick(index + 1)}
                                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                        style={{ marginRight: 10, cursor: "pointer" }}
                                    />
                                )
                            })
                        }
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
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px"
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
    }
};

export default MovieRating;
