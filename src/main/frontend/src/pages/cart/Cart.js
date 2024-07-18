import styles from "./Cart.module.css";
import Header from "../../component/Header";
import React, {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import img from "../../images/logo/farmfarm_logo.png";
import {Link, useNavigate} from "react-router-dom";
import {FaTrashAlt} from "react-icons/fa";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import Button from "../../component/Button";

const Cart = () => {
    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(API.CART, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.result.itemList);
                setCarts(res.data.result.itemList);
            })
            .catch((error) => {
                console.error('장바구니 리스트를 가져오는 중 오류 발생: ', error);
            });
    }, []);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) {
            setQuantity(Math.min(Math.max(newQuantity, 0), 100));
        }
    }
    const decreaseValue = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
    }

    const increaseValue = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, 100));
    }

    return (
        <div className={styles.box}>
            <Header title={"장바구니"} go={-1}/>
            <ul>
                {carts.length === 0 ? (
                    <div className={styles.no_list}>
                        <p>아직 장바구니에 담긴 상품이 없습니다!<br/>
                            상품을 구매해보세요!!</p>
                        <Link to="/productList">
                            <div>판매 상품 보러 가기</div>
                        </Link>
                    </div>
                ) : (
                    carts.map((cart, index) => (
                        <>
                            <li key={index} className={styles.cart_list}>
                                <div className={styles.left}>
                                    <div className={styles.img}>
                                        <img src={img} alt="상품 이미지" />
                                    </div>
                                    <div>
                                        <p className={styles.farm_name}>{cart.farmName}</p>
                                        <h5 className={styles.product_name}>{cart.productName}</h5>
                                        <h4 className={styles.price}>{cart.price}원</h4>
                                        <h4 className={styles.total_price}>총 금액: {cart.totalPrice}원</h4>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <h4 className={styles.remove}><FaTrashAlt /></h4>
                                    <h4 className={styles.quantity}>
                                        <div className={styles.stepper}>
                                            <div className={styles.stepper_button_minus} onClick={decreaseValue}></div>
                                            <div className={styles.stepper_input_wrap}>
                                                <input type="number" value={cart.quantity} onChange={handleQuantityChange} readOnly/>
                                            </div>
                                            <div className={styles.stepper_button_plus} onClick={increaseValue}></div>
                                        </div>
                                    </h4>
                                </div>
                            </li>
                        </>
                    ))
                )}
            </ul>
        </div>
    )
}
export default Cart;