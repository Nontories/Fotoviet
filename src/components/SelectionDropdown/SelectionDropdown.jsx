import React from "react";
import Form from 'react-bootstrap/Form';

const SelectionDropdown = (props) => {
    const setSelectRole = (role) => {
        props.setRole(role)
    }
    return (
        <Form.Select onChange={(e) => setSelectRole(e.target.value)} className="sign_feild signup_dropdown" aria-label="Default select example">
            <option hidden>{props.default}</option>
            {props.list.map((item, key) => {
                return (
                    <option key={key} value={item.content}>{item.content}</option>
                )
            })}
        </Form.Select>
    )
}

export default SelectionDropdown