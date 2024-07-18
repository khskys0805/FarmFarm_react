import styles from "./ProductShippingAddress.module.css";
import Header from "../../component/Header";
import InputBox from "../../component/InputBox";
import { useCallback, useState } from "react";
import PopupPostCode from "../../component/PopupPostCode";
import Button from "../../component/Button";

const ProductShippingAddress = () => {
    const [shippingAddress, setShippingAddress] = useState({
        delivery_name: "",
        delivery_phone: "",
        delivery: true, // 기본으로 '배송'
        delivery_memo: "",
        deliveryAddress:"",
        delieveryAddressDetail:""
    });
    const [showDeliveryFields, setShowDeliveryFields] = useState(true);

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
            delivery: value,
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
                <div className={styles.content_wrapper}>
                    <h3>거래 방식</h3>
                    <div>
                        <InputBox
                            type={"radio"}
                            name={"delivery"}
                            value={"true"}
                            onChange={handleRadioChange}
                            checked={shippingAddress.delivery}
                        /><span>배송</span>
                        <InputBox
                            type={"radio"}
                            name={"delivery"}
                            value={"false"}
                            onChange={handleRadioChange}
                            checked={!shippingAddress.delivery}
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
                                <h3>농장 위치</h3>
                                <PopupPostCode onComplete={handleComplete} />
                            </div>
                            <InputBox type={"text"} name={"deliveryAddress"} value={shippingAddress.deliveryAddress} placeholder={"전체 주소"} readOnly={true} />
                            <InputBox type={"text"} name={"deliveryAddressDetail"} value={shippingAddress.delieveryAddressDetail} placeholder={"상세 주소"} onChange={handleInputChange} />
                        </div>
                        <Button content={"결제하기"} />
                    </>
                )}
            </form>
        </div>
    );
};

export default ProductShippingAddress;
