import styles from "./Review.module.css";
import React, {useState} from 'react';
import {FaRegStar, FaStar, FaTrashAlt} from "react-icons/fa";
import {FaPen} from "react-icons/fa6";
import API from "../config";
import Button from "./Button";
import api from "../api/api";

const Review = ({ review, type, fetchReviewList }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewData, setReviewData] = useState({
        comment: review.comment || '',
        productStar: review.productStar || 0,
        farmStar: review.farmStar || 0,
    });

    const renderStarRating = (productStar) => {
        const starCount = Math.floor(productStar || 0);
        const starArray = [];

        for (let i = 0; i < 5; i++) {
            if (i < starCount) {
                starArray.push(<FaStar size="18" color="#FFC42B" key={i} />);
            } else {
                starArray.push(<FaStar size="18" color="#B1B1B1" key={i} />);
            }
        }
        return starArray;
    }

    const handleEditReview = (e, review) => {
        e.preventDefault();
        setReviewData({
            comment: review.comment,
            productStar: review.productStar,
            farmStar: review.farmStar,
        });
        setIsModalOpen(true);
    }

    const handleUpdateReview = () => {
        const updatedReviewData = { ...reviewData, rId: review.rid }; // rId 추가
        console.log(updatedReviewData);
        api.patch(API.REVIEW(review.rid), updatedReviewData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            withCredentials: true
        })
            .then((res) => {
                console.log("수정 성공");
                setIsModalOpen(false);
                fetchReviewList();
            })
            .catch((error) => {
                console.error('수정 중 오류 발생: ', error.response?.data || error);
            });
    }

    const handleRemoveReview = (e, rid) => {
        e.preventDefault();
        if (window.confirm("리뷰를 삭제하시겠습니까?")){
            api.delete(API.REVIEW(rid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            })
                .then((res) => {
                    console.log("전송 성공");
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
                    <div className={styles.user_img}><img src={review.profileImage} alt="user_img"/></div>
                    <div className={styles.review_content}>
                        <h4>{review.nickname}</h4>
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
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <h3>리뷰 수정</h3>
                        <h5>{review.productName}</h5>
                        <h5 className={styles.title}>농장의 별점을 입력해주세요.</h5>
                        <div>
                            <ul className={styles.rating_list}>
                                {[...Array(reviewData.farmStar)].map((_, i) => (
                                    <li key={i}><FaStar onClick={() => setReviewData({ ...reviewData, farmStar: i + 1 })} /></li>
                                ))}
                                {[...Array(5 - reviewData.farmStar)].map((_, i) => (
                                    <li key={i}><FaRegStar onClick={() => setReviewData({ ...reviewData, farmStar: reviewData.farmStar + i + 1 })} /></li>
                                ))}
                            </ul>
                        </div>
                        <h5 className={styles.title}>상품의 별점을 입력해주세요.</h5>
                        <div>
                            <ul className={styles.rating_list}>
                                {[...Array(reviewData.productStar)].map((_, i) => (
                                    <li key={i}><FaStar onClick={() => setReviewData({ ...reviewData, productStar: i + 1 })} /></li>
                                ))}
                                {[...Array(5 - reviewData.productStar)].map((_, i) => (
                                    <li key={i}><FaRegStar onClick={() => setReviewData({ ...reviewData, productStar: reviewData.productStar + i + 1 })} /></li>
                                ))}
                            </ul>
                        </div>
                        <textarea
                            value={reviewData.comment}
                            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                        />
                        <div className={styles.buttons}>
                            <Button content={"취소"} onClick={() => setIsModalOpen(false)} padding={"10px 0"}/>
                            <Button content={"수정 완료"} onClick={handleUpdateReview} padding={"10px 0"}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Review;
