import { Link, Navigate, Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../../public/components/NavBar";

const Dashboard = () => {
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const userDetail = JSON.parse(sessionStorage.getItem("userDetails"));
        setUserDetails(userDetail);
    }, []);
    
    return ( 
        <>
        <title>MovieApp | Dashboard </title>
        <NavBar/>
        <section className="normal-breadcrumb set-bg" style={{backgroundImage:"url('assets/img/normal-breadcrumb.jpg')"}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="normal__breadcrumb__text">
                            <h2>Dashboard</h2>
                            <p>Welcome back {userDetails.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* Navigation Section */}
        <nav className="dashboard-nav mb-4">
            <div className="container">
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/account/dashboard">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/account/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/account/favorites">Favorites</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/account/watchlist">Watchlist</Link>
                    </li>
                </ul>
            </div>
        </nav>
        <Outlet />
        <footer className="footer">
                <div className="page-up">
                    <a href="#" id="scrollToTopButton"><span className="arrow_carrot-up"></span></a>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="footer__logo">
                                <a href="./index.html"><img src="assets/img/logo.png" alt=""/></a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="footer__nav">
                                <ul>
                                    <li className="active"><a href="./index.html">Homepage</a></li>
                                    <li><a href="./categories.html">Categories</a></li>
                                    <li><a href="./blog.html">Our Blog</a></li>
                                    <li><a href="#">Contacts</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <p>
                            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | MovieApp by chisom
                            </p>

                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Footer Section End --> */}

            {/* <!-- Search model Begin --> */}
            <div className="search-model">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="search-close-switch"><i className="icon_close"></i></div>
                    <form className="search-model-form">
                        <input type="text" id="search-input" placeholder="Search here....." />
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default Dashboard;