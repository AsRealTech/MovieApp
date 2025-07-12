import Login from "./Login";
import HomeSection from "./Home";
import Footer from "./includes/Footer";
import NavBar from "./NavBar";
import SectionContents from "./SectionContent";
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import DashboardLayout from "../../src/components/DashboardLoyout";
import Dashboard from "../../src/components/Dashboard";
import Favorites from "../../src/components/Favorites";
import MovieDetails from "./MovieDetails";
import UserProfile from "../../src/components/UserProfile";
import Watchlist from "../../src/components/Watchlist";

const Content = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={
                    <>
                        <NavBar />
                        <HomeSection />
                        <SectionContents />
                         <Footer />
                    </>
                } />
                <Route path="/login" element={
                        <>
                            <NavBar />
                            <Login />
                             <Footer />
                        </>
                    }  />
                <Route path="/Register" element={
                    <>
                        <NavBar />
                        <Register />
                        <Footer />
                     </>
                    }/>
                    <Route path="/MovieDetails/:id" element={<MovieDetails />} />

                    {/* secured dashboard routes */}

                    <Route path="/account" element={<DashboardLayout />}>
                        <Route path="/account" element={<Dashboard />} >
                            <Route path="/account/dashboard" element={<SectionContents />} />
                            <Route path="/account/favorites" element={<Favorites />}  /> 
                            <Route path="/account/profile" element={<UserProfile />} />  
                            <Route path="/account/watchlist" element={<Watchlist />} />
                        </Route>                  
                    </Route>

                    <Route path="*"  element={
                    <>
                        <NavBar />
                        <HomeSection />
                        <SectionContents />
                         <Footer />
                    </>
                } />

            </Routes>
        </>
    )
};

export default Content;