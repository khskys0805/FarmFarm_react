import styles from "./EnquiryAdminPage.module.css";
import {useEffect, useState} from "react";
import {IoIosClose} from "react-icons/io";
import Button from "../../component/Button";
import axios from "axios";
import API from "../../config";

const EnquiryAdminPage = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedContent, setSelectedContent] = useState("");
    const [selectedEid, setSelectedEid] = useState(null); // 선택한 문의의 eid 상태 추가
    const [enquiryList, setEnquiryList] = useState([]);
    const [enquiryAnswer, setEnquiryAnswer] = useState("");

    useEffect(() => {
        axios.get(API.ENQUIRYADMIN, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then((res) => {
                console.log(res.data.result);
                setEnquiryList(res.data.result.enquiryList);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, [])

    const handleInput = (e) => {
        const answer = e.target.value;
        setEnquiryAnswer(answer);
    }
    const showPopup = (content, eid) => {
        setSelectedContent(content);
        setSelectedEid(eid); // 선택한 문의의 eid 설정
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    const handleReplyEnquiry = (e, inquiryNumber) => {
        e.preventDefault();
        if (selectedEid === null) return;

        axios.post(API.REPLYENQUIRY(selectedEid), { reply:enquiryAnswer }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then((res) => {
                console.log(res.data.result);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
        console.log(`문의 ${inquiryNumber}에 대한 답변하기 버튼 클릭됨`);
    };

    return (
        <div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>문의번호</th>
                    <th>상품명</th>
                    <th>문의자 이름</th>
                    <th>문의 내용</th>
                    <th>답변 상태</th>
                    <th>문의 날짜</th>
                </tr>
                </thead>
                <tbody>
                {enquiryList.map((item, index) => (
                    <tr key={index}>
                        <td>{item.eid}</td>
                        <td>{item.productName}</td>
                        <td>{item.username}</td>
                        <td>{item.content}</td>
                        <td>
                            {item.status === "답변전" ? (
                                <button className={styles.answerBtn} onClick={() => showPopup(item.content, item.eid)}>답변하기</button>
                            ) : (
                                item.answerStatus
                            )}
                        </td>
                        <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* 팝업 */}
            {popupVisible && (
                <div className={styles.popup}>
                    <h4>문의내용: <span>{selectedContent}</span></h4>
                    <textarea value={enquiryAnswer} onChange={(e) => handleInput(e)} />
                    <div className={styles.close_popup}><IoIosClose onClick={closePopup} size="25"/></div>
                    <Button content={"답변하기"} padding={"10px 0"} onClick={handleReplyEnquiry}/>
                </div>
            )}
            {/* 팝업 배경 (클릭 시 팝업 닫기) */}
            {popupVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 999
                    }}
                    onClick={closePopup}
                >
                </div>
            )}
        </div>
    )
}
export default EnquiryAdminPage;