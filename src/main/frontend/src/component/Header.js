import { IoIosArrowDropleftCircle } from "react-icons/io";
import styles from "./Header.module.css"
const Header = ({title}) => {
    return (
        <div className={styles.box}>
            <IoIosArrowDropleftCircle size="30" color="#94C015FF" style={{cursor:"pointer", position:"absolute"}}/>
            <span className={styles.title}>{title}</span>
        </div>
    )
}
export default Header;