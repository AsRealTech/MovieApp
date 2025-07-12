import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
        const [form, setForm] = useState({username: "", password: ""});
        const [message, setMessage] = useState(""); // Changed from [] to ""
        const navigate = useNavigate();
        const urlApi = import.meta.env.VITE_API_LINK;

        const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value})
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post(`${urlApi}/auth/login`, form);
                if (response.status === 200) {
                    setMessage(response.data.message || "login successful");
                    sessionStorage.setItem("token", response.data.token); // Store token
                    sessionStorage.setItem("userDetails", JSON.stringify(response.data.findUser));
                    // Optional: fetch protected data right away
                    const dashboardRes = await axios.get(`${urlApi}/dashboard`, {
                        headers: {
                            Authorization: `Bearer ${response.data.token}`
                        }
                    });
                    // setMessage(dashboardRes.data.message);
                    console.log(dashboardRes.data.message); // or set in state if needed

                    // Redirect
                    navigate("/account/dashboard", {replace: true});
                }

            } catch (error) {
                setMessage(error.response?.data?.message || "error: " + error.message);
            }
        }


    return ( 
        <>
    {/* <!-- Normal Breadcrumb Begin --> */}
    <section className="normal-breadcrumb set-bg" style={{backgroundImage:"url('assets/img/normal-breadcrumb.jpg')"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="normal__breadcrumb__text">
                        <h2>Login</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Normal Breadcrumb End --> */}

    {/* <!-- Login Section Begin --> */}
    <section className="login spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="login__form">
                        <h3>Login</h3>
                        {message && <p style={{color:"#fff"}}>{message}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="input__item">
                                <input 
                                    type="text" 
                                    name="username"
                                    placeholder="Username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="icon_mail"></span>
                            </div>
                            <div className="input__item">
                                <input type="password" placeholder="Password"                     
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="icon_lock"></span>
                            </div>
                            <button type="submit" className="site-btn">Login Now</button>
                        </form>
                        <a href="#" className="forget_pass">Forgot Your Password?</a>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="login__register">
                        <h3>Dont’t Have An Account?</h3>
                        <Link to="/Register" as={Link} className="primary-btn">Register Now</Link>
                    </div>
                </div>
            </div>
            <div className="login__social">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6">
                        <div className="login__social__links">
                            <span>or</span>
                            <ul>
                                <li><a href="#" className="facebook"><i className="fa fa-facebook"></i> Sign in With
                                Facebook</a></li>
                                <li><a href="#" className="google"><i className="fa fa-google"></i> Sign in With Google</a></li>
                                <li><a href="#" className="twitter"><i className="fa fa-twitter"></i> Sign in With Twitter</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Login Section End --> */}
        </>
     );
}
 
export default Login;