import styles from "./Payment.module.css";
import Button from "../../component/Button";
import Header from "../../component/Header";
import { FaCircleCheck } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.box}>
            <Header title={"결제"} />
            <div className={styles.wrapper}>
                <div className={styles.text}>
                    <h1 className={styles.success}>결제에 성공했습니다.</h1>
                    <FaCircleCheck size="30px"/>
                </div>
                <div className={styles.btn}>
                    <Button content={"홈 화면으로 가기"} onClick={() => navigate(`/home`)}/>
                    <Button content={"내 주문 내역 보기"} />
                </div>
            </div>
        </div>
    )
}
export default PaymentSuccess;