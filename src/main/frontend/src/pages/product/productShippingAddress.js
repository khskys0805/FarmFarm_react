import styles from "./RegisterProduct.module.css";
import Header from "../../component/Header";

const productShippingAddress = () => {
    return (
        <div className={styles.box}>
            <Header title={"배송 정보 입력"} go={-1}/>
        </div>
    )
}
export default productShippingAddress;