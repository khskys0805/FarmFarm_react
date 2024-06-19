import DaumPostcode from "react-daum-postcode";
import styles from "./PopupPostCode.module.css";
import { Modal } from "antd";
import {useState} from "react";
const PopupPostCode = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggleModal = () => {
        setIsOpen((prev) => !prev);
    };
    const complete = (data) => {
        const sido = data.sido;
        const sigungu = data.sigungu;
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R"){
            if (data.bname !== ""){
                extraAddress += data.bname;
            }
            if (data.buildingName !== ""){
                extraAddress += (extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== "" ?` (${extraAddress})` : "");
        }
        console.log(data);
        console.log(fullAddress);
        console.log(sido);
        console.log(sigungu);
        console.log(data.zonecode);

        props.onComplete({
            locationCity: sido,
            locationGu: sigungu,
            locationFull: fullAddress,
            locationDetail: "",
        });

        onToggleModal();
    }
    return (
        <div>
            <button type="button" className={styles.open_modal} onClick={onToggleModal}>주소 찾기</button>
            {isOpen && (
                <Modal
                    visible={true}
                    onOk={onToggleModal}
                    onCancel={onToggleModal} // isOpen이 false가 되고 화면이 리렌더되면서 모달이 뜨지 않는다.
                >
                    <DaumPostcode
                        className={styles.postmodal}
                        autoClose
                        onComplete={complete} />
                </Modal>
            )}
        </div>
    )

}
export default PopupPostCode;