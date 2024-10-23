import styles from "./Review.module.css";
import React from 'react';
import {FaStar, FaTrashAlt} from "react-icons/fa";
import {FaPen} from "react-icons/fa6";
import axios from "axios";
import API from "../config";

const Review = ({ review, type, fetchReviewList }) => {
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
                    // console.log(enquiryList);
                    // window.location.reload();
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
                            <div><FaPen /></div>
                            <div><FaTrashAlt onClick={(e) => handleRemoveReview(e, review.rid)}/></div>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}

export default Review;
