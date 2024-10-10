import styles from "./Enquiry.module.css";
import { FaPen, FaTrash } from "react-icons/fa";
const Enquiry = ({enquiries}) => {
    return (
        <div className={styles.enquiry_list}>
            {enquiries.map((enquiry, index) => (
                <div key={index} className={styles.enquiry_item}>
                    <h4 className={styles.enquiry_nickname}>현수님</h4>
                    <div className={styles.content}>
                        <p className="li_en">{enquiry.content}</p>
                        <span>
                            <span><FaPen /></span>
                            <span className={styles.trash}><FaTrash /></span>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Enquiry;