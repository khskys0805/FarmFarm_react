import styles from "./MyReviewList.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import Review from "../../component/Review";

const MyReviewList = () => {
    const [reviewList, setReviewList] = useState([]);
    useEffect(() => {
        axios.get(API.MYREVIEW, {
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
                        <Review key={index} review={review} type={2} />
                    ))
                )}
            </ul>
        </div>
    )
}
export default MyReviewList;