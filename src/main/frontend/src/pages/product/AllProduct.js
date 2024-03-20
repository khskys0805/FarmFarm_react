import Header from "../../component/Header";
import styles from "./AllProduct.module.css";
import ProductList from "../../component/ProductList";
const AllProduct = () => {
    return (
        <div className={styles.container}>
            <Header title="상품 전체 보기"/>
            <ProductList/>
        </div>
    )
}
export default AllProduct;