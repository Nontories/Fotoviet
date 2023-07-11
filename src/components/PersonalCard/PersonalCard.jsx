import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import "./PersonalCard.css"
import heart from "../../assets/picture/findPagePicture/heart.png"
import star from "../../assets/picture/personalPicture/star.png"
import { auth, getImage, getMultipleImages } from "../../shared/firebase/firebase";

const PersonalCard = (props) => {
    const [thumbnail, setThumbnail] = useState();
    const [images, setImages] = useState([]);

    useEffect(() => {
        Promise.all([
            props.thumbnailUrl.includes("https://ui-avatars.com/api/") ?
                setThumbnail(props.thumbnailUrl + props.name) :
                getImage(props.thumbnailUrl)
                    .then((res) => setThumbnail(res)),
            getMultipleImages(`foto-images/user-${props.uid}/topic-images/`)
                .then((res) => {
                    // console.log(res);
                    setImages(res)
                })
        ])
    }, [])

    return (
        <div className="card">
            <div className="card_content">
                <div className="card_content_image">
                    <img src={images[0] ?? `https://th.bing.com/th/id/R.b62a5cf8185abc2fb24292b722b91a1c?rik=1trBRq6aT2serA&riu=http%3a%2f%2fufixo.in%2fwp-content%2fuploads%2f2020%2f07%2fplaceholder-2-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1-1024x1024.png&ehk=I%2bKbTg36DnX%2bGNPyQlPlCQFYvXVCuLgupRx1Bjojr0U%3d&risl=&pid=ImgRaw&r=0`} alt="" />
                </div>
                <div className="card_content_link">
                    <div className="card_content_link_avt">
                        <img src={thumbnail} alt="" />
                    </div>
                    <Link to={"/personal/" + props.uid} className="card_content_link_name">{props.name}</Link>
                </div>
                <div className="card_content_descrip">
                    {props.introdution != "" ? props.introdution : "Empty introdution"}
                </div>
                <div className="card_content_footer">
                    <div className="card_content_footer_heart">
                        <div className="card_content_footer_heart_hollow">
                            <img className="heart_icon" src={heart} alt="" />
                        </div>
                    </div>
                    <div className="card_content_footer_rating">
                        <div className="card_content_footer_rating_star">
                            <img src={star} alt="" />
                        </div>
                        <div className="card_content_footer_rating_number">
                            {props.rating}
                        </div>
                        <div className="card_content_footer_rating_amount">({props.amount})</div>
                        <div className="card_content_footer_rating_price">
                            | Từ {props.allowance}k/h
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalCard