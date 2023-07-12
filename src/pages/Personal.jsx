import React, { useEffect, useState } from "react";
import "../styles/personal.css"
import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';
import photographer from "../data/PhotographerData"

import star from "../assets/picture/personalPicture/star.png"
import facebookIcon from "../assets/picture/facebookIcon.png"
import instarIcon from "../assets/picture/instarIcon.png"
import googleIcon from "../assets/picture/googleIcon.png"

import image1 from "../assets/picture/personalPicture/image_1.png"
import image2 from "../assets/picture/personalPicture/image_2.png"
import image3 from "../assets/picture/personalPicture/image_3.png"
import image4 from "../assets/picture/personalPicture/image_4.png"
import { auth, getAccountInfor, getPhotographer } from "../shared/firebase/firebase";

const colection = [
    {
        key: 1,
        name: "Sinh Nhật",
        image_1: image1,
        image_2: image2,
        image_3: image3,
        image_4: image4,
    },
    {
        key: 2,
        name: "Sản phẩm",
        image_1: image2,
        image_2: image1,
        image_3: image3,
        image_4: image4,
    },
    {
        key: 3,
        name: "Đám cưới",
        image_1: image1,
        image_2: image2,
        image_3: image3,
        image_4: image4,
    },
    {
        key: 4,
        name: "Kỷ yếu",
        image_1: image2,
        image_2: image1,
        image_3: image3,
        image_4: image4,
    },
    {
        key: 5,
        name: "Phong cảnh",
        image_1: image1,
        image_2: image2,
        image_3: image3,
        image_4: image4,
    },
]

const comment = [
    {
        name: "Taipham",
        rating: 5,
        time: 1,
        locate: "Hồ Chí Minh ",
        content: "Phương đã tạo ra những bức ảnh đẹp tuyệt vời cho bữa tiệc sinh nhật của chúng tôi. Anh ấy là một nhiếp ảnh gia tài năng và rất chuyên nghiệp trong công việc."
    },
    {
        name: "Anh_1236",
        rating: 5,
        time: 1,
        locate: "Hồ Chí Minh ",
        content: "Chúng tôi rất hài lòng với những bức ảnh mà Phương chụp cho bữa tiệc sinh nhật. Anh ấy đã bắt được những khoảnh khắc đẹp và tạo nên những kỷ niệm đáng nhớ cho chúng tôi."
    },
    {
        name: "Tramle_102",
        rating: 5,
        time: 1,
        locate: "Hồ Chí Minh ",
        content: "Sự tận tâm và chuyên nghiệp của Phương trong việc chụp ảnh đã tạo ra những bức ảnh đẹp tuyệt vời cho bữa tiệc sinh nhật của chúng tôi. Chúng tôi rất cảm kích và sẽ giới thiệu anh ấy đến bạn bè của chúng tôi."
    },
]

const Personal = () => {
    const [topic, setTopic] = useState(colection[0])
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [currnetTopic, setCurrnetTopic] = useState(0);

    useEffect(() => {
        getAccountInfor()
            .then((res) => {
                res.forEach((doc) => {
                    if (doc.data().uid === userId) {
                        setUser(doc.data())
                        console.log(doc.data())
                    }
                })
            })
    }, [userId])

    return (
        <div className="personal">
            {
                user &&
                <>
                    <div className="personal_infomation">
                        <div className="personal_infomation_right">
                            <div className="personal_infomation_right_top">
                                <div className="personal_avt"><img src={user.thumbnailUrl} alt="" /></div>
                                <div className="personal_detail">
                                    <div className="personal_detail_name">{user.name}</div>
                                    <div className="personal_detail_quality">
                                        <div className="personal_detail_quality_follow">{user.follower}k+ theo dõi</div>
                                        <div className="personal_detail_quality_rating">
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <p>5.0</p>
                                        </div>
                                    </div>
                                    <div className="personal_detail_link">
                                        <a href="#"><img src={facebookIcon} alt="" /></a>
                                        <a href="#"><img src={instarIcon} alt="" /></a>
                                        <a href="#"><img src={googleIcon} alt="" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="personal_infomation_right_bottom">
                                <div className="personal_description">
                                    {user.introduce}
                                </div>
                            </div>
                        </div>
                        <div className="personal_infomation_left">
                            <div className="personal_infomation_card">
                                <div className="personal_infomation_card_content">
                                    <div className="personal_infomation_card_content_title">Nơi làm việc</div>
                                    <div className="personal_infomation_card_content_text">{user.locate}</div>
                                </div>
                                <div className="personal_infomation_card_content">
                                    <div className="personal_infomation_card_content_title">Đơn hàng gần nhất</div>
                                    <div className="personal_infomation_card_content_text">1 tuần trước</div>
                                </div>
                                <div className="personal_infomation_card_content">
                                    <div className="personal_infomation_card_content_title">Đã được kết nối với</div>
                                    <div className="personal_infomation_card_content_text">1300 dự án</div>
                                </div>
                                <div className="personal_infomation_card_content">
                                    <div className="personal_infomation_card_content_title">Thời gian phản hồi trung bình</div>
                                    <div className="personal_infomation_card_content_text">2 giờ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="personal_collection">
                        <h1>Bộ sưu tập của {user.lastName}</h1>
                        {/* <div className="personal_collection_nav">
                            {user.topics.map((item, key) => {
                                return (
                                    <div className={item.key === 1 ? "personal_collection_nav_topic active" : "personal_collection_nav_topic"}
                                    // onClick={(e) => { removeActive(); e.target.classList.add("active"); setTopic(colection[item.key - 1]) }}
                                    >
                                        {item.title}
                                    </div>
                                )
                            })}
                        </div> */}
                        {/* <div className="personal_collection_image">
                            {
                                user.topics[currnetTopic]?.images?.map(item => {
                                    return (
                                        <div className="personal_collection_image_left">
                                            <img className="personal_collection_image_left_bottom" src={item} alt="" />
                                        </div>
                                    );
                                })
                            }
                        </div> */}
                    </div>
                    <div className="personal_rating">
                        <div className="personal_rating_title">
                            Đánh giá và nhận xét của khách hàng đã kết nối
                        </div>
                        <div className="personal_rating_parameter">
                            <div className="personal_rating_parameter_number">
                                5.0
                            </div>
                            <div className="personal_rating_parameter_content">
                                <div className="personal_rating_parameter_content_star">
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                    <img src={star} alt="" />
                                </div>
                                <div className="personal_rating_parameter_content_amount">
                                    1200 nhận xét
                                </div>
                            </div>
                        </div>
                        <div className="personal_rating_comment">
                            {comment.map((item, key) => {
                                return (
                                    <div className="personal_rating_comment_item">
                                        <div className="comment_item_infor">
                                            <div className="comment_item_infor_top">
                                                <div className="comment_item_infor_top--name">{item.name}</div>
                                                <div className="comment_item_infor_top--rating">{item.rating.toFixed(1)}</div>
                                            </div>
                                            <div className="comment_item_infor_bottom">
                                                {item.time} Tuần trước | {item.locate}
                                            </div>
                                        </div>
                                        <div className="comment_item_content">
                                            {item.content}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    {/* {
                        user &&
                        JSON.stringify(user)
                    } */}
                </>
            }
            {
                !user &&
                <a href="/login">Login back to get information</a>
            }
        </div>
    )
}

function removeActive(_class) {
    document.querySelectorAll(`.personal_collection_nav_topic`).forEach((item) => {
        item.classList.remove("active")
    })
}

export default Personal