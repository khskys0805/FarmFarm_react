import styles from "./EditMyProfile.module.css";
import Header from "../../component/Header";
import icon from "../../images/icon.png";
import InputBox from "../../component/InputBox";
import {useState} from "react";
import Button from "../../component/Button";
const EditMyProfile = () => {
    const [nickName, setNickName] = useState("");
    const inputChange = (e) => {
        setNickName(e.target.value)
    }
    return (
        <div className={styles.box}>
            <Header title={"프로필 수정"} />
            <form className={styles.profile}>
                <div className={styles.img}>
                    <img src={icon}/>
                </div>
                <h3 className={styles.name}>혀나 님</h3>
                <InputBox value={nickName} placeholder={"변경할 닉네임을 입력해주세요."} onChange={(e) => inputChange(e)}/>
                <Button content={"프로필 수정하기"} />
            </form>
        </div>
    )
}
export default EditMyProfile;