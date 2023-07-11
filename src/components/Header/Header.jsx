import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/picture/fotovietIcon.png"
import "./header.css"
import { logout, authStateListener, } from "../../shared/firebase/firebase";

const Header = () => {
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        logout()
            .then(() => navigate("/signIn"))
    }
    // authStateListener()

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
            .then(() => {
                navigate("/signIn")
            })
    }

    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        window.location.reload()
    }, [])
    return (
        <div className="header">
            <div className="header_navigate">
                <Link to='/' className="header_navigate_content header_navigate_icon">
                    <img src={logo} alt="fotoviet logo" />
                    <p>fotoviet</p>
                </Link>
                <Link to='/find' className="header_navigate_content header_navigate_find">
                    Tìm thợ chụp ảnh
                </Link>
                <Link to='/blog' className="header_navigate_content header_navigate_blog">
                    Blog
                </Link>
            </div>
            {
                user == {} &&
                <>
                    <div className="header_sign">
                        <Link onClick={handleLogin} to='/signIn' className="header_signin">
                            Đăng nhập
                        </Link>
                        <Link to='/signUp' className="header_signup">
                            Đăng ký
                        </Link>
                    </div>
                </>
            }
            {
                user != {} &&
                <Link to='/signIn' className="header_signup" onClick={handleLogout}>
                    Đăng xuất
                </Link>
            }
        </div>
    )
}

export default Header