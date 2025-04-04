import styles from "./Enquiry.module.css";
import {FaPen, FaTrashAlt} from "react-icons/fa";
import API from "../config";
import {useState} from "react";
import Button from "./Button";
import {MdOutlineSubdirectoryArrowRight} from "react-icons/md";
import api from "../api/api";
import {toast} from "react-hot-toast";
const Enquiry = ({enquiries, fetchEnquiry}) => {
    const [editIndex, setEditIndex] = useState(null);
    const [content, setContent] = useState("");
    const handleEditClick = (index, content) => {
        setEditIndex(index); // 수정할 항목의 인덱스를 설정
        setContent(content); // 기존 content를 수정할 값으로 설정
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }
    const handleUpdateEnquiry = (e, eid) => {
        e.preventDefault();
        api.patch(API.ENQUIRY(eid), {content}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            withCredentials: true
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);
                toast.success("문의 수정이 완료되었습니다.");
                setEditIndex(null); // 수정 모드 해제
                fetchEnquiry();
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }

    const handleRemoveEnquiry = (e, eid) => {
        e.preventDefault();
        if (window.confirm("문의를 삭제하시겠습니까?")) {
            api.delete(API.ENQUIRY(eid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data);
                    toast.success("문의가 삭제되었습니다.");
                    // window.location.reload();
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
        }
    }
    return (
        <div className={styles.enquiry_list}>
            {enquiries.map((enquiry, index) => (
                <div key={index} className={styles.enquiry_item}>
                    <h4 className={styles.enquiry_nickname}>현수님</h4>
                    <div className={styles.content}>
                        {editIndex === index ? (
                            <div style={{ width: "100%" }}>
                                <textarea
                                    value={content}
                                    onChange={handleContentChange}
                                    className={styles.edit_input}
                                />
                                <Button
                                    content={"저장"}
                                    onClick={(e) => handleUpdateEnquiry(e, enquiry.eid)}
                                >
                                    저장
                                </Button>
                            </div>
                        ) : (
                            <p className="li_en">{enquiry.content}</p>
                        )}
                        {editIndex !== index && (
                            <span>
                                <span className={styles.pen}>
                                    <FaPen onClick={() => handleEditClick(index, enquiry.content)} />
                                </span>
                                <span className={styles.trash}>
                                    <FaTrashAlt onClick={(e) => handleRemoveEnquiry(e, enquiry.eid)}/>
                                </span>
                            </span>
                        )}
                    </div>
                    {enquiry.reply && (
                        <div className={styles.reply}>
                            <MdOutlineSubdirectoryArrowRight />Re: {enquiry.reply}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
export default Enquiry;