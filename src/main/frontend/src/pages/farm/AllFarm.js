import React, { useState } from 'react';
import styles from './AllFarm.module.css';
import FarmList from '../../component/FarmList';
import Header from '../../component/Header';
import SearchBar from '../../component/SearchBar';
import Sort from '../../component/Sort';
import Location from '../../component/Location';
import { useLocation } from 'react-router-dom';

const AllFarm = () => {
    const location = useLocation();
    let farms = location.state?.farmList || []; // `state`가 없으면 빈 배열
    const [searchText, setSearchText] = useState('');
    console.log("Location state:", location.state);
    console.log("Farms:", farms);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    // farms가 배열이 아닌 경우에 대한 예외 처리
    if (!Array.isArray(farms)) {
        farms = [];
    }

    const filterMonster = searchText
        ? farms.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
        : farms;

    return (
        <div className={styles.box}>
            <Header title="농장 전체 보기" go={`/home`} />
            <Location farms={farms} type={1} />
            <SearchBar searchText={searchText} onChange={handleInputChange} />
            <div className={styles.text_box}>
                <div>
                    <h5>총 <span>{filterMonster.length}</span>개</h5>
                </div>
                <Sort />
            </div>
            <div className={styles.search_result}>
                {filterMonster.length > 0 ? (
                    <FarmList farms={filterMonster} />
                ) : (
                    <p className={styles.count}>검색된 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default AllFarm;
