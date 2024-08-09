import { useLocation } from "react-router-dom";
import Header from "../../component/Header";
import styles from "./AllProduct.module.css";
import ProductList from "../../component/ProductList";
import Sort from "../../component/Sort";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const AllProduct = () => {
    const { productList, groupProductList } = useContext(DataContext);

    // 현재 URL에서 쿼리 파라미터를 추출
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get('type') || 'product'; // 기본값을 'product'로 설정

    const products = type === "group" ? groupProductList || [] : productList || [];

    return (
        <div className={styles.container}>
            <Header title={type === "group" ? "공동구매 상품 보기" : "상품 전체 보기"} go={`/home`} />
            <div className={styles.text_box}>
                <div>
                    <h5>총 <span>{products.length}</span>개</h5>
                </div>
                <Sort />
            </div>
            <ProductList numToShow={products.length} type={type} />
        </div>
    );
};

export default AllProduct;
