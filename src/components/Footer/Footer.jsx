import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./footer.css"
import fbLogo from "../../assets/picture/facebookIcon.png"
import instarLogo from "../../assets/picture/instarIcon.png"
import googleLogo from "../../assets/picture/googleIcon.png"
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_link">
                <div className="footer_link_text">
                    <p><span>fotoviet</span> - nơi gắn kết thợ chụp ảnh với những người yêu ảnh</p>
                    <div className="footer_link_text_icon">
                        <a rel="stylesheet" href="#" className="fbIcon">
                            <img src={fbLogo} alt="" />
                        </a>
                        <a rel="stylesheet" href="#" className="instarIcon">
                            <img src={instarLogo} alt="" />
                        </a>
                        <a rel="stylesheet" href="#" >
                            <img src={googleLogo} alt="" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer_home">
                <h2>Trang chủ</h2>
                <Link to='/' className="footer_home_content footer_home_findPhotographer">
                    Tìm thợ chụp ảnh
                </Link>
                <Link to='/' className="footer_home_content footer_home_findProject">
                    Tìm dự án
                </Link>
                <Link to='/' className="footer_home_content footer_home_competition">
                    Cuộc thi
                </Link>
                <Link to='/' className="footer_home_content footer_home_blog">
                    Blog
                </Link>
                <Link to='/' className="footer_home_content footer_home_contact">
                    Liên hệ
                </Link>
            </div>
            <div className="footer_support">
                <h2>Hỗ trợ</h2>
                <Link to='/' className="footer_support_content footer_support_learn">
                    Tìm hiểu về chúng tôi
                </Link>
                <Link to='/' className="footer_support_content footer_support_rules">
                    Điều khoản sử dụng
                </Link>
                <Link to='/' className="footer_support_content footer_support_security">
                    Chính sách bảo mật
                </Link>
                <Link to='/' className="footer_support_content footer_support_security">
                    Giải quyết khiếu nai
                </Link>
                <Link to='/' className="footer_support_content footer_home_method">
                    Cách thức hoạt động
                </Link>
            </div>
            <div className="footer_contact">
                <h2>Liên hệ</h2>
                <p>(+84) 028 9999 999</p>
                <p>(+84) 028 9999 999</p>
            </div>
        </div>
    )
}

export default Footer