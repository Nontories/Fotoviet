import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../Find/find.css"

import { useLocalStore } from "mobx-react-lite";
import { CheckboxDropdown } from "../CheckboxDropdown/CheckboxDropdown";
import SelectionDropdown from "../SelectionDropdown/SelectionDropdown";

const LOCATE = [
    {
        value: "Quận 1",
        label: "Quận 1",
    },
    {
        value: "Quận 2",
        label: "Quận 2",
    },
    {
        value: "Quận 3",
        label: "Quận 3",
    },
    {
        value: "Quận 4",
        label: "Quận 4",
    },
    {
        value: "Quận 5",
        label: "Quận 5",
    }, {
        value: "Quận 6",
        label: "Quận 6",
    }, {
        value: "Quận 7",
        label: "Quận 7",
    },
]

const PRICE = [
    {
        value: 50000,
        label: "50,000đ - 149,000đ",
    },
    {
        value: 150000,
        label: "150,000đ - 249,000đ",
    },
    {
        value: 250000,
        label: "> 250,000đ",
    },
]

const Find = () => {

    const [locate, setLocate] = useState(null)
    const [price, setPrice] = useState(null)
    const navigate = useNavigate();

    const state = useLocalStore(() => ({
        items: [
            { id: "em", label: "Sinh nhật", checked: false },
            { id: "f", label: "Profile", checked: false },
            { id: "mw", label: "Đám cưới", checked: false },
            { id: "cp1", label: "Chân dung", checked: false },
            { id: "cp2", label: "Phong cảnh", checked: false },
            { id: "cp3", label: "Sự kiện", checked: false },
            { id: "cp4", label: "Gia đình", checked: false },
            { id: "cp5", label: "Sản phẩm", checked: false },
            { id: "cp6", label: "Trẻ nhỏ", checked: false },
            { id: "cp7", label: "Khác", checked: false }
        ]
    }));

    const handleSelect = (option) => {
        setLocate(option);
    };

    const handPriceleSelect = (option) => {
        setPrice(option);
    };

    const handleSearch = () => {
        let topicsData = JSON.parse(JSON.stringify(state.items))
        let topicsList = []

        topicsData.map((item, key) => {
            if (item.checked) {
                topicsList.push(item.label)
            }
        })

        console.log(topicsList);
        console.log(locate);
        console.log(price);

        navigate("/find", {
            state: {
                topicsList: topicsList,
                locate: locate,
                price: price
            }
        })
    }

    return (
        <div className="find">
            <div className="find_section">
                <div>Chủ đề chụp</div>
                <CheckboxDropdown items={state.items} />
            </div>
            <div className="find_section">
                <div>Vị trí chụp</div>
                <select className="find_dropdown" value={locate} onChange={(e) => handleSelect(e.target.value)}>
                    <option value="" hidden>Vị trí</option>
                    {LOCATE.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="find_section">
                <div>Ngân sách</div>
                <select className="find_dropdown" value={price} onChange={(e) => handPriceleSelect(e.target.value)}>
                    <option value="" hidden>Giá tiền</option>
                    {PRICE.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="find_button" onClick={handleSearch}>
                <div>Tìm kiếm</div>
            </div>
        </div>
    )
}

export default Find