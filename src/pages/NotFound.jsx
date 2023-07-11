import React from "react";
import notFound from "../assets/picture/404.png"
import "../styles/notFound.css"

const NotFound = () => {
    return(
        <div className="notfound">
            <img src={notFound} alt="" />
        </div>
    )
}

export default NotFound