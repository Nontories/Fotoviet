import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../SettingNavbar/settingNavbar.css"

const SettingNavbar = () => {
    return (
        <div className="settingNavbar">
            <div className="settingNavbar_block">
                <h3>Tài khoản</h3>
                <Link to='/setting/thong-tin-ca-nhan' className="settingNavbar_block_link">Thông tin cá nhân</Link>
                <Link to='/setting/ho-so-lam-viec' className="settingNavbar_block_link">Hồ sơ làm việc</Link>
            </div>
            <div className="settingNavbar_block">
                <h3>Quản lý công việc</h3>
                <Link to='/setting/trang-thai-don-hang' className="settingNavbar_block_link">Trạng thái đơn hàng</Link>
            </div>
            <div className="settingNavbar_block">
                <h3>Nâng cấp tài khoản</h3>
                <Link to='/setting/cac-goi-dich-vu' className="settingNavbar_block_link">Các gói dịch vụ</Link>
                <Link to='/setting/lich-su-giao-dich' className="settingNavbar_block_link">Lịch sử giao dịch</Link>
            </div>
        </div>
    )
}

export default SettingNavbar