import styles from "./Payment.module.css";
import Button from "../../component/Button";
import Header from "../../component/Header";

const PaymentSuccess = () => {
    return (
        <div className={styles.box}>
            <Header title={"결제"} />
            <div className={styles.wrapper}>
                <h1 className={styles.success}>결제에 성공했습니다.</h1>
                <Button content={"홈 화면으로 가기"} />
                <Button content={"내 주문 내역 보기"} />
            </div>
        </div>
    )
}
export default PaymentSuccess;