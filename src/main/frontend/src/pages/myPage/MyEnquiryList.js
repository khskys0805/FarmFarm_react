import styles from "./MyEnquiryList.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import img from "../../images/icon.png";
import {FaRegStar, FaStar, FaTrashAlt} from "react-icons/fa";
import {FaPen} from "react-icons/fa6";
import Button from "../../component/Button";
import {MdOutlineSubdirectoryArrowRight} from "react-icons/md";

const MyEnquiryList = () => {
    const [enquiryList, setEnquiryList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEnquiry, setCurrentEnquiry] = useState({});

    useEffect(() => {
        fetchEnquiryList();
    }, []);

    const fetchEnquiryList = () => {
        axios.get(API.MYENQUIRY, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.result.enquiryList);

                setEnquiryList(res.data.result.enquiryList)
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }
    const handleEditEnquiry = (e, enquiry) => {
        e.preventDefault();
        setCurrentEnquiry(enquiry); // 현재 수정할 문의 내용을 저장
        setIsModalOpen(true); // 모달 열기
    }

    const handleRemoveEnquiry = (e, eid) => {
        e.preventDefault();
        if (window.confirm("문의를 삭제하시겠습니까?")){
            axios.delete(API.ENQUIRY(eid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data);
                    fetchEnquiryList();
                    console.log(enquiryList);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
        }
    }

    const handleUpdateEnquiry = () => {
        axios.patch(API.ENQUIRY(currentEnquiry.eid), { content: currentEnquiry.content }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("수정 성공");
                setIsModalOpen(false); // 모달 닫기
                fetchEnquiryList(); // 리스트 업데이트
            })
            .catch((error) => {
                console.error('수정 중 오류 발생: ', error);
            });
    }

    return (
        <div className={styles.box}>
            <Header title={"문의 내역"} go={`/myPage`}/>
            <ul>
                {enquiryList.length === 0 ? (
                    <div className={styles.no_list}>
                        <p>작성한 문의가 없습니다.</p>
                    </div>
                ) : (
                    enquiryList.map((enquiry, index) => (
                        <>
                            <li key={index} className={styles.enquiry_list}>
                                <div className={styles.left}>
                                    <div className={styles.img}>
                                        <img src={enquiry.images[0].fileUrl} alt="경매 이미지" />
                                    </div>
                                    <div>
                                        <h5 className={styles.product_name}>{enquiry.productName}</h5>
                                        <p className={styles.content}>{enquiry.content}</p>
                                        {enquiry.reply && (
                                            <p className={styles.reply}>
                                                <MdOutlineSubdirectoryArrowRight />Re: {enquiry.reply}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.button}>
                                        <div><FaPen onClick={(e) => handleEditEnquiry(e, enquiry)}/></div>
                                        <div><FaTrashAlt onClick={(e) => handleRemoveEnquiry(e, enquiry.eid)}/></div>
                                    </div>
                                </div>
                            </li>

                        </>
                    ))
                )}
            </ul>
            {/* 모달 */}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <h3>문의 수정</h3>
                        <h5>{currentEnquiry.productName}</h5>
                        <textarea
                            value={currentEnquiry.content}
                            onChange={(e) => setCurrentEnquiry({ ...currentEnquiry, content: e.target.value })}
                        />
                        <div className={styles.buttons}>
                            <Button content={"수정 완료"} onClick={handleUpdateEnquiry} padding={"10px 0"}/>
                            <Button content={"취소"} onClick={() => setIsModalOpen(false)} padding={"10px 0"}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MyEnquiryList;