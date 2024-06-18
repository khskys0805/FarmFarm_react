import DaumPostcode from "react-daum-postcode";
import styles from "./PopupPostCode.module.css";
const PopupPostCode = (props) => {
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

        props.setFarm({
            ...props.farm,
            locationCity:sido,
            locationGu:sigungu,
            locationFull:fullAddress,
        })
    }
    return (
        <div>
            <DaumPostcode
                className={styles.postmodal}
                autoClose
                onComplete={complete} />
        </div>
    )

}
export default PopupPostCode;