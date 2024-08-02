import styles from "./ProductShippingAddress.module.css";
import Header from "../../component/Header";
import InputBox from "../../component/InputBox";
import {useCallback, useEffect, useState} from "react";
import PopupPostCode from "../../component/PopupPostCode";
import Button from "../../component/Button";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import API from "../../config";

const ProductShippingAddress = () => {
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState({
        delivery_name: "",
        delivery_phone: "",
        isDelivery: true, // 기본으로 '배송'
        delivery_memo: "",
        deliveryAddress:"",
        delieveryAddressDetail:"",
        quantity:""
    });
    const [showDeliveryFields, setShowDeliveryFields] = useState(true);
    const location = useLocation();
    // const isDirect = location.state?.isDirect; // isDirect 값을 가져옴
    const { isDirect, isGroup } = location.state || {}; // state가 undefined인 경우를 처리

    useEffect(() => {
        console.log("isGroup:", isGroup);
        console.log("isDirect:", isDirect);
    }, [])

    useEffect(() => {
        if (isDirect === 1) {
            setShippingAddress((prevAddress) => ({
                ...prevAddress,
                isDelivery: false,
            }));
            setShowDeliveryFields(false);
        }
    }, [isDirect]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setShippingAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    }, []);

    const handleRadioChange = (e) => {
        const value = e.target.value === "true"; // 문자열을 불리언 값으로 변환
        setShippingAddress((prevAddressData) => ({
            ...prevAddressData,
            isDelivery: value,
        }));
        setShowDeliveryFields(value); // 불리언 값 그대로 사용하여 배송 요청사항 필드를 표시 또는 숨김
    };

    const handleComplete = (data) => {
        setShippingAddress({
            ...shippingAddress,
            deliveryAddress: data.locationFull,
            delieveryAddressDetail: data.locationDetail,
        });
    }

    const handleOrderAndPayment = (e) => {
        e.preventDefault();
        axios.post(API.ORDER, shippingAddress, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}`}
        })
            .then((res) => {
                console.log("Order 전송 성공");
                console.log(res.data.result);

                // Order가 성공적으로 완료된 후 Payment 호출
                return axios.get(API.PAYMENT(res.data.result.oid), {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                });
            })
            .then((paymentRes) => {
                console.log("Payment 전송 성공");
                console.log(paymentRes.data.result);

                const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/.test(navigator.userAgent.toLowerCase());
                const redirectUrl = isMobile ? paymentRes.data.result.next_redirect_mobile_url : paymentRes.data.result.next_redirect_pc_url;

                // URL로 리디렉션
                window.location.href = redirectUrl;
            })
            .catch((error) => {
                console.error('Order 또는 Payment 처리 중 오류 발생: ', error);
            });
    };

    return (
        <div className={styles.box}>
            <Header title={"배송 정보 입력"} go={-1} />
            <form className={styles.form}>
                <div className={styles.content_wrapper}>
                    <h3>이름</h3>
                    <InputBox
                        type={"text"}
                        name={"delivery_name"}
                        value={shippingAddress.delivery_name}
                        placeholder={"이름을 입력해주세요."}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.content_wrapper}>
                    <h3>전화번호</h3>
                    <InputBox
                        type={"text"}
                        name={"delivery_phone"}
                        value={shippingAddress.delivery_phone}
                        placeholder={"전화번호를 입력해주세요."}
                        onChange={handleInputChange}
                    />
                </div>
                {isGroup && (
                    <div className={styles.content_wrapper}>
                        <h3>구매 수량</h3>
                        <InputBox
                            type={"text"}
                            name={"delivery_phone"}
                            value={shippingAddress.quantity}
                            placeholder={"구매하실 수량을 입력해주세요."}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <div className={styles.content_wrapper}>
                    <h3>거래 방식</h3>
                    <div>
                        <InputBox
                            type={"radio"}
                            name={"isDelivery"}
                            value={"true"}
                            onChange={handleRadioChange}
                            checked={shippingAddress.isDelivery}
                            disabled={isDirect === 1} // isDirect가 0이면 비활성화
                        /><span>배송</span>
                        <InputBox
                            type={"radio"}
                            name={"isDelivery"}
                            value={"false"}
                            onChange={handleRadioChange}
                            checked={!shippingAddress.isDelivery}
                        /><span>직거래</span>
                    </div>
                </div>
                {showDeliveryFields && (
                    <>
                        <div className={styles.content_wrapper}>
                            <h3>배송 요청사항</h3>
                            <InputBox
                                type={"text"}
                                name={"delivery_memo"}
                                value={shippingAddress.delivery_memo}
                                placeholder={"배송 요청사항을 입력해주세요."}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.content_wrapper}>
                            <div className={styles.location_title}>
                                <h3>주소</h3>
                                <PopupPostCode onComplete={handleComplete} />
                            </div>
                            <InputBox type={"text"} name={"deliveryAddress"} value={shippingAddress.deliveryAddress} placeholder={"전체 주소"} readOnly={true} />
                            <InputBox type={"text"} name={"deliveryAddressDetail"} value={shippingAddress.delieveryAddressDetail} placeholder={"상세 주소"} onChange={handleInputChange} />
                        </div>
                    </>
                )}
                <Button content={"결제하기"} onClick={(e) => handleOrderAndPayment(e)}/>
            </form>
        </div>
    );
};

export default ProductShippingAddress;
