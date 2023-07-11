import React, {useEffect, useContext} from "react";
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

import "../styles/setting.css"
import PhotograppherInfor from "../components/PhotographerInfor/PhotographerInfor";
import SettingNavbar from "../components/SettingNavbar/SettingNavbar";

const Setting = (props) => {

    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(`/signIn`)
        }
    }, [])

    return (
        <div className="setting">
            <PhotograppherInfor />
            <div className="setting_content">
                <SettingNavbar />
                <Outlet />
            </div>
        </div>
    )
}

export default Setting