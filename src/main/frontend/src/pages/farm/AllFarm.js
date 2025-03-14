import React, {useContext, useState} from 'react';
import styles from './AllFarm.module.css';
import FarmList from '../../component/FarmList';
import Header from '../../component/Header';
import SearchBar from '../../component/SearchBar';
import Sort from '../../component/Sort';
import Location from '../../component/Location';
import {DataContext} from "../../context/DataContext";

const AllFarm = () => {
    const { farmList, setSortValue } = useContext(DataContext);
    console.log(farmList);
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSortChange = (newSortValue) => {
        setSortValue(newSortValue); // Sort에서 선택된 값을 DataContext에 업데이트
    };

    const filterMonster = searchText
        ? farmList.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
        : farmList;

    return (
        <div className={styles.box}>
            <Header title="농장 전체 보기" go={`/home`} />
            <Location farms={farmList} type={1} />
            <SearchBar searchText={searchText} onChange={handleInputChange} />
            <div className={styles.text_box}>
                <div>
                    <h5>총 <span>{filterMonster.length}</span>개</h5>
                </div>
                <Sort onSortChange={handleSortChange} type={"farm"}/>
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
