import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home"
import Blog from "../pages/Blog"
import SignUp from "../pages/SignupPage"
import SignIn from "../pages/SigninPage"
import FindPhotographer from "../pages/FindPhotographer";
import Layout from "../components/Layout/Layout";
import Personal from "../pages/Personal";
import BlogDetail from "../pages/BlogDetail";
import EditPhotographerInfor from "../pages/EditPhotographerInfor";
import NotFound from "../pages/NotFound";
import Setting from "../pages/Setting";

import SettingInformation from "../components/SettingInformation/SettingInformation";
import SettingWorkProfile from "../components/SettingWorkProfile/SettingWorkProfile";
import SettingOrderStatus from "../components/SettingOrderStatus/SettingOrderStatus";
import SettingServicePack from "../components/SettingServicePack/SettingServicePack";
import SettingTransactionHistory from "../components/SettingTransactionHistory/SettingTransactionHistory";
import { Payment } from "../pages/Payment";

const UserRouter = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/blog" element={<Blog />}></Route>
                <Route path="/find" element={<FindPhotographer />}></Route>
                <Route path="/signUp" element={<SignUp />}></Route>
                <Route path="/signIn" element={<SignIn />}></Route>
                <Route path="/personal/:userId" element={<Personal />}></Route>
                <Route path="/personal/:userId/edit" element={<EditPhotographerInfor />}></Route>
                <Route path="/blog/:blogId" element={<BlogDetail />} />
                <Route path="/setting" element={<Setting />}>
                    <Route path="/setting/thong-tin-ca-nhan" element={<SettingInformation />} />
                    <Route path="/setting/ho-so-lam-viec" element={<SettingInformation />} />
                    <Route path="/setting/trang-thai-don-hang" element={<SettingOrderStatus />} />
                    <Route path="/setting/cac-goi-dich-vu" element={<SettingServicePack />} />
                    <Route path="/setting/lich-su-giao-dich" element={<SettingTransactionHistory />} />
                </Route>
                <Route path="/payments" element={<Payment/>} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}
export default UserRouter