import styles from "./SearchBar.module.css";
import React, {useState} from "react";
import InputBox from "./InputBox";
import {HiMiniMagnifyingGlass} from "react-icons/hi2";
const SearchBar = ({searchText, onChange}) => {
    return (
        <div className={styles.input_wrap}>
            <InputBox type={"search"} value={searchText} placeholder={"검색어를 입력해주세요."} onChange={(e) => onChange(e)}/>
            <span><HiMiniMagnifyingGlass style={{ fontSize: '18px' }}/></span>
        </div>
    )
}
export default SearchBar;