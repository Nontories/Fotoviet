import { ReactComponent as ZaloPayLogo } from "../assets/picture/payments/logo-zalopay.svg";
import { ReactComponent as ViettinBank } from "../assets/picture/payments/bank-vtb.svg";
import { ReactComponent as Agribank } from "../assets/picture/payments/bank-varb.svg";
import { ReactComponent as VietcomBank } from "../assets/picture/payments/bank-vcb.svg";
import { ReactComponent as BIDV } from "../assets/picture/payments/bank-bidv.svg";
import { ReactComponent as MBBank } from "../assets/picture/payments/bank-mb.svg";
import { ReactComponent as TPBank } from "../assets/picture/payments/bank-tpb.svg";
import { ReactComponent as TechcomBank } from "../assets/picture/payments/bank-tcb.svg";
import { ReactComponent as CheckMark } from "../assets/picture/payments/check-mark.svg";
import qrCode from "../assets/picture/payments/qr.png";
import "../styles/payment.css"
import { Button } from "react-bootstrap";

export const Payment = () => {
    return (
        <>
            <p>Vui lòng quet ma be duoi de hoan thanh dang ky:</p>
            <img src={qrCode} alt="" />
        </>
    );
}