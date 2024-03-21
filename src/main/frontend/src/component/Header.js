import { IoIosArrowDropleftCircle } from "react-icons/io";
import styles from "./Header.module.css"
import {useNavigate} from "react-router-dom";
const Header = ({title}) => {
    const navigate = useNavigate();
    const onClickArrow = () => {
        navigate(-1);
    }
    return (
        <div className={styles.box}>
            <IoIosArrowDropleftCircle size="30" color="#94C015FF" onClick={onClickArrow} style={{cursor:"pointer", position:"absolute"}}/>
            <span className={styles.title}>{title}</span>
        </div>
    )
}
export default Header;