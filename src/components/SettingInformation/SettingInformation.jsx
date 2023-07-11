import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import { updateInforPhotographer } from "../../shared/firebase/firebase";

import "../SettingInformation/settingInformation.css"
import { UserContext } from '../../context/UserContext';

import editButton from "../../assets/picture/editButton.png"

const IMAGES = [
    {
        topics: "Sinh nhật",
        skill: "sinh nhat skill",
        price: 150000,
        images: []
    },
    {
        topics: "Profile",
        skill: "sinh nhat skill",
        price: 150000,
        images: []
    },
    {
        topics: "Đám cưới",
        skill: "sinh nhat skill",
        price: 150000,
        images: []
    },
]

const TopicsList = [
    "Sinh nhật", "Profile", "Đám cưới", "Chân dung", "Phong cảnh", "Sự kiện", "Gia đình", "Sản phẩm", "Trẻ nhỏ", "Khác",
]

const SettingInformation = () => {
    const { user, updateUser } = useContext(UserContext);
    const [editInfor, setEditInfor] = useState(true);
    const [editFile, setEditFile] = useState(true);
    const [inforForm, setInforForm] = useState([]);
    const [fileForm, setFileForm] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [imagesIndex, setImagesIndex] = useState(null)
    const [selectedImages, setSelectedImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showImagesModal, setShowImagesModal] = useState(false);
    const [formData, setFormData] = useState({
        topics: '',
        skill: '',
        price: 0,
        images: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(`/signIn`)
        }
    }, []);

    useEffect(() => {
        setInforForm([
            {
                title: 'Họ và tên*',
                name: 'name',
                value: user ? user.name : "",
                placeholder: '.........................',
            },
            {
                title: 'Tên tài khoản*',
                name: 'accountName',
                value: user ? user.accountName : "",
                placeholder: '.........................',
            },
            {
                title: 'Họ tên trên CMND',
                name: 'identityName',
                value: user ? user.nameInIDCard : "",
                placeholder: '.........................',
            },
            {
                title: 'Số CMND',
                name: 'identityNumber',
                value: user ? user.numberIDCard : "",
                placeholder: '.........................',
            },
            {
                title: 'Số điện thoại',
                name: 'phoneNumber',
                value: user ? user.phone : "",
                placeholder: '.........................',
            },
            {
                title: 'Địa chỉ',
                name: 'address',
                value: user ? user.address : "",
                placeholder: '.........................',
            },
        ]);
        setFileForm(IMAGES);
    }, [user]);

    useEffect(() => {
        if (editIndex !== null) {
            const editedItem = fileForm[editIndex];
            setFormData({
                topics: editedItem.topics,
                skill: editedItem.skill,
                price: editedItem.price,
                images: [],
            });
            handleShowModal(); // Move handleShowModal inside the useEffect
        }
    }, [editIndex]);

    const handleInforChange = useCallback((e, index) => {
        const { name, value } = e.target;
        setInforForm(prevInforForm => {
            const updatedForm = [...prevInforForm];
            updatedForm[index] = { ...updatedForm[index], value: value };
            return updatedForm;
        });
    }, []);

    const handleShowModal = useCallback(() => {
        if (editIndex !== null) {
            const editedItem = fileForm[editIndex];
            setFormData({
                topics: editedItem.topics,
                skill: editedItem.skill,
                price: editedItem.price,
                images: [],
            });
        } else {
            setFormData({
                topics: "",
                skill: "",
                price: 0,
                images: [],
            });
        }
        setShowModal(true);
    }, [editIndex, fileForm]);

    const handleEdit = useCallback((index) => {
        setEditIndex(index);
        handleShowModal();
    }, [handleShowModal]);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        setEditIndex(null);
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'file' ? Array.from(files) : value,
        }));
    }, []);

    const handleChangeData = useCallback((e) => {
        e.preventDefault();
        const data = {
            firstName: findValue(inforForm, "name").value,
            accountName: findValue(inforForm, "accountName").value,
            nameInIDCard: findValue(inforForm, "identityName").value,
            numberIDCard: findValue(inforForm, "identityNumber").value,
            phone: findValue(inforForm, "phoneNumber").value,
            address: findValue(inforForm, "address").value,
            images: fileForm
        }
        console.log(data);
        console.log(user);
        updateInforPhotographer({accountName: findValue(inforForm, "name").value})
    }, [inforForm, fileForm]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        let tmpData = [...fileForm];
        
        if (editIndex === null) {
            const isTopicMatched = tmpData.some((item) => item.topics === formData.topics);
            if (isTopicMatched) {
                console.log('Topic already exists:', formData.topics);
            } else {
                tmpData.push(formData);
                setFormData({
                    topics: '',
                    skill: '',
                    price: 0,
                    images: [],
                });
                setFileForm(tmpData);
                setShowModal(false);
            }
        } else {
            const foundObjectIndex = fileForm.findIndex(obj => obj.topics === formData.topics);
            if (foundObjectIndex !== -1 && foundObjectIndex !== editIndex) {
                console.log("Topic already exists:", formData.topics);
            } else {
                tmpData[editIndex] = formData;
                setFormData({
                    topics: '',
                    skill: '',
                    price: 0,
                    images: [],
                });
                setFileForm(tmpData);
                setShowModal(false);
            }
        }
    }, [editIndex, fileForm, formData]);

    const handleOpenImagesModal = useCallback((index) => {

        setShowImagesModal(true);
        setTimeout(() => {
            setImagesIndex(index);
        }, 0);
    });

    const handleCloseImagesModal = useCallback(() => {
        setImagesIndex(null);
        setShowImagesModal(false);
    });

    const handleImageUpload = useCallback((e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);
    }, []);

    const handleImagesSubmit = useCallback((e) => {
        e.preventDefault();
        // updateInforPhotographer({accountName: "minh"})
        console.log('Selected Images:', selectedImages);
        if(imagesIndex === null){
            handleCloseImagesModal()
        }else{
            fileForm[imagesIndex] = selectedImages
            handleCloseImagesModal()
        }
    }, [selectedImages]);

    const findValue = useCallback((array, name) => {
        const index = array.findIndex(item => item.name === name)
        return array[index]
    }, []);

    return (
        <>
            <form className="setting_information">
                <h1 className="setting_information_header">TÀI KHOẢN</h1>
                <div className="setting_information_individua">
                    <div className="setting_information_individua_header">
                        <h3>Thông tin  cá nhân</h3>
                        <img className="setting_information_editButton" src={editButton} alt="" onClick={() => { setEditInfor(!editInfor) }} />
                    </div>
                    {inforForm.map((field, index) => (
                        <div className="setting_information_individua_content" key={index}>
                            <p className="setting_information_individua_content_title">
                                {field.title}
                            </p>
                            <input
                                type="text"
                                className="setting_information_individua_content_input"
                                name={field.name}
                                value={field.value}
                                placeholder={field.placeholder}
                                disabled={editInfor}
                                onChange={(e) => handleInforChange(e, index)}
                            />
                        </div>
                    ))}
                </div>
                <div className="setting_information_profile">
                    <div className="setting_information_profile_header">
                        <h3>Hồ sơ làm việc</h3>
                        <img className="setting_information_editButton" src={editButton} alt="" onClick={() => { setEditFile(!editFile) }} />
                    </div>
                    <p className="setting_information_profile_content_title">
                        Giới thiệu bản thân *
                    </p>
                    <textarea className="setting_information_profile_content_input" disabled={editFile}></textarea>
                    <p className="setting_information_profile_content_title">
                        Chủ đề chụp ảnh * (tải ảnh tại đây)
                    </p>
                    {fileForm.map((item, key) => {
                        return (
                            <div className="setting_information_profile_content" key={key}>
                                <Button variant="primary" onClick={() => handleEdit(key)}>
                                    Edit
                                </Button>
                                <div className="setting_information_profile_content_topic">
                                    <p className="setting_information_profile_content_title">
                                        Chủ đề:
                                    </p>
                                    <input className="setting_information_profile_content_topic_item" value={item.topics} disabled></input>
                                </div>
                                <div className="setting_information_profile_content_topic">
                                    <p className="setting_information_profile_content_title">
                                        Giới thiệu về kỹ năng :
                                    </p>
                                    <textarea className="setting_information_profile_skill_input" value={item.skill} disabled></textarea>
                                </div>
                                <div className="setting_information_profile_content_topic">
                                    <p className="setting_information_profile_content_title">
                                        Mức chi phí tối thiểu
                                    </p>
                                    <input className="setting_information_profile_content_topic_item" value={item.price} disabled />
                                </div>
                                <div className="setting_information_profile_content_topic">
                                    <p className="setting_information_profile_content_title">
                                        Tải ảnh lên :
                                    </p>
                                    <div className="setting_information_profile_content_topic_item">
                                        150.000
                                    </div>
                                    <Button variant="primary" onClick={() => handleOpenImagesModal(key)}>
                                        Open Modal
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                    <Button variant="primary" onClick={handleShowModal}>
                        thêm chủ để chụp ảnh
                    </Button>
                </div>
                <div className="setting_information_button">
                    <button onClick={handleChangeData}>Lưu thay đổi</button>
                </div>
            </form>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTopics">
                            <Form.Label>Topics</Form.Label>
                            <Form.Control
                                as="select"
                                name="topics"
                                value={formData.topics}
                                onChange={handleChange}
                            >
                                {TopicsList.map((item, index) => {
                                    return (
                                        <option value={item} key={index}>{item}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formSkill">
                            <Form.Label>Skill</Form.Label>
                            <Form.Control
                                type="text"
                                name="skill"
                                value={formData.skill}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {!editIndex ?
                            <Form.Group controlId="formImages">
                                <Form.Label>Images</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="images"
                                    multiple
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            : ""}
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showImagesModal} onHide={handleCloseImagesModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Image Upload</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleImagesSubmit}>
                        <Form.Group controlId="formImages">
                            <Form.Label>Select Image(s)</Form.Label>
                            <Form.Control
                                type="file"
                                name="images"
                                multiple
                                onChange={handleImageUpload}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default React.memo(SettingInformation);
