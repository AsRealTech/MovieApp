import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SectionContent = () => {
    const [populars,  setPopulars] = useState([]);

useEffect(() => {
  const controller = new AbortController();

  const fetchPopular = async () => {
        try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_LINK}/api/popular`,
            { signal: controller.signal }
        );
        // setPopulars(response.data);
        setPopulars(Array.isArray(response.data) ? response.data : response.data.results || []);
        console.log(response.data);
        } catch (error) {
        if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
        } else {
            console.error("Fetch error:", error);
        }
        }
    };

    fetchPopular();

    return () => controller.abort();
    }, []);


    return ( 
        <>
                <section className="product spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">

                                
                                <div className="popular__product">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-8">
                                            <div className="section-title">
                                                <h4>Popular Shows</h4> 
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4">
                                            <div className="btn__all">
                                                <a href="#" className="primary-btn">View All <span className="arrow_right"></span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {populars && populars.slice(0, 6).map( popularM => (

                                            <div className="col-lg-4 col-md-6 col-sm-6" key={popularM.id || popularM.title}>
                                                <div className="product__item">
                                                    <div className="product__item__pic set-bg">
                                                        <img src={`https://image.tmdb.org/t/p/w500${popularM.poster_path}`} />
                                                        <div className="ep"><i className="fa fa-star"></i> {popularM.vote_average}</div>
                                                        <div className="comment"><i className="fa fa-comments"></i> 11</div>
                                                        <div className="view"><i className="fa fa-eye"></i> 9141</div>
                                                    </div>
                                                    <div className="product__item__text">
                                                        <ul><br/>
                                                            <li>Active</li>
                                                            <li>Movie</li>
                                                        </ul>
                                                        <small><p className="text-info">{popularM.overview.split(" ").slice(0, 20).join(" ") + "..."}</p></small>
                                                        <h5><a href="#">{popularM.original_title}</a> <br/><Link className="btn btn-sm btn-primary" to={"/MovieDetails/"+popularM.id}>View Details  <i
                                            className="fa fa-angle-right"></i></Link> </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                    </div>
                </div>
            </section>
        </>
     );
}
 
export default SectionContent;