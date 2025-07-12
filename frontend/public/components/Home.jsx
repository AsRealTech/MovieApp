const HomeSection = () => {
    return ( 
        <>

            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item d-block">
                        <img src="assets/img/hero/hero-1.jpg" className="w-100"/>
                        <div className="carousel-caption d-none d-md-block hero__text">
                            <div className="label">Adventure</div>
                            <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                            <p>After 30 days of travel across the world...</p>
                            <a href="#"><span>Watch Now</span> <i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                    <div className="carousel-item d-block">
                        <img src="assets/img/hero/hero-1.jpg" className="w-100" />
                        <div className="carousel-caption d-none d-md-block">
                            <div className="label">Adventure</div>
                            <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                            <p>After 30 days of travel across the world...</p>
                            <a href="#"><span>Watch Now</span> <i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                    <div className="carousel-item d-block">
                        <img src="assets/img/hero/hero-1.jpg" className="w-100" />
                        <div className="carousel-caption d-none d-md-block hero__text">
                            <div className="label">Adventure</div>
                            <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                            <p>After 30 days of travel across the world...</p>
                            <a href="#"><span>Watch Now</span> <i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

        </>
     );
     
}
 
export default HomeSection;