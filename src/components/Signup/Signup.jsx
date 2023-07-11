import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Signup/Signup.css"
import SelectionDropdown from "../SelectionDropdown/SelectionDropdown";
import { auth, getPhotographer, logout, registerWithEmailAndPassword } from "../../shared/firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";

const select = {
    default: "Bạn là",
    list: [
        {
            value: "1",
            content: "Khách hàng, cần thuê thợ chụp ảnh"
        },
        {
            value: "2",
            content: "Thợ chụp ảnh cần tìm kiếm khách hàng"
        },
    ]
}

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();
    const handleSignUp = (e) => {
        e.preventDefault();
        Promise.all([
            registerWithEmailAndPassword(firstName, lastName, email, password, role)
                .then((res) => {
                    if (role == "Thợ chụp ảnh cần tìm kiếm khách hàng") {
                        navigate(`/signIn`)
                    } else {
                        alert("Not support this role")
                        // navigate(`/personal/${auth.currentUser.uid}`)
                    }
                })
        ])
    }
    return (
        <form className="signup">
            <h1>Đăng Ký</h1>
            <div className="signup_account">
                <input onChange={(e) => setFirstName(e.target.value)} className="sign_feild" type="text" placeholder="Họ" />
            </div>
            <div className="signup_account">
                <input onChange={(e) => setLastName(e.target.value)} className="sign_feild" type="text" placeholder="Tên" />
            </div>
            <div className="signup_name">
                <input onChange={(e) => setEmail(e.target.value)} className="sign_feild" type="text" placeholder="Email" />
            </div>
            <div className="signup_password">
                <input onChange={(e) => setPassword(e.target.value)} className="sign_feild" type="password" placeholder="••••••••" />
            </div>
            <SelectionDropdown setRole={(role) => setRole(role)} default={select.default} list={select.list} />
            <div className="signup_button">
                <button onClick={handleSignUp}>Đăng ký</button>
            </div>
        </form>
    )
}



export default Signup