import styles from './Login.module.css';
import logo from '../../images/logo/farmfarm_logo.png';
import img from '../../images/kakao_login_medium_wide.png';
import axios from "axios";
import API from "../../config";

const Login = () => {
    return (
        <div className={styles.login}>
            <img className={styles.logo} src={logo} alt='logo' />
            <div className={styles.text}>
                <h1 className={styles.title}>팜팜에 오신걸 환영합니다:)</h1>
                <p className={styles.subtitle}>팜팜에서 다양한 서비스를 이용해보세요!</p>
            </div>
            <button className={styles.button} onClick={() => {
                axios
                    .get(API.LOGIN)
                    .then((response) => window.open(response.data, "_self"))
                    .catch((error) => console.log(error));
            }}>
                <img className={styles.img} src={img} alt='button' />
            </button>
        </div>
    )
}

export default Login;
