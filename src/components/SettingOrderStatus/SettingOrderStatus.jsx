import React from "react";

import "../SettingOrderStatus/settingOrderStatus.css"

const SettingOrderStatus = () => {
    return (
        <div className="setting_orderStatus">
            <div className="setting_orderStatus_header">
                QUẢN LÝ CÔNG VIỆC
            </div>
            <div className="setting_orderStatus_content">
                <div className="setting_orderStatus_content_header">
                    Trạng thái trao đổi
                </div>
                <div className="setting_orderStatus_content_table">
                    <div className="setting_orderStatus_content_table_header">
                        <div className="setting_orderStatus_content_table_header_content">
                            Thời gian bắt đầu
                        </div>
                        <div className="setting_orderStatus_content_table_header_content">
                            Tên khách hàng
                        </div>
                        <div className="setting_orderStatus_content_table_header_content">
                            Gói dịch vụ
                        </div>
                        <div className="setting_orderStatus_content_table_header_content">
                            Mức giá
                        </div>
                        <div className="setting_orderStatus_content_table_header_content">
                            Trạng thái trao đổi
                        </div>
                    </div>

                    <div className="setting_orderStatus_content_table_column">
                        <div className="setting_orderStatus_content_table_column_content">
                            8:19 AM 16/05/2023
                        </div>
                        <div className="setting_orderStatus_content_table_column_content">
                            thienanpha
                        </div>
                        <div className="setting_orderStatus_content_table_column_content">
                            Sinh nhật
                        </div>
                        <div className="setting_orderStatus_content_table_column_content">
                            250k - 600k
                        </div>
                        <div className="setting_orderStatus_content_table_column_content">
                            Đã kết thúc
                        </div>
                    </div>

                    <div className="setting_orderStatus_content_table_more">Xem thêm</div>

                </div>
            </div>
        </div>
    )
}

export default SettingOrderStatus