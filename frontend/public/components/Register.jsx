import { Link } from "react-router-dom";
import { useState } from "react";
import axios  from "axios";

const Register = () => {
      const [form, setForm] = useState({
        username: "",
        useremail: "",
        password: "",
        watchlist: [],
        favorites: [],
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post(import.meta.env.VITE_API_LINK+"/auth/register", form);
        setMessage(res.data.message || "Registration successful!");
        } catch (error) {
        setMessage(
            error.response?.data?.message || "Registration failed. Please try again."
        );
        }
    };

    return ( 
        <>
    {/* <!-- Normal Breadcrumb Begin --> */}
    <section className="normal-breadcrumb set-bg" style={{backgroundImage:"url('assets/img/normal-breadcrumb.jpg')"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="normal__breadcrumb__text">
                        <h2>Registration</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Normal Breadcrumb End --> */}


    {/* <!-- Signup Section Begin --> */}
    <section className="signup spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                        {message && <p className="text-info">{message}</p>}
                    <div className="login__form">
                        <h3>Sign Up</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="input__item">
                                      <input
                                            type="email"
                                            name="useremail"
                                            placeholder="Email"
                                            value={form.useremail}
                                            onChange={handleChange}
                                            required
                                        />
                                <span className="icon_mail"></span>
                            </div>
                            <div className="input__item">
                                        <input 
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            value={form.username}
                                            onChange={handleChange}
                                            required 
                                        />
                                <span className="icon_profile"></span>
                            </div>
                            <div className="input__item">
                                <input         
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required 
                                />
                                <span className="icon_lock"></span>
                            </div>
                            <button type="submit" class="site-btn">Register Now</button>
                        </form>
                        <h5>Already have an account? <Link as={Link} to="/login">Log In!</Link></h5>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="login__social__links">
                        <h3>Login With:</h3>
                        <ul>
                            <li><a href="#" className="facebook"><i className="fa fa-facebook"></i> Sign in With Facebook</a>
                            </li>
                            <li><a href="#" className="google"><i className="fa fa-google"></i> Sign in With Google</a></li>
                            <li><a href="#" className="twitter"><i className="fa fa-twitter"></i> Sign in With Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- Signup Section End --> */}
        </>
     );
}
 
export default Register;