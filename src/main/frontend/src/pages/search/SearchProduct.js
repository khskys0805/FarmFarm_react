import Header from "../../component/Header";
import styles from "./SearchProduct.module.css";
import InputBox from "../../component/InputBox";
import React, {useEffect, useState} from "react";
import {HiMiniMagnifyingGlass} from "react-icons/hi2";
import TabBar from "../../component/TabBar";
import axios from "axios";
import API from "../../config";
import ProductList from "../../component/ProductList";
import SearchBar from "../../component/SearchBar";

const SearchProduct = () => {
    const [searchText, setSearchText] = useState("");
    const [productList, setProductList] = useState([]);
    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    }

    const filterMonster = productList.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        axios.get(API.ALLPRODUCT, {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setProductList(res.data);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, [])

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