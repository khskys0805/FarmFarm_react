import Header from "../../component/Header";
import styles from "./AllProduct.module.css";
import ProductList from "../../component/ProductList";
import Sort from "../../component/Sort";
import {useContext} from "react";
import {DataContext} from "../../context/DataContext";
const AllProduct = () => {
    const { products } = useContext(DataContext);

    return (
        <div className={styles.container}>
            <Header title="상품 전체 보기" go={`/home`}/>
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