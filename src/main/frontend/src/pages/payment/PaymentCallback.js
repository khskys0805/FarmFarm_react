import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import API from "../../config";

const PaymentCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { oId } = useParams();
    const queryParams = new URLSearchParams(location.search);
    const pgToken = queryParams.get("pg_token");

    useEffect(() => {
        if (pgToken && oId) {
            axios.get(API.PAYMENTSUCCESS(oId), {
                params: { pg_token: pgToken },
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then(response => {
                    console.log("Payment 성공:", response.data);
                    navigate("/paymentSuccess");
                })
                .catch(error => {
                    console.error("Payment 실패:", error);
                    navigate("/paymentFail");
                });
        }
    }, [pgToken, oId, navigate]);

    return <div>결제 처리 중...</div>;
};

export default PaymentCallback;
