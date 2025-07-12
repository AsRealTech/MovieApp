const Footer = () => {
    return ( 
        <>
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
            {/* <!-- Search model end --> */}



            <script src="/assets/js/jquery-3.3.1.min.js"></script>
            <script src="/assets/js/bootstrap.min.js"></script>
            <script src="/assets/js/player.js"></script>
            <script src="/assets/js/jquery.nice-select.min.js"></script>
            <script src="/assets/js/mixitup.min.js"></script>
            <script src="/assets/js/jquery.slicknav.js"></script>
            <script src="/assets/js/owl.carousel.min.js"></script>
            <script src="/assets/js/main.js"></script>
        </>
     );
}
 
export default Footer;