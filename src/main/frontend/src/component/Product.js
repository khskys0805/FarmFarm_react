import {useEffect, useState} from "react";
import axios from "axios";
import API from "../config";

const Product = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get(API.PRODUCT)
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setProduct(res.data.content);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    });
    return (
        <div className="item-box">
            <div className="item-media">
                <img src=${product.image1} alt=""/>
            </div>
            <label className="bookmark-btn">
                <input type="checkbox" checked/>
            </label>
            <div className="item-content">
                <h5>${product.farm.name}</h5>
                <h3 className="title">
                    ${product.name}
                </h3>
                <h4 className="price">${product.price}원</h4>
            </div>
        </div>
    )
}
export default Product;