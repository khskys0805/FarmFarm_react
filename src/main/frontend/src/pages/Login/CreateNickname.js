import styles from "./CreateNickname.module.css";
import logo from "../../images/logo/farmfarm_logo.png"
import InputBox from "../../component/InputBox";
import {useState} from "react";
import Button from "../../component/Button";
import axios from "axios";
import API from "../../config";
import {useNavigate} from "react-router-dom";
const CreateNickname = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const inputChange = (e) => {
        setNickname(e.target.value);
    }
    const handleSubmitNickname = () => {
        axios.post(API.MYPAGE, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            nickname: nickname
        })
            .then((res) => {
                console.log(res);
                navigate(`/home`);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <div className={styles.box}>
            <img src={logo} className={styles.logo}/>
            <div className={styles.container}>
                <h2>닉네임을 입력해주세요</h2>
                <div className={styles.input_box}><InputBox name={"nickname"} value={nickname} placeholder={"닉네임을 설정해주세요."} onChange={(e) => inputChange(e)}/></div>
                <Button content={"등록하기"} onClick={handleSubmitNickname}/>
            </div>
        </div>
    )
}
export default CreateNickname;