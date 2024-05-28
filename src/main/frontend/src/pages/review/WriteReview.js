import styles from "./WriteReview.module.css";
import Header from "../../component/Header";
import { FaRegStar, FaStar } from "react-icons/fa";
import Button from "../../component/Button";
const WriteReview = () => {
    return (
        <div className={styles.box}>
            <Header title={"리뷰 작성"} go={-1}/>
            <form className={styles.review}>
                <h3 className={styles.title}>농장의 별점을 입력해주세요.</h3>
                <div>
                    <input type="hidden" name="farmStar" id="farmStar"/>
                        <ul className={styles.rating_list}>
                            <li><FaStar /></li>
                            <li><FaStar /></li>
                            <li><FaStar /></li>
                            <li><FaRegStar /></li>
                            <li><FaRegStar /></li>
                        </ul>
                </div>
                <h3 className={styles.title}>상품의 리뷰를 작성해주세요</h3>
                <p className={styles.detail}>받아보신 상품은 어떠셨나요?<br/>
                    다른 고객님들을 위해 솔직한 의견 남겨주세요:)</p>
                <div>
                    <input type="hidden" name="productStar" id="productStar"/>
                        <ul className={styles.rating_list}>
                            <li><FaStar /></li>
                            <li><FaStar /></li>
                            <li><FaStar /></li>
                            <li><FaRegStar /></li>
                            <li><FaRegStar /></li>
                        </ul>
                </div>
                <div>
                    <p><b>상품에 대한 의견을 남겨주세요</b></p>
                    <div class={styles.input_wrap}>
                        <textarea placeholder="이곳에 의견을 남겨주세요"name="comment"/>
                    </div>
                </div>
            </form>
            <Button content={"리뷰 등록"} width={"inherit"}/>
        </div>
    )
}
export default WriteReview;