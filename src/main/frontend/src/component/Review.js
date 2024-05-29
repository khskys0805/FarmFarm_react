import styles from "./Review.module.css";
import React from 'react';
import {FaStar, FaTrashAlt} from "react-icons/fa";
import {FaPen} from "react-icons/fa6";

const Review = ({ review, type }) => {
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
    return (
        <>
            {type === 1 && (
                <div className={`${styles.review_box} ${styles.type1}`}>
                    <div className={styles.user_img}><img src={review.user.image} alt="user_img"/></div>
                    <div className={styles.review_content}>
                        <h4>{review.user.nickname}</h4>
                        <p>{review.comment}</p>
                    </div>
                    <div className={styles.star}>{renderStarRating(review.productStar)}</div>
                </div>
            )}
            {type === 2 && (
                <div className={`${styles.review_box} ${styles.type2}`}>
                    <div className={styles.user_img}><img src={review.user.image} alt="user_img"/></div>
                    <div className={styles.review_content}>
                        <h4>{review.orderDetail.product.name}</h4>
                        <p>{review.comment}</p>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.star}>{renderStarRating(review.productStar)}</div>
                        <div className={styles.button}>
                            <div><FaPen /></div>
                            <div><FaTrashAlt /></div>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}

export default Review;
