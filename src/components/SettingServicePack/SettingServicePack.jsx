import React from "react";

import "../SettingServicePack/settingServicePack.css"
import tick from "../../assets/picture/settingPicture/tick.png"

const SettingServicePack = () => {
    return (
        <div className="setting_servicePack">
            <div className="setting_servicePack_header">
                NÂNG CẤP TÀI KHOẢN
            </div>
            <div className="setting_servicePack_content">
                <div className="setting_servicePack_content_header">
                    <p className="setting_servicePack_content_header_title">Các gói dịch vụ</p>
                    <p className="setting_servicePack_content_header_time">3 tháng </p>
                </div>

                <div className="setting_servicePack_content_pack">
                    <div className="setting_servicePack_content_pack_pro">
                        <div className="setting_servicePack--title">FotoPRO</div>
                        <div className="setting_servicePack--information">
                            <img src={tick} alt="" />
                            <p>500MB đăng tải ảnh cho bộ sưu tập</p>
                        </div>
                        <div className="setting_servicePack--information">
                            <img src={tick} alt="" />
                            <p>Tùy chọn 3 chủ đề chụp ảnh</p>
                        </div>
                    </div>
                    <div className="setting_servicePack_content_pack_vip">
                        <div className="setting_servicePack--title">FotoVIP</div>
                        <div className="setting_servicePack--information">
                            <img src={tick} alt="" />
                            <p>2 GB đăng tải ảnh cho bộ sưu tập</p>
                        </div>
                        <div className="setting_servicePack--information">
                            <img src={tick} alt="" />
                            <p>Tùy chọn 5 chủ đề chụp ảnh</p>
                        </div>
                        <div className="setting_servicePack--information">
                            <img src={tick} alt="" />
                            <p>Quản lý trạng thái trao đổi</p>
                        </div>
                        <div className="setting_servicePack--information">
                            <img src={tick} alt="" />
                            <p>Nhắn tin với khách hàng trên Fotoviet</p>
                        </div>
                    </div>
                </div>
                <div className="setting_servicePack_content_button">
                    <div className="setting_servicePack_content_button--pro">20.000 đ</div>
                    <div className="setting_servicePack_content_button--vip">Sắp ra mắt</div>
                </div>
            </div>
            <div className="setting_servicePack_transferInformation">
                <div className="setting_servicePack_transferInformation_header">
                    Thông tin chuyển khoản
                </div>
                <div className="setting_servicePack_transferInformation_content">
                    <div>Tên ngân hàng</div>
                    <div>Agribank Bank </div>
                </div>
                <div className="setting_servicePack_transferInformation_content">
                    <div>Chủ tài khoản</div>
                    <div>Phạm Kim Châu Đông</div>
                </div>
                <div className="setting_servicePack_transferInformation_content">
                    <div>Số tài khoản</div>
                    <div>5500205597830</div>
                </div>
                <div className="setting_servicePack_transferInformation_content">
                    <div>Nội dung chuyển khoản</div>
                    <div>thapbinhphuong fotoviet</div>
                </div>
            </div>
            <div className="setting_servicePack_note">Lưu ý nạp tiền (*):</div>
            <div>- Quý khách ghi đúng thông tin nạp tiền thì tài khoản sẽ được cộng tự động sau khi giao dịch thành công.</div>
        </div>
    )
}

export default SettingServicePack