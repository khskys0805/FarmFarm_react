import Header from "../../component/Header";
import styles from "./SearchProduct.module.css";
import React, {useContext, useState} from "react";
import TabBar from "../../component/TabBar";
import ProductList from "../../component/ProductList";
import SearchBar from "../../component/SearchBar";
import {DataContext} from "../../context/DataContext";
import Sort from "../../component/Sort";

const SearchProduct = () => {
    const [searchText, setSearchText] = useState("");
    const { productList, setSortValue } = useContext(DataContext);
    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleSortChange = (newSortValue) => {
        setSortValue(newSortValue); // Sort에서 선택된 값을 DataContext에 업데이트
    };

    const filterMonster = productList.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={styles.box}>
            <Header title={"상품 검색"} go={`/home`}/>
            <SearchBar searchText={searchText} onChange={handleInputChange}/>
            <div className={styles.search_result}>
                {filterMonster.length > 0 ? (
                    <>
                        <p className={styles.count}>총 <span>{filterMonster.length}</span>개의 상품이 있습니다.</p>
                        <div className={styles.sort}>
                            <Sort onSortChange={handleSortChange} type={"product"} />
                        </div>
                        <ProductList products={filterMonster} />
                    </>
                ) : (
                    <p className={styles.count}>검색된 결과가 없습니다.</p>
                )}
            </div>
            <TabBar/>
        </div>
    )
}
export default SearchProduct;