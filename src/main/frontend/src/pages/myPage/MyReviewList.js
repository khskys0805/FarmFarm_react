import styles from "./MyReviewList.module.css";
import Header from "../../component/Header";
import {useCallback, useEffect, useState} from "react";
import API from "../../config";
import Review from "../../component/Review";
import api from "../../api/api";

const MyReviewList = () => {
    const [reviewList, setReviewList] = useState([]);

    const fetchReviewList = useCallback(() => {
        api.get(API.MYREVIEW, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.result.reviewList);
                setReviewList(res.data.result.reviewList);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []); // 빈 의존성 배열로 인해 한 번만 생성

    useEffect(() => {
        fetchReviewList();
    }, [fetchReviewList]);

    return (
        <div className={styles.box}>
            <Header title={"상품 후기 내역"} go={`/myPage`}/>
            <ul className={styles.review_list}>
                {reviewList.length === 0 ? (
                    <div className={styles.no_list}>
                        <p>작성한 리뷰가 없습니다.</p>
                    </div>
                ) : (
                    reviewList.map((review, index) => (
                        <Review key={index} review={review} type={2} fetchReviewList={fetchReviewList}/>
                    ))
                )}
            </ul>
        </div>
    )
}
export default MyReviewList;