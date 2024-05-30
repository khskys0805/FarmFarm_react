import styles from "./AllFarm.module.css";
import FarmList from "../../component/FarmList";
import Header from "../../component/Header";
import SearchBar from "../../component/SearchBar";
import Sort from "../../component/Sort";
import { useLocation } from "react-router-dom";
import Location from "../../component/Location";
import React, {useState} from "react";
import ProductList from "../../component/ProductList";

const AllFarm = () => {
    const location = useLocation();
    // location.state가 null이 아닌 경우에만 farms 변수에 할당하도록 수정
    const farms = location.state ? location.state.farms : [];
    const [searchText, setSearchText] = useState("");
    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    }

    const filterMonster = farms.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.box}>
            <Header title="농장 전체 보기" go={`/home`}/>
            <Location farms={farms} />
            <SearchBar searchText={searchText} onChange={handleInputChange}/>
            <div className={styles.text_box}>
                {filterMonster.length > 0 && (
                    <div>
                        <h5>총 <span>{filterMonster.length}</span>개</h5>
                    </div>
                )}
                <Sort/>
            </div>
            <div className={styles.search_result}>
                {filterMonster.length > 0 ? (
                    <FarmList farms={filterMonster} />
                ) : (
                    <p className={styles.count}>검색된 결과가 없습니다.</p>
                )}
            </div>
            {/*<FarmList farms={farms}/>*/}
        </div>
    )
}

export default AllFarm;
