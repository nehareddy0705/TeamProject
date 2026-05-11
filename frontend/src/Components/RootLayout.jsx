import Header from "./header";
import Footer from "./Footer"
import { Outlet } from "react-router";
import { useEffect } from "react";
import Home from "./home";

function RootLayout(){
    return(
        <div>
            <Header />
            <div className="min-h-screen   ">
                <Outlet />
            <Home/>
            </div>
            <Footer />
        </div>
    )
}

export default RootLayout;