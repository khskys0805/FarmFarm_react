import styles from "./RegisterProduct.module.css";
import Header from "../../component/Header";
import InputBox from "../../component/InputBox";
import Button from "../../component/Button";
import TabBar from "../../component/TabBar";

const RegisterProduct = () => {
    return (
        <div className={styles.box}>
            <Header title={"상품 등록"}/>
            <form className={styles.form}>
                <div className={styles.content_wrapper}>
                    <h3>상품 유형</h3>
                    <p>상품 유형을 선택해주세요.</p>
                    <div>
                        <InputBox type={"radio"} name={"type"} value={1}/><span>일반 상품</span>
                        <InputBox type={"radio"} name={"type"} value={2}/><span>공동 구매</span>
                        <InputBox type={"radio"} name={"type"} value={3}/><span>경매 상품</span>
                    </div>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>경매 종료 날짜를 선택해주세요.</h3>
                    <InputBox type={"date"} name={"date"}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>경매 종료 시각을 입력해주세요.</h3>
                    <InputBox type={"text"} name={"hour"} placeholder={"0부터 23까지 선택"}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>경매 종료 분을 입력해주세요.</h3>
                    <InputBox type={"text"} name={"minute"} placeholder={"0부터 59까지 선택"}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>상품 이름</h3>
                    <InputBox type={"text"} name={"name"} placeholder={"상품 이름을 입력해주세요."}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>상품 수량</h3>
                    <InputBox type={"text"} name={"quantity"} placeholder={"상품 수량을 입력해주세요."}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>상품 설명</h3>
                    <p>상품과 관련된 내용들을 자유롭게 작성해주세요. </p>
                    <textarea name="detail" rows="10" cols="100%" placeholder="상품에 대한 자세한 설명을 작성해주세요."></textarea>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>상품 가격</h3>
                    <p>판매하시는 상품의 가격을 입력해주세요.</p>
                    <InputBox type={"text"} name={"price"} placeholder={"상품 가격을 입력해주세요."}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>거래 방법</h3>
                    <p>상품을 거래할 방법을 선택해주세요.</p>
                    <div>
                        <InputBox type={"radio"} name={"direct"} value={true}/><span>직거래</span>
                        <InputBox type={"radio"} name={"direct"} value={false}/><span>배송</span>
                    </div>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>사진을 올려주세요 <span>(선택)</span></h3>
                    <div>
                        <label className={styles.file_label}>파일 선택</label>
                        <input className={styles.file} type="file"/>
                        <div className={styles.my_image}></div>
                        <input type="hidden" name="image1" className="img1"/>
                        <input type="hidden" name="image2" className="img2"/>
                        <input type="hidden" name="image3" className="img3"/>
                    </div>
                    <p style={{marginTop:"20px"}}>상품과 무관한 사진을 첨부하면 노출 제한 처리될 수 있습니다.<br/>
                        사진 첨부 시 개인정보가 노출되지 않도록 유의해주세요.</p>
                </div>
                <Button content={"상품 등록"} />
            </form>
            <TabBar/>
        </div>
    );
};

export default RegisterProduct;
