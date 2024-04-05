import Header from "../../component/Header";
import styles from "./SearchProduct.module.css";
import InputBox from "../../component/InputBox";
import React, {useEffect, useState} from "react";
import {HiMiniMagnifyingGlass} from "react-icons/hi2";
import TabBar from "../../component/TabBar";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import API from "../../config";
import ProductList from "../../component/ProductList";

const SearchProduct = () => {
    const [searchText, setSearchText] = useState("");
    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();

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
    const performSearch = () => {
        if (searchText === "") {
            alert('검색어를 입력해주세요.');
        } else {
            const url = '/product/list?keyword=' + encodeURIComponent(searchText);
            navigate(url);
            console.log("검색어: " + searchText);
        }
    };

    return (
        <div className={styles.box}>
            <Header title={"상품 검색"} go={`/home`}/>
            <div className={styles.input_wrap}>
                <InputBox type={"search"} value={searchText} placeholder={"검색어를 입력해주세요."} onChange={handleInputChange}/>
                <span onClick={performSearch}><HiMiniMagnifyingGlass style={{ fontSize: '18px' }}/></span>
            </div>
            {filterMonster && (
                <div className={styles.search_result}>
                    <p className={styles.count}>총 <span>{filterMonster.length}</span>개의 상품이 있습니다.</p>
                    <ProductList products={filterMonster}/>
                </div>
            )}
            <TabBar/>
        </div>
    )
}
export default SearchProduct;