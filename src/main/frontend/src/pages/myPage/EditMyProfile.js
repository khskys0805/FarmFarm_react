import styles from "./EditMyProfile.module.css";
import Header from "../../component/Header";
import icon from "../../images/icon.png";
import InputBox from "../../component/InputBox";
import {useState} from "react";
import Button from "../../component/Button";
const EditMyProfile = () => {
    const [nickName, setNickName] = useState("");
    const [profileImage, setProfileImage] = useState(icon); // 초기 아이콘 설정
    const inputChange = (e) => {
        setNickName(e.target.value)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // 선택한 파일을 가져옴
        if (file) {
            // 선택한 파일의 URL을 생성해서 이미지 미리보기
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };
    return (
        <div className={styles.box}>
            <Header title={"프로필 수정"} />
            <form className={styles.profile}>
                <div className={styles.img}>
                    <img src={profileImage} alt="프로필 이미지" /> {/* 이미지 미리보기 */}
                </div>
                <div className={styles.file_wrapper}>
                    <label className={styles.file_label} htmlFor="chooseFile">파일 선택</label>
                    <input className={styles.file} id="chooseFile" type="file" onChange={handleFileChange}/>
                </div>
                <h3 className={styles.name}>혀나 님</h3>
                <InputBox value={nickName} placeholder={"변경할 닉네임을 입력해주세요."} onChange={(e) => inputChange(e)}/>
                <Button content={"프로필 수정하기"} />
            </form>
        </div>
    )
}
export default EditMyProfile;