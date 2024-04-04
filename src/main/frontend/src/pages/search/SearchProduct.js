import Header from "../../component/Header";
import styles from "./SearchProduct.module.css";
import InputBox from "../../component/InputBox";
import React, {useState} from "react";
import {HiMiniMagnifyingGlass} from "react-icons/hi2";

const SearchProduct = () => {
    const [search, setSearch] = useState(null);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    }
    return (
        <div className={styles.box}>
            <Header title={"상품 검색"} go={`/home`}/>
            <div className={styles.input_wrap}>
                <InputBox type={"search"} value={search} placeholder={"검색어를 입력해주세요."} onChange={handleInputChange}/>
                <span><HiMiniMagnifyingGlass style={{ fontSize: '18px' }}/></span>
            </div>

        </div>
    )
}
export default SearchProduct;