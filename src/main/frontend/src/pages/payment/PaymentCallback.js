import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    console.log(status);

    useEffect(() => {
        if (status === "success") {
            navigate("/paymentSuccess");
        } else {
            navigate("/paymentFail");
        }
    }, [status, navigate]);

    return (
        <div>결제 처리 중...</div>
    );
};

export default PaymentCallback;
