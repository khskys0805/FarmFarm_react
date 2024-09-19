import styles from "./ProductShippingAddress.module.css";
import Header from "../../component/Header";
import InputBox from "../../component/InputBox";
import { useCallback, useEffect, useState } from "react";
import PopupPostCode from "../../component/PopupPostCode";
import Button from "../../component/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../config";

const ProductShippingAddress = () => {
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState({
        deliveryName: "",
        deliveryPhone: "",
        isDelivery: true, // 기본으로 '배송'
        deliveryMemo: "",
        deliveryAddress:"",
        delieveryAddressDetail:"",
        quantity:"",
        price:""
    });
    const [showDeliveryFields, setShowDeliveryFields] = useState(true);
    const location = useLocation();
    const { isDirect, isGroup, isAuction, pid } = location.state || {};

    useEffect(() => {
        console.log("isGroup:", isGroup);
        console.log("isDirect:", isDirect);
        console.log("isAuction:", isAuction); // 추가
    }, []);

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

        // quantity와 price는 숫자로 변환
        if (name === 'quantity' || name === 'price') {
            setShippingAddress((prevAddress) => ({
                ...prevAddress,
                [name]: value === '' ? '' : Number(value), // 공백이면 빈 문자열, 그렇지 않으면 숫자로 변환
            }));
        } else {
            setShippingAddress((prevAddress) => ({
                ...prevAddress,
                [name]: value, // 숫자가 아닌 경우에는 그대로 사용
            }));
        }
    }, []);


    const handleRadioChange = (e) => {
        const value = e.target.value === "true";
        setShippingAddress((prevAddressData) => ({
            ...prevAddressData,
            isDelivery: value,
        }));
        setShowDeliveryFields(value);
    };

    const handleComplete = (data) => {
        setShippingAddress({
            ...shippingAddress,
            deliveryAddress: data.locationFull,
            delieveryAddressDetail: data.locationDetail,
        });
    };

    const handleOrderAndPayment = (e) => {
        e.preventDefault();
        console.log(window.location.origin + '/payment-callback');
        axios.post(API.ORDER, shippingAddress, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}`}
        })
            .then((res) => {
                console.log("Order 전송 성공");
                console.log(res.data.result);

                return axios.get(API.PAYMENT(res.data.result.oid), {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                    params: {
                        callback_url: window.location.origin + '/payment-callback' // 콜백 URL 수정
                    }
                });
            })
            .then((paymentRes) => {
                console.log("Payment 전송 성공");
                console.log(paymentRes.data.result);

                const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/.test(navigator.userAgent.toLowerCase());
                const redirectUrl = isMobile ? paymentRes.data.result.next_redirect_mobile_url : paymentRes.data.result.next_redirect_pc_url;

                window.location.href = redirectUrl;
            })
            .catch((error) => {
                console.error('Order 또는 Payment 처리 중 오류 발생: ', error);
            });
    };

    const handleParticipateAuction = (e) => {
        e.preventDefault();
        console.log(shippingAddress);
        // 1. order/product/pid API 요청
        axios.post(API.ATTENDAUCTION(pid), shippingAddress, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("경매 참여 성공");
                console.log(res.data.result);

                // 2. order API 호출 (위 주문의 oid 사용)
                return axios.post(API.ORDER, shippingAddress, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
                });
            })
            .then((orderRes) => {
                console.log("Order 전송 성공");
                console.log(orderRes.data.result);
                const oid = orderRes.data.result.oid; // 주문 성공 후 oid 받아옴

                // 3. 결제 요청 (oid로 결제 API 호출)
                return axios.get(API.PAYMENT(oid), {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                    params: {
                        callback_url: window.location.origin + '/payment-callback'
                    }
                });
            })
            .then((paymentRes) => {
                console.log("Payment 전송 성공");
                console.log(paymentRes.data.result);

                const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/.test(navigator.userAgent.toLowerCase());
                const redirectUrl = isMobile ? paymentRes.data.result.next_redirect_mobile_url : paymentRes.data.result.next_redirect_pc_url;

                // 결제 페이지로 이동
                window.location.href = redirectUrl;
            })
            .catch((error) => {
                console.error('경매 또는 결제 처리 중 오류 발생: ', error.response ? error.response.data : error.message);
            });
    };



    return (
        <div className={styles.box}>
            <Header title={"배송 정보 입력"} go={-1} />
            <form className={styles.form}>
                {isAuction && (
                    <>
                        <div className={styles.content_wrapper}>
                            <h3>상품 수량</h3>
                            <InputBox
                                type={"text"}
                                name={"quantity"}
                                value={shippingAddress.quantity}
                                placeholder={"구매하실 수량을 입력해주세요."}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.content_wrapper}>
                            <h3>경매 금액</h3>
                            <InputBox
                                type={"text"}
                                name={"price"}
                                value={shippingAddress.price}
                                placeholder={"경매 금액을 입력해주세요."}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}
                <div className={styles.content_wrapper}>
                    <h3>이름</h3>
                    <InputBox
                        type={"text"}
                        name={"deliveryName"}
                        value={shippingAddress.deliveryName}
                        placeholder={"이름을 입력해주세요."}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.content_wrapper}>
                    <h3>전화번호</h3>
                    <InputBox
                        type={"text"}
                        name={"deliveryPhone"}
                        value={shippingAddress.deliveryPhone}
                        placeholder={"전화번호를 입력해주세요."}
                        onChange={handleInputChange}
                    />
                </div>
                {isGroup && (
                    <div className={styles.content_wrapper}>
                        <h3>구매 수량</h3>
                        <InputBox
                            type={"text"}
                            name={"quantity"}
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
                            disabled={isDirect === 1}
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
                                name={"deliveryMemo"}
                                value={shippingAddress.deliveryMemo}
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
                {isAuction ? (
                    <Button content={"결제하기"} onClick={(e) => handleParticipateAuction(e)} />
                ) : (
                    <Button content={"결제하기"} onClick={(e) => handleOrderAndPayment(e)} />
                )}

            </form>
        </div>
    );
};

export default ProductShippingAddress;
