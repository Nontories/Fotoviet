import React from "react";
import { Outlet } from "react-router-dom";
import BlogHeader from "../BlogHeader/BlogHeader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer"

const Layout = () => {
    return (
        <div>
            <BlogHeader />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout