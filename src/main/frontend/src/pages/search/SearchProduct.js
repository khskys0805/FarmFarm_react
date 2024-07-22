import Header from "../../component/Header";
import styles from "./SearchProduct.module.css";
import React, {useContext, useEffect, useState} from "react";
import TabBar from "../../component/TabBar";
import ProductList from "../../component/ProductList";
import SearchBar from "../../component/SearchBar";
import {DataContext} from "../../context/DataContext";

const SearchProduct = () => {
    const [searchText, setSearchText] = useState("");
    const { productList } = useContext(DataContext);
    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    }

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