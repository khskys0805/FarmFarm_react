import styles from "./AllFarm.module.css";
import FarmList from "../../component/FarmList";
import Header from "../../component/Header";
import SearchBar from "../../component/SearchBar";
import Sort from "../../component/Sort";
import { useLocation } from "react-router-dom";

const AllFarm = () => {
    const location = useLocation();
    // location.state가 null이 아닌 경우에만 farms 변수에 할당하도록 수정
    const farms = location.state ? location.state.farms : [];

    return (
        <div className={styles.container}>
            <Header title="농장 전체 보기"/>
            <SearchBar/>
            <div className={styles.text_box}>
                <div>
                    <h5>총 <span>{farms.length}</span>개</h5>
                </div>
                <Sort/>
            </div>
            <FarmList farms={farms}/>
        </div>
    )
}

export default AllFarm;
