import React, { useEffect, useState } from "react";
import axios from "axios";

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
        const fetchWatchlist = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_LINK}/auth/watchlist/${userDetails?._id}`
                );
                setWatchlist(response.data.movies || []);
            } catch (err) {
                setError("Failed to load watchlist.");
            } finally {
                setLoading(false);
            }
        };
        if (userDetails?._id) fetchWatchlist();
    }, []);

    return (
        <section className="product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="trending__product">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                    <div className="section-title">
                                        <h4>Watchlist Movies</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {loading ? (
                                    <div>Loading watchlist...</div>
                                ) : error ? (
                                    <div className="alert alert-danger">{error}</div>
                                ) : watchlist.length === 0 ? (
                                    <div>No movies in watchlist.</div>
                                ) : (
                                    watchlist.map((movie, idx) => (
                                        <div className="col-lg-4 col-md-6 col-sm-6" key={movie._id || idx}>
                                            <div className="product__item">
                                                <div className="product__item__pic set-bg">
                                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                                    <div className="ep">{movie.release_date}</div>
                                                    <div className="comment"><i className="fa fa-comments"></i> {movie.popularity}</div>
                                                    <div className="view"><i className="fa fa-eye"></i> {movie.vote_count || 0}</div>
                                                </div>
                                                <div className="product__item__text">
                                                    <ul>
                                                        <li>{movie.title}</li>
                                                    </ul>
                                                    <h5><a href="#">{movie.title}</a></h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Watchlist;