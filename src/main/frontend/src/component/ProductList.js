// ProductList.js
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";
import defaultImg from "../images/icon.png";
import {DataContext} from "../context/DataContext";

const ProductList = ({ numToShow, type = 'product' }) => {
    const { productList = [], groupProductList = [] } = useContext(DataContext); // 기본값을 빈 배열로 설정
    const products = type === 'group' ? groupProductList : productList;

    return (
        <div className={products.length === 0 ? '' : styles.item_container}>
            {products.length === 0 && <p style={{ textAlign: "center", margin: "30px 0" }}>등록된 상품이 없어요.</p>}
            {products.length > 0 && (
                products.slice(0, numToShow || products.length).map((item, index) => (
                    <div className={styles.item_box} key={index}>
                        <Link to={`/productDetail/${item.pid}`}>
                            <div className={styles.item_media}>
                                {item.images && item.images.length > 0 ? (
                                    <img src={item.images[0].fileUrl} alt="" />
                                ) : (
                                    <img src={defaultImg} alt="" />
                                )}
                            </div>
                            <label className="bookmark-btn">
                                <input type="checkbox" checked />
                            </label>
                            <div className={styles.item_content}>
                                <h5>{item.farm.name}</h5>
                                <h3 className={styles.title}>
                                    {item.name}
                                </h3>
                                <h4 className={styles.price}>{item.price}원</h4>
                            </div>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProductList;
