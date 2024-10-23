import styles from "./MyEnquiryList.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import img from "../../images/icon.png";
import {FaRegStar, FaStar, FaTrashAlt} from "react-icons/fa";
import {FaPen} from "react-icons/fa6";

const MyEnquiryList = () => {
    const [enquiryList, setEnquiryList] = useState([]);
    useEffect(() => {
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
    }, []);
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
                        <li key={index} className={styles.enquiry_list}>
                            <div className={styles.left}>
                                <div className={styles.img}>
                                    <img src={enquiry.images[0].fileUrl} alt="경매 이미지" />
                                </div>
                                <div>
                                    <h5 className={styles.product_name}>{enquiry.productName}</h5>
                                    <p className={styles.content}>{enquiry.content}</p>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.button}>
                                    <div><FaPen /></div>
                                    <div><FaTrashAlt /></div>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}
export default MyEnquiryList;