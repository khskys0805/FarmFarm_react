import { useLocation } from "react-router-dom";
import Header from "../../component/Header";
import styles from "./AllProduct.module.css";
import ProductList from "../../component/ProductList";
import Sort from "../../component/Sort";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const AllProduct = ({ type }) => {
    const { productList, groupProductList, setSortValue } = useContext(DataContext);

    // 현재 URL에서 쿼리 파라미터를 추출
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const queryType = params.get('type') || 'product'; // 기본값을 'product'로 설정

    // 카테고리에서 넘겨받은 상품 목록이 있다면 그것을 사용, 없으면 기본 context 데이터 사용
    const products = location.state?.productList || (queryType === "group" ? groupProductList : productList) || [];
    console.log(products);

    const handleSortChange = (newSortValue) => {
        setSortValue(newSortValue); // Sort에서 선택된 값을 DataContext에 업데이트
    };

    return (
        <div className={styles.container}>
            <Header title={queryType === "group" ? "공동구매 상품 보기" : "상품 전체 보기"} go={`/home`} />
            <div className={styles.text_box}>
                <div>
                    <h5>총 <span>{products.length}</span>개</h5>
                </div>
                <Sort onSortChange={handleSortChange} type={"product"}/>
            </div>
            <ProductList numToShow={products.length} type={queryType} products={products}/>
        </div>
    );
};

export default AllProduct;
