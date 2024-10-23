import styles from "./Review.module.css";
import React, {useState} from 'react';
import {FaStar, FaTrashAlt} from "react-icons/fa";
import {FaPen} from "react-icons/fa6";
import axios from "axios";
import API from "../config";
import Button from "./Button";

const Review = ({ review, type, fetchReviewList }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState({});
    const renderStarRating = (productStar) => {
        const starCount = Math.floor(productStar);
        const starArray = [];

        for (let i = 0; i < 5; i++) {
            if (i < starCount) {
                starArray.push(<FaStar size="18" color="#FFC42B"/>);
            } else {
                starArray.push(<FaStar size="18" color="#B1B1B1"/>);
            }
        }
        return starArray;
    }

    const handleEditReview = (e, review) => {
        e.preventDefault();
        setCurrentReview(review);
        setIsModalOpen(true);

    }
    const handleUpdateReview = () => {
        axios.patch(API.ENQUIRY(currentReview.rid), { comment: currentReview.comment }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("수정 성공");
                setIsModalOpen(false); // 모달 닫기
                fetchReviewList(); // 리스트 업데이트
            })
            .catch((error) => {
                console.error('수정 중 오류 발생: ', error);
            });
    }
    const handleRemoveReview = (e, rid) => {
        e.preventDefault();
        if (window.confirm("리뷰를 삭제하시겠습니까?")){
            axios.delete(API.REVIEW(rid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data);
                    fetchReviewList();
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
        }
    }
    return (
        <>
            {type === 1 && (
                <div className={`${styles.review_box} ${styles.type1}`}>
                    <div className={styles.user_img}><img src={review.images[0].fileUrl} alt="user_img"/></div>
                    <div className={styles.review_content}>
                        <h4>{review.user.nickname}</h4>
                        <p>{review.comment}</p>
                    </div>
                    <div className={styles.star}>{renderStarRating(review.productStar)}</div>
                </div>
            )}
            {type === 2 && (
                <div className={`${styles.review_box} ${styles.type2}`}>
                    <div className={styles.user_img}><img src={review.images[0].fileUrl} alt="user_img"/></div>
                    <div className={styles.review_content}>
                        <h4>{review.productName}</h4>
                        <p>{review.comment}</p>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.star}>{renderStarRating(review.productStar)}</div>
                        <div className={styles.button}>
                            <div><FaPen onClick={(e) => handleEditReview(e, review)}/></div>
                            <div><FaTrashAlt onClick={(e) => handleRemoveReview(e, review.rid)}/></div>
                        </div>
                    </div>
                </div>

            )}
            {/* 모달 */}
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <h3>리뷰 수정</h3>
                        <h5>{currentReview.productName}</h5>
                        <textarea
                            value={currentReview.comment}
                            onChange={(e) => setCurrentReview({...currentReview, comment: e.target.value })}
                        />
                        <div className={styles.buttons}>
                            <Button content={"수정 완료"} onClick={handleUpdateReview} padding={"10px 0"}/>
                            <Button content={"취소"} onClick={() => setIsModalOpen(false)} padding={"10px 0"}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Review;
