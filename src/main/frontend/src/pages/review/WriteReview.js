import styles from "./WriteReview.module.css";
import Header from "../../component/Header";
import { FaRegStar, FaStar } from "react-icons/fa";
import Button from "../../component/Button";
import {useState} from "react";
import API from "../../config";
import {useLocation, useNavigate} from "react-router-dom";
import api from "../../api/api";
const WriteReview = () => {
    const [reviewData, setReviewData] = useState({
        farmStar:3,
        productStar:3,
        comment:""
    })
    const navigate = useNavigate();
    const location = useLocation();
    const { odId } = location.state;
    console.log(odId);

    const handleSetValue = (e) => {
        setReviewData({
            ...reviewData,
            comment: e.target.value
        });
    };

    const setFarmScore = (score) => {
        setReviewData({
            ...reviewData,
            farmStar: score
        });
    }

    const setProductScore = (score) => {
        setReviewData({
            ...reviewData,
            productStar: score
        })
    }

    const handleWriteReview = () => {
        api.post(API.WRITEREVIEW(odId), reviewData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);
                navigate(`/myReview`);
            })
            .catch((error) => {
                console.error('상품 등록 중 오류 발생: ', error);
                console.error('상품 등록 중 오류 발생: ', error.response?.data);
            });
    }

    return (
        <div className={styles.box}>
            <Header title={"리뷰 작성"} go={-1}/>
            <form className={styles.review}>
                <h3 className={styles.title}>농장의 별점을 입력해주세요.</h3>
                <div>
                    <ul className={styles.rating_list}>
                        {[...Array(reviewData.farmStar)].map((a, i) => (
                            <li><FaStar key={i} onClick={() => setFarmScore(i + 1)} /></li>
                        ))}
                        {[...Array(5 - reviewData.farmStar)].map((a, i) => (
                            <li><FaRegStar key={i} onClick={() => setFarmScore(reviewData.farmStar + i + 1)} /></li>
                        ))}
                    </ul>
                </div>
                <h3 className={styles.title}>상품의 리뷰를 작성해주세요</h3>
                <p className={styles.detail}>받아보신 상품은 어떠셨나요?<br/>
                    다른 고객님들을 위해 솔직한 의견 남겨주세요:)</p>
                <div>
                    <ul className={styles.rating_list}>
                        {[...Array(reviewData.productStar)].map((a, i) => (
                            <li><FaStar key={i} onClick={() => setProductScore(i + 1)} /></li>
                        ))}
                        {[...Array(5 - reviewData.productStar)].map((a, i) => (
                            <li><FaRegStar key={i} onClick={() => setProductScore(reviewData.productStar + i + 1)} /></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p style={{marginLeft:"10px"}}><b>상품에 대한 의견을 남겨주세요</b></p>
                    <div className={styles.input_wrap}>
                        <textarea placeholder="이곳에 의견을 남겨주세요" name="comment" value={reviewData.comment} onChange={(e) => handleSetValue(e)}/>
                    </div>
                </div>
            </form>
            <Button content={"리뷰 등록"} width={"94%"} margin={"0 auto"} onClick={() => handleWriteReview()}/>
        </div>
    )
}
export default WriteReview;