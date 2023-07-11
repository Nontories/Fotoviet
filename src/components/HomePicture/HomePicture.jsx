import React from "react";
import "./homePicture.css"

const Picture = (props) => {
    return (
        <div className="picture">
            <img className="image" src={props.url} alt="" />
            <div className="text">
                <h3>{props.title}</h3>
                <p>{props.name}</p>
            </div>
        </div>
    )
}

export default Picture