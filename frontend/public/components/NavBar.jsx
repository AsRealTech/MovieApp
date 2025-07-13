import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./includes/Header";
import LogoutButton from "../../src/components/Logout";

const NavBar = () => {
    const [activeUser, setActiveUser] = useState(sessionStorage.getItem("token"));
    return ( 
        <>
    
    <Header />
    {/* <div id="preloder">
        <div className="loader"></div>
    </div> */}

    <header className="header">
        <div className="container">
            <div className="row">
                <div className="col-lg-2">
                    <div className="header__logo">
                        <a href="/">
                            <img src="/assets/img/logo.png" alt=""/>
                        </a>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="header__nav">
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="header__right">
                      
                        { activeUser ? <LogoutButton /> : <Link to="/login"><span className="icon_profile"></span>Login</Link>}
                    </div>
                </div>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
    </header>
    {/* <!-- Header End --> */}
        </>
     );
}
 
export default NavBar;