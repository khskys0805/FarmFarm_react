import styles from "./ProductShippingAddress.module.css";
import Header from "../../component/Header";
import InputBox from "../../component/InputBox";
import { useCallback, useState } from "react";

const ProductShippingAddress = () => {
    const [shippingAddress, setShippingAddress] = useState({
        delivery_name: "",
        delivery_phone: "",
        delivery: true, // 기본으로 '배송'
        delivery_memo: "",
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
                )}
            </form>
        </div>
    );
};

export default ProductShippingAddress;
