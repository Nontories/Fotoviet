import React, {useContext} from "react";
import "../styles/home.css"
import Picture from "../components/HomePicture/HomePicture"
import Find from "../components/Find/Find"
import { UserContext } from "../context/UserContext";

import bannerPicture from "../assets/picture/homePicture/photographerBanner.png"
import bodyPic1 from "../assets/picture/homePicture/homeBodyPic1.png"
import bodyPic2 from "../assets/picture/homePicture/homeBodyPic2.png"
import bodyPic3 from "../assets/picture/homePicture/homeBodyPic3.png"
import bodyPic4 from "../assets/picture/homePicture/homeBodyPic4.png"
import bodyPic5 from "../assets/picture/homePicture/homeBodyPic5.png"
import bodyPic6 from "../assets/picture/homePicture/homeBodyPic6.png"
import icon1 from "../assets/picture/homePicture/icon1.png"
import icon2 from "../assets/picture/homePicture/icon2.png"
import icon3 from "../assets/picture/homePicture/icon3.png"

const provide = [
    {
        image: icon1,
        header: "Hỗ trợ khách hàng",
        content: "tìm kiếm và kết nối với nhiếp ảnh gia chuyên nghiệp thông qua bộ lọc phân loại và danh sách các nhiếp ảnh gia đang sẵn sàng nhận các dự án nhiếp ảnh."
    },
    {
        image: icon2,
        header: "Hỗ trợ nhiếp ảnh gia",
        content: "tìm kiếm và kết nối với khách hàng có nhu cầu về nhiếp ảnh thông qua việc khách hàng đăng tải thông tin về các dự án nhiếp ảnh của họ."
    },
    {
        image: icon3,
        header: "Cung cấp thông tin",
        content: "về các tin tức xoay quanh lĩnh vực nhiếp ảnh để cập nhật kiến thức và giúp người dùng có thể tìm hiểu thêm về lĩnh vực này."
    }
]

const Home = () => {

    const { user, updateUser } = useContext(UserContext);
    console.log(user);

    return (
        <div className="home">
            <div className="home_banner">
                <div className="home_banner_left">
                    <h1>Tìm thợ chụp ảnh ngay bây giờ</h1>
                    <p><span>fotoviet</span> sẽ sắp xếp những thợ chụp ảnh phù hợp với bạn dựa trên những bộ lọc bên dưới  </p>
                    <div className="home_banner_search">
                        <Find />
                    </div>
                </div>
                <div className="home_banner_right">
                    <div className="home_banner_right_text">
                        <p>Ánh Nguyễn</p>
                        <h3>Chuyên gia ảnh sinh nhật</h3>
                    </div>
                    <div className="home_banner_right_picture">
                        <img src={bannerPicture} alt="" />
                    </div>
                </div>
            </div>
            <div className="home_body">
                <h1 className="home_body_title"><span>fotoviet</span> góp phần lưu giữ khoảnh khắc đặc biệt</h1>
                <p className="home_body_text">từ những chuyên gia trong lĩnh vực nhiếp ảnh trên khắp đất nước Việt Nam</p>
                <div className="home_body_picture">
                    <div className="home_body_picture_left">
                        <div className="picture1 picture_left">
                            <Picture url={bodyPic1} title={"Sinh Nhật"} name={"Nguyễn Nam"}></Picture>
                        </div>
                        <div className="picture2 picture_left">
                            <Picture url={bodyPic2} title={"Đám cưới"} name={"Hoàng Anh"}></Picture>
                        </div>
                    </div>
                    <div className="home_body_picture_center">
                        <div className="picture3 picture_center">
                            <Picture url={bodyPic3} title={"Đường phố"} name={"Anh Khoa"}></Picture>
                        </div>
                    </div>
                    <div className="home_body_picture_right">
                        <div className="home_body_picture_right_pack">
                            <div className="picture_right_top">
                                <div className="picture4">
                                    <Picture url={bodyPic4} title={"Kỷ yếu"} name={"Hoài Nam"}></Picture>
                                </div>
                            </div>
                            <div className="picture_right_bottom">
                                <div className="picture5 picture_right_bottom_left">
                                    <Picture url={bodyPic5} title={"Thơ ấu"} name={"Anh Thư"}></Picture>
                                </div>
                                <div className="picture6 picture_right_bottom_right">
                                    <Picture url={bodyPic6} title={"Thức ăn"} name={"Thiên An"}></Picture>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home_provide">
                <div className="home_provide_header">
                    <h1>Chúng tôi cung cấp</h1>
                    <p>các giải pháp </p>
                </div>
                <div className="home_provide_content">
                    {provide.map((item,index) => {
                        return (
                            <div className="home_provide_content_item">
                                <img className="home_provide_content_image" src={item.image} alt="" />
                                <h2 className="home_provide_content_header">{item.header}</h2>
                                <div className="home_provide_content_text">{item.content}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home