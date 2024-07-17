import styles from "./Cart.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";

const Cart = () => {
    const [carts, setCarts] = useState([]);
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
    return (
        <div className={styles.box}>
            <Header title={"장바구니"} go={-1}/>
            <form className={styles.form}>

            </form>
        </div>
    )
}
export default Cart;