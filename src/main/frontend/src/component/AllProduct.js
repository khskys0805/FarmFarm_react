import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config";
import styles from "./AllProduct.module.css";

const AllProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(API.ALLPRODUCT, {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setProducts(res.data);
                console.log("product:" + res.data);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    return (
        <div className={styles.item_container}>
            {products.length === 0 && <p>상품이 없습니다.</p>}
            {products.length > 0 && (
                products.map((item, index) => (
                    <div className={styles.item_box} key={index}>
                        <div className={styles.item_media}>
                            <img src={item.image1} alt=""/>
                        </div>
                        <label className="bookmark-btn">
                            <input type="checkbox" checked/>
                        </label>
                        <div className={styles.item_content}>
                            <h5>{item.farm.name}</h5>
                            <h3 className={styles.title}>
                                {item.name}
                            </h3>
                            <h4 className={styles.price}>{item.price}원</h4>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default AllProduct;
