import styles from "./EnquiryForm.module.css";
import Button from "./Button";
const EnquiryForm = () => {
    return (
        <div className={styles.form_container}>
            <h5>1:1 문의 작성</h5>
            <textarea className={styles.form} placeholder={"1:1 문의 내용을 작성해주세요"}/>
            <Button content={"문의 작성"}/>
        </div>
    )
}
export default EnquiryForm;