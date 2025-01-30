import styles from "./EditMyProfile.module.css";
import Header from "../../component/Header";
import icon from "../../images/icon.png";
import InputBox from "../../component/InputBox";
import {useEffect, useState} from "react";
import Button from "../../component/Button";
import {useLocation, useNavigate} from "react-router-dom";
import API from "../../config";
import api from "../../api/api";
const EditMyProfile = () => {
    const [nickName, setNickName] = useState("");
    const [profileImage, setProfileImage] = useState(null); // 초기 아이콘 설정
    const location = useLocation();
    const user = location.state?.user; // 넘겨받은 user 데이터
    const navigate = useNavigate();

    useEffect(() => {
        setProfileImage(user.profileImage ? user.profileImage : icon);
    }, [])

    const inputChange = (e) => {
        setNickName(e.target.value)
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]; // 선택한 파일을 가져옴
        if (file) {
            // 선택한 파일의 URL을 생성해서 이미지 미리보기
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl); // 미리보기 이미지 URL 설정

            // 파일 업로드 후 서버에서 받은 URL로 업데이트
            const uploadedUrl = await uploadFile(file);
            if (uploadedUrl) {
                setProfileImage(uploadedUrl); // 업로드된 URL로 업데이트
            }
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("multipartFiles", file);

        try {
            const response = await api.post("/s3/file", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            console.log("File upload response:", response.data.result[0].fileUrl);
            return response.data.result[0].fileUrl;
        } catch (error) {
            console.error("File upload error: ", error);
            return null;
        }
    };

    const handleProfileChange = (e) => {
        e.preventDefault();
        console.log(profileImage);
        console.log(nickName);
        api.post(API.EDITPROFILE, {nickname:nickName, image:profileImage}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log(res.data.result);
                alert("프로필이 변경되었습니다");
                navigate(`/myPage`);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }
    return (
        <div className={styles.box}>
            <Header title={"프로필 수정"} go={-1} />
            <form className={styles.profile}>
                <div className={styles.img}>
                    <img src={profileImage} alt="프로필 이미지" /> {/* 미리보기 이미지 */}
                </div>
                <div className={styles.file_wrapper}>
                    <label className={styles.file_label} htmlFor="chooseFile">파일 선택</label>
                    <input className={styles.file} id="chooseFile" type="file" onChange={handleFileChange}/>
                </div>
                <h3 className={styles.name}>{user.userName} 님</h3>
                <InputBox value={nickName} placeholder={"변경할 닉네임을 입력해주세요."} onChange={(e) => inputChange(e)}/>
                <Button content={"프로필 수정하기"} onClick={(e) => handleProfileChange(e)}/>
            </form>
        </div>
    )
}
export default EditMyProfile;