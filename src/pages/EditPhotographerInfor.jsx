import React, { useEffect, useState } from "react";
import PhotograppherInfor from "../components/PhotographerInfor/PhotographerInfor";

import "../styles/editPhotographerInfor.css"
import { auth, getPhotographer, updateInforPhotographer, uploadFile, uploadMultipleFiles } from "../shared/firebase/firebase";
import { useParams } from "react-router-dom";
import qrCode from "../assets/picture/payments/qr.png";

const EditPhotographerInfor = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accountName, setAccountName] = useState("");
    const [nameInIDCard, setNameInIDCard] = useState("");
    const [numberIDCard, setNumberIDCard] = useState("");
    const [phone, setPhone] = useState("");
    const [workLocations, setWorkLocations] = useState([]);
    const [address, setAddress] = useState("");
    const [instagram, setInstagram] = useState("");
    const [facebook, setFacebook] = useState("");
    const [introdution, setIntrodution] = useState("");
    const [topics, setTopics] = useState([]);
    const [skills, setSkills] = useState([]);
    const [allowance, setAllowance] = useState("");
    const [images, setImages] = useState([]);
    const [pack, setPack] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [follower, setFollower] = useState(0);
    const [rating, setRating] = useState(0);
    const [connected, setConnected] = useState(0);
    const [lastOrder, setLastOrder] = useState((new Date()).toString());
    const [comments, setComments] = useState([]);
    const [verified, setVerified] = useState(false);

    const {userId} = useParams();
    const updateInfor = async () => {
        console.log(images)
        let index = 0;
        await uploadMultipleFiles(images)
        if (thumbnail) {
            uploadFile(thumbnail)
                .then(() => {
                    updateInforPhotographer(
                        firstName,
                        lastName,
                        accountName,
                        nameInIDCard,
                        numberIDCard,
                        phone,
                        workLocations,
                        address,
                        instagram,
                        facebook,
                        introdution,
                        pack,
                        topics,
                        skills,
                        allowance,
                        Array.from(images).map((item, key) => `foto-images/user-${userId}/topic-images/${key}`),
                        `foto-images/user-${userId}`,
                        verified
                    ).then((res) => console.log(res))
                })
        } else {
            updateInforPhotographer(
                firstName,
                lastName,
                accountName,
                nameInIDCard,
                numberIDCard,
                phone,
                workLocations,
                address,
                instagram,
                facebook,
                introdution,
                pack,
                topics,
                skills,
                allowance,
                Array.from(images).map((item, key) => `foto-images/user-${userId}/topic-images/${key}`),
                thumbnail,
                verified
            ).then((res) => alert("update success full"))
        }
    }

    useEffect(() => {
        getPhotographer(userId)
            .then((res) => {
                console.log(res)
                setFirstName(res.firstName);
                setLastName(res.lastName);
                setAccountName(res.accountName);
                setNameInIDCard(res.nameInIDCard);
                setThumbnail(res.thumbnailURL);
                setFollower(res.follower);
                setRating(res.rating);
                setPack(res.pack);
                setConnected(res.connected);
                setLastOrder(res.lastOrder);
                setComments(res.comments);
                setNumberIDCard(res.numberIDCard);
                setPhone(res.phone);
                setWorkLocations(res.workLocations);
                setAddress(res.address);
                setInstagram(res.instagram);
                setFacebook(res.facebook);
                setIntrodution(res.introdution);
                setSkills(res.skills);
                setAllowance(res.allowance);
                setImages(res.images);
                setTopics(res.topics);
                setVerified(res.verified)
            })
    }, [])
    return (
        <div className="editPhotographerInfor">
            <PhotograppherInfor />
            <div className="wrapper__photographer_infor">
                <h1>Account</h1>
                <div className="infor__personal">
                    <div className="text-field">
                        <label htmlFor="">Sua anh ho so</label>
                        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
                    </div>
                    <div className="text-field">
                        <label htmlFor="">First Name</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label htmlFor="">Last Name</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label htmlFor="">Ten tai khoan</label>
                        <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label htmlFor="">Ho ten tren CCCD</label>
                        <input type="text" value={nameInIDCard} onChange={(e) => setNameInIDCard(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label htmlFor="">so CCCD</label>
                        <input type="text" value={numberIDCard} onChange={(e) => setNumberIDCard(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label htmlFor="">so dien thoai</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label htmlFor="">Dia chi</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label htmlFor="">link instagram</label>
                        <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                    </div>
                    <div className="text-field">
                        <label htmlFor="">facebook</label>
                        <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                    </div>
                </div>
                <div className="infor__experience">
                    <h1>Job Experience</h1>
                    <div className="infor__personal">
                        <div className="text-field">
                            <label htmlFor="">Gioi thieu ban than</label>
                            <textarea value={introdution} onChange={(e) => setIntrodution(e.target.value)} />
                        </div>
                        <div className="text-field">
                            <label htmlFor="">Chu de</label>
                            <input value={topics} type="text" onChange={(e) => setTopics(e.target.value)} />
                        </div>
                        <div className="text-field">
                            <label htmlFor="">Goi chup anh</label>
                            <textarea value={pack} onChange={(e) => setPack(e.target.value)} />
                        </div>
                        <div className="text-field">
                            <label htmlFor="">Gioi thieu ky nang</label>
                            <textarea value={skills} onChange={(e) => setSkills(e.target.value)} />
                        </div>
                        <div className="text-field">
                            <label htmlFor="">Chi phi toi thieu</label>
                            <input value={allowance} type="text" onChange={(e) => setAllowance(e.target.value)}/>
                        </div>
                        <div className="text-field">
                            <label htmlFor="">Tai anh len</label>
                            <input type="file" onChange={(e) => setImages(e.target.files)} multiple="multiple" />
                        </div>
                        <div className="text-field">
                            <label>vi tri co the lam viec</label>
                            <input value={workLocations} type="text" onChange={(e) => setWorkLocations((e.target.value))} />
                        </div>
                        {
                            !verified && 
                            <>
                                <h1>Scan below code to complete</h1>
                                <img src={qrCode} alt="" />
                            </>
                        }
                    </div>
                </div>
                <button onClick={updateInfor}>Luu thay doi</button>
            </div>
        </div>
    )
}

export default EditPhotographerInfor