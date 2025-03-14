import { IoIosArrowDropleftCircle } from "react-icons/io";
import styles from "./Header.module.css"
import {useNavigate} from "react-router-dom";
const Header = ({title, go}) => {
    const navigate = useNavigate();
    const onClickArrow = () => {
        navigate(go);
    }
    return (
        <div className={styles.box}>
            <IoIosArrowDropleftCircle size="30" color="#94C015FF" onClick={onClickArrow} style={{cursor:"pointer", position:"absolute", left:"10px"}}/>
            <span className={styles.title}>{title}</span>
        </div>
    )
}
export default Header;