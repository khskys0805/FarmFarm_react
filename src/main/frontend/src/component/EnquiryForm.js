import styles from "./EnquiryForm.module.css";
import Button from "./Button";
import API from "../config";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/api";
import {toast} from "react-hot-toast";
const EnquiryForm = ({pid, closeForm, fetchEnquiry}) => {
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const inputChange = (e) => {
        setContent(e.target.value);
    }
    const handleRegisterEnquiry = (e) => {
        e.preventDefault();
        api.post(API.REGISTERENQUIRY(pid), {content}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);
                toast.success("문의 작성이 완료되었습니다.");
                closeForm();
                fetchEnquiry();
                navigate(`/productDetail/${pid}`);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }
    return (
        <div className={styles.form_container}>
            <h5>1:1 문의 작성</h5>
            <textarea className={styles.form} value={content} onChange={(e) => inputChange(e)} placeholder={"1:1 문의 내용을 작성해주세요"}/>
            <Button content={"문의 작성"} onClick={(e) => handleRegisterEnquiry(e)}/>
        </div>
    )
}
export default EnquiryForm;