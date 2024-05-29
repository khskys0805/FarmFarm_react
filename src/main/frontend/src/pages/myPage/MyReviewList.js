import styles from "./MyReviewList.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import img from "../../images/logo/farmfarm_logo.png";
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { FaRegStar, FaStar } from "react-icons/fa";

const MyReviewList = () => {
    const [reviewList, setReviewList] = useState([]);
    useEffect(() => {
        axios.get(API.MYREVIEW, {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setReviewList(res.data);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);
    return (
        <div className={styles.box}>
            <Header title={"상품 후기 내역"} go={`/myPage`}/>
            <ul>
                {reviewList.length === 0 ? (
                    <div className={styles.no_list}>
                        <p>작성한 리뷰가 없습니다.</p>
                    </div>
                ) : (
                    reviewList.map((review, index) => (
                        <li key={index} className={styles.review_list}>
                            <div className={styles.left}>
                                <div className={styles.img}>
                                    <img src={img} alt="경매 이미지" />
                                </div>
                                <div>
                                    <h4 className={styles.product_name}>{review.orderDetail.product.name}</h4>
                                    <p className={styles.comment}>{review.comment}</p>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.stars}>
                                    {[...Array(review.farmStar)].map((a, i) => (
                                        <FaStar key={i} />
                                    ))}
                                    {[...Array(5 - review.farmStar)].map((a, i) => (
                                        <FaRegStar key={i} />
                                    ))}
                                </div>
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
export default MyReviewList;