import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config";

const AllProduct = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get(API.ALLPRODUCT, {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setProduct(res.data);
                console.log("product:" + res.data);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    return (
        <div>
            {product.length}
            {product.length === 0 && <p>상품이 없습니다.</p>}
            {product.length > 0 && (
                product.map((item, index) => (
                    <div className="item-box" key={index}>
                        <div className="item-media">
                            <img src={item.image1} alt=""/>
                        </div>
                        <label className="bookmark-btn">
                            <input type="checkbox" checked/>
                        </label>
                        <div className="item-content">
                            {/*<h5>{item.farm.name}</h5>*/}
                            <h3 className="title">
                                {item.name}
                            </h3>
                            <h4 className="price">{item.price}원</h4>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default AllProduct;
