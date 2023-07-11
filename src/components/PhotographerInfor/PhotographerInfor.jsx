import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, useNavigate } from "react-router-dom";

import "../PhotographerInfor/photographerInfor.css"
import { UserContext } from '../../context/UserContext';

import avt from "../../assets/picture/avt-default.jpg"
import star from "../../assets/picture/personalPicture/star.png"

const PhotograppherInfor = (props) => {

    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(`/signIn`)
        }
    }, [])

    const renderStar = (rating) => {
        let stars = [];

        for (let i = 0; i < rating; i++) {
            if (rating >= i + 1) {
                stars.push(
                    <img src={star} alt="" />
                );
            }
        }
        return (
            <div className="phographer_infor_fame_star">
                {stars}
            </div>
        );
    }

    return (
        <div className="phographer">
            <div className="phographer_avt">
                <img src={user ? user.thumbnailUrl : avt} alt={avt} />
            </div>
            <div className="phographer_infor">
                <div className="phographer_infor_name">
                    {user ? user.name : ""}
                </div>
                <div className="phographer_infor_fame">
                    <div className="phographer_infor_fame_follow">
                        {user ? user.follower : ""} theo dõi
                    </div>
                    {renderStar(user ? user.rating : 0)}
                    <div className="phographer_infor_fame_rating">
                        {user ? user.rating.toFixed(1) : 0}
                    </div>
                </div>
                <div className="phographer_infor_pack">
                    {user ? user.pack ? "(Gói " + user.pack + ")" : "" : ""}
                    
                </div>
            </div>
            {/* <div className="phographer_detail">
                <div className="phographer_detail_content">
                    <div className="phographer_detail_content_title">Nơi làm việc</div>
                    <div className="phographer_detail_content_text">Hồ Chí Minh</div>
                </div>
                <div className="phographer_detail_content">
                    <div className="phographer_detail_content_title">Đơn hàng gần nhất</div>
                    <div className="phographer_detail_content_text">1 tuần trước</div>
                </div>
                <div className="phographer_detail_content">
                    <div className="phographer_detail_content_title">Đã được kết nối với</div>
                    <div className="phographer_detail_content_text">1300 dự án</div>
                </div>
                <div className="phographer_detail_content">
                    <div className="phographer_detail_content_title">Thời gian phản hồi trung bình</div>
                    <div className="phographer_detail_content_text">2 giờ</div>
                </div>
            </div> */}
        </div>
    )
}

export default PhotograppherInfor