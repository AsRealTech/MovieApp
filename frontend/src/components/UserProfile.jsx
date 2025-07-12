import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ username: "", useremail: "", password: "" });
    const [editMsg, setEditMsg] = useState("");

    useEffect(() => {
        const userDetail = JSON.parse(sessionStorage.getItem("userDetails"));
        setUserDetails(userDetail);
        setEditData({ username: userDetail?.username || "", useremail: userDetail?.useremail || "", password: "" });
        const fetchWatchlist = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_LINK}/auth/watchlist/${userDetail?._id}`
                );
                setWatchlist(response.data.movies || []);
            } catch (err) {
                setError("Failed to load watchlist.");
            } finally {
                setLoading(false);
            }
        };
        if (userDetail?._id) fetchWatchlist();
    }, []);

    const handleEditChange = e => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async e => {
        e.preventDefault();
        setEditMsg("");
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_LINK}/auth/profile/${userDetails?._id}`,
                editData
            );
            setEditMsg(response.data.message || "Profile updated!");
            setUserDetails({ ...userDetails, ...editData });
            setEditMode(false);
        } catch (err) {
            setEditMsg("Failed to update profile.");
        }
    };

    return (
        <>
            <section className="signup spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 p-2">
                            <div className="login__social__links card">
                                <div className="card-body">
                                    <h3 className="card-header text-info">User Information</h3>
                                    {editMode ? (
                                        <form onSubmit={handleEditSubmit}>
                                            <div className="mb-2">
                                                <label>Username:</label>
                                                <input type="text" name="username" value={editData.username} onChange={handleEditChange} required />
                                            </div>
                                            <div className="mb-2">
                                                <label>Email:</label>
                                                <input type="email" name="useremail" value={editData.useremail} onChange={handleEditChange} required />
                                            </div>
                                            <div className="mb-2">
                                                <label>Password:</label>
                                                <input type="password" name="password" value={editData.password} onChange={handleEditChange} />
                                            </div>
                                            <button type="submit">Save</button>
                                            <button type="button" onClick={() => setEditMode(false)} className="ms-2">Cancel</button>
                                            {editMsg && <div className="alert alert-info mt-2">{editMsg}</div>}
                                        </form>
                                    ) : (
                                        <ul>
                                            <li><strong>Name:</strong> {userDetails.username}</li>
                                            <li><strong>Email:</strong> {userDetails.useremail}</li>
                                            <hr />
                                        </ul>
                                    )}
                                    {!editMode && <button onClick={() => setEditMode(true)}>Edit Profile</button>}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 p-2">
                            <div className="login__form">
                                <h5>My Watchlist</h5>
                                {loading ? (
                                    <div>Loading watchlist...</div>
                                ) : error ? (
                                    <div className="alert alert-danger">{error}</div>
                                ) : watchlist.length === 0 ? (
                                    <div>No movies in your watchlist.</div>
                                ) : (
                                    <ul>
                                        {watchlist.map((movie, idx) => (
                                            <li key={movie._id || idx}>
                                                <div className="card mb-2">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} style={{width: '50px', marginRight: '10px'}} />
                                                            <div>
                                                                <strong>{movie.title}</strong><br />
                                                                <span>{movie.release_date}</span>
                                                            </div>
                                                        </div>
                                                        <p className="mt-2">{movie.overview}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserProfile;