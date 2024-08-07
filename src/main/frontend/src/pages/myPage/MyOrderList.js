import styles from "./MyOrderList.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import img from "../../images/logo/farmfarm_logo.png";
import {useNavigate} from "react-router-dom";

const MyOrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API.MYORDER, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setOrderList(res.data)
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);
    return (
        <div className={styles.box}>
            <Header title={"주문 내역"} go={`/myPage`}/>
            <ul>
                {orderList.length === 0 ? (
                    <div className={styles.no_list}>
                        <p>아직 주문 내역이 없습니다!<br/>
                            상품을 구매해보세요!!</p>
                        <a href="/product/auction/list">판매 상품 보러가기</a>
                    </div>
                ) : (
                    orderList.map((order, index) => (
                        <>
                            <div className={styles.order_date}>
                                {order.status === "결제 완료" && (<div className={styles.order_cancel}>주문취소</div>)}
                                <h4 className={styles.date}>{new Date(order.created_at).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</h4>
                                <p className={styles.order_status}>{order.status}</p>
                            </div>
                            <li key={index} className={styles.order_list}>
                                <div className={styles.left}>
                                    <div className={styles.img}>
                                        <img src={img} alt="상품 이미지" />
                                    </div>
                                    <div>
                                        <p className={styles.farm_name}>{order.orders[0].product.farm.name}</p>
                                        <h5 className={styles.product_name}>{order.orders[0].product.name}</h5>
                                        <h4 className={styles.price}>{order.orders[0].price}원</h4>
                                        <h4 className={styles.total_price}>총 금액: {order.total_price}원</h4>
                                    </div>
                                </div>
                                <div>
                                    <h4 className={styles.review} onClick={() => navigate(`/review/write`)}>리뷰 작성</h4>
                                    <h4 className={styles.quantity}>X {order.total_quantity}</h4>
                                </div>
                            </li>
                        </>
                    ))
                )}
            </ul>
        </div>
    )
}
export default MyOrderList;