import Header from "../../component/Header";
import styles from "./AllProduct.module.css";
import ProductList from "../../component/ProductList";
import SearchBar from "../../component/SearchBar";
import Sort from "../../component/Sort";
import {useLocation} from "react-router-dom";
const AllProduct = () => {
    const location = useLocation();
    const products = location.state ? location.state.products : [];

    return (
        <div className={styles.container}>
            <Header title="상품 전체 보기"/>
            <div className={styles.text_box}>
                <div>
                    <h5>총 <span>{products.length}</span>개</h5>
                </div>
                <Sort/>
            </div>
            <ProductList products={products}/>
        </div>
    )
}
export default AllProduct;