import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Reviews = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [logUserToken, setLogUserToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [watchlistMsg, setWatchlistMsg] = useState("");
    const [favoritetMsg, setFavoritetMsg] = useState("");
    const [reviews, setReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [reviewError, setReviewError] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewMsg, setReviewMsg] = useState("");

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_LINK}/api/movieinfo/${encodeURIComponent(id)}`);
                setMovieDetails(response.data);
            } catch (err) {
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
        setLogUserToken(sessionStorage.getItem('token'));
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_LINK}/auth/reviews/${movieDetails?.id}`);
                setReviews(response.data.reviews || []);
            } catch (err) {
                setReviewError("Failed to load reviews.");
            } finally {
                setReviewLoading(false);
            }
        };
        if (movieDetails?.id) fetchReviews();
    }, [movieDetails]);

    // AddFavorite
    const AddFavorite = async () => {
        if (!logUserToken) return;
        try {
            setFavoritetMsg("");
            const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
            const response = await axios.post(
                `${import.meta.env.VITE_API_LINK}/auth/favoriteMovies`,
                {
                    userId: userDetails?._id,
                    movieId: movieDetails?.id,
                    movieDetails: movieDetails
                },
                {
                    headers: { Authorization: `Bearer ${logUserToken}` }
                }
            );
            setFavoritetMsg(response.data.message || "Added to favorites!");
        } catch (err) {
            console.log(err.message);
            setFavoritetMsg("Failed to add to favorites. " + err.message);
        }
    };

    // AddWatchlist
    const AddWatchlist = async () => {
        if (!logUserToken) return;
        try {
            setWatchlistMsg("");
            const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
            const response = await axios.post(
                `${import.meta.env.VITE_API_LINK}/auth/watchlist`,
                {
                    userId: userDetails?._id,
                    movieId: movieDetails?.id,
                    movieDetails: movieDetails
                },
                {
                    headers: { Authorization: `Bearer ${logUserToken}` }
                }
            );
            setWatchlistMsg(response.data.message || "Added to watchlist!");
        } catch (err) {
            console.log(err.message);
            setWatchlistMsg("Failed to add to watchlist. "+err.message);
        }
    };

    // Submit review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setReviewMsg("");
        if (!movieDetails || !movieDetails.id) {
            setReviewMsg("Movie details missing. Cannot submit review.");
            return;
        }
        try {
            const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
            const response = await axios.post(`${import.meta.env.VITE_API_LINK}/auth/review`, {
                userId: userDetails?._id,
                movieId: movieDetails?.id,
                movieDetails: movieDetails,
                rating: reviewRating,
                comment: reviewText
            }, {
                headers: { Authorization: `Bearer ${logUserToken}` }
            });
            setReviewMsg(response.data.message || "Review submitted!");
            setReviewText("");
            setReviewRating(5);
            // Refresh reviews
            const reviewsResponse = await axios.get(`${import.meta.env.VITE_API_LINK}/auth/reviews/${movieDetails?.id}`);
            setReviews(reviewsResponse.data.reviews || []);
        } catch (err) {
            setReviewMsg(err.response?.data?.message || "Failed to submit review.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!movieDetails) return <div>No movie found.</div>;

    return (
        <>
            {/* Breadcrumb Begin */}
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                <Link to="/categories">Categories</Link>
                                <span>{movieDetails.genres?.[0]?.name || "Genre"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Anime Section Begin */}
            <section className="anime-details spad">
                <div className="container">
                    <div className="anime__details__content">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="anime__details__pic set-bg">
                                    <img className="w-100" style={{ height: "87%" }} src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
                                    <div className="comment"><i className="fa fa-comments"></i> {movieDetails.id}</div>
                                    <div className="view"><i className="fa fa-eye"></i> {movieDetails.vote_count}</div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="anime__details__text">
                                    <div className="anime__details__title">
                                        <h3>Name: {movieDetails.title}</h3>
                                        <span>{movieDetails.tagline}</span>
                                    </div>
                                    <div className="anime__details__rating">
                                        <div className="rating">
                                            {/* You can render stars dynamically based on rating if desired */}
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-half-o"></i>
                                        </div>
                                        <span>{movieDetails.vote_count} Votes</span>
                                    </div>
                                    <p>{movieDetails.overview}</p>
                                    <div className="anime__details__widget">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <ul>
                                                    <li><span>Type:</span> TV Series</li>
                                                    <li><span>Language:</span> {movieDetails.original_language}</li>
                                                    <li><span>Date aired:</span> {movieDetails.release_date}</li>
                                                    <li><span>Status:</span> {movieDetails.status}</li>
                                                    <li><span>Genre:</span> {movieDetails.genres?.map(g => g.name).join(", ")}</li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <ul>
                                                    <li><span>Country Origin:</span> {movieDetails.origin_country?.join(", ")}</li>
                                                    <li><span>Views:</span> {movieDetails.popularity}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {logUserToken ? (
                                        <div className="anime__details__btn">
                                            <button onClick={AddFavorite} className="follow-btn"><i className="fa fa-plus"></i> Favorite</button>
                                            <button onClick={AddWatchlist} className="watch-btn"><span>Watchlist</span> <i className="fa fa-plus"></i></button>
                                            {watchlistMsg && <div className="alert alert-info mt-2">{watchlistMsg}</div>}
                                            {favoritetMsg && <div className="alert alert-info mt-2">{favoritetMsg}</div>}
                                        </div>
                                    ) : (
                                        <div className="anime__details__btn">
                                            <Link to="/login" className="follow-btn"> Login to comment</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {logUserToken ? (
                            <div className="row">
                                <div className="col-lg-8 col-md-8">
                                    <div className="anime__details__review">
                                        <div className="section-title">
                                            <h5>Reviews</h5>
                                        </div>
                                        {reviewLoading ? (
                                            <div>Loading reviews...</div>
                                        ) : reviewError ? (
                                            <div className="alert alert-danger">{reviewError}</div>
                                        ) : reviews.length === 0 ? (
                                            <div>No reviews yet.</div>
                                        ) : (
                                            reviews.map((rev, idx) => (
                                                <div className="anime__review__item" key={rev._id || idx}>
                                                    <div className="anime__review__item__pic">
                                                        <img src="/assets/img/anime/review-1.jpg" alt="" />
                                                        <i className="fa fa-profile"></i>
                                                    </div>
                                                    <div className="anime__review__item__text">
                                                        <h6>{rev.user?.username || "User"} - <span>{new Date(rev.createdAt).toLocaleString()}</span></h6>
                                                        <p>Rating: {rev.rating}/10</p>
                                                        <p>{rev.comment}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="anime__details__form mt-4">
                                        <div className="section-title">
                                            <h5>Your Review</h5>
                                        </div>
                                        <form onSubmit={handleReviewSubmit}>
                                            <textarea placeholder="Your Comment" value={reviewText} onChange={e => setReviewText(e.target.value)} required disabled={!movieDetails || !movieDetails.id}></textarea>
                                            <div className="mt-2">
                                                <label>Rating: </label>
                                                <input type="number" min="0" max="10" value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} required style={{width: '60px', marginLeft: '10px'}} disabled={!movieDetails || !movieDetails.id} />
                                            </div>
                                            <button type="submit" disabled={!movieDetails || !movieDetails.id}><i className="fa fa-location-arrow"></i> Submit Review</button>
                                        </form>
                                        {reviewMsg && <div className="alert alert-info mt-2">{reviewMsg}</div>}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>
            {/* {/* Anime Section End */ }
        </>
    );
};

export default Reviews;