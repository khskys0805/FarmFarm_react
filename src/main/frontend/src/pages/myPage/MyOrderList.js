import styles from "./MyOrderList.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import API from "../../config";
import {useNavigate} from "react-router-dom";
import Button from "../../component/Button";
import api from "../../api/api";

const MyOrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(API.MYORDER, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            withCredentials: true
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.result.myOrderList);
                const myOrder = res.data.result.myOrderList.filter((item) =>
                    item.orderDetails[0].type !== 2
                );
                setOrderList(myOrder);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    const getStatusInfo = (status) => {
        switch (status) {
            case "BEFORE_PAYMENT":
                return {
                    text: "결제 미완료",
                    className: styles.status_before
                };
            case "PAYMENT_COMPLETED":
                return {
                    text: "결제 완료",
                    className: styles.status_completed
                };
            case "PAYMENT_CANCELED":
                return {
                    text: "결제 취소",
                    className: styles.status_canceled
                };
            default:
                return {
                    text: "결제 이상",
                    className: styles.status_canceled
                }
        }
    };
    const handleOrderProduct = () => {
        navigate(`/productList`);
    }

    const goToWriteReview = (id) => {
        console.log(id);
        navigate(`/review/write`, {state: {odId:id}});
    }
    return (
        <div className={styles.box}>
            <Header title={"주문 내역"} go={`/myPage`} />
            <ul>
                {orderList.length === 0 ? (
                    <div className={styles.no_list}>
                        <p>아직 주문 내역이 없습니다!<br />
                            상품을 구매해보세요!!</p>
                        <Button content={"판매 상품 보러가기"} width={"90%"} margin={"0 auto"} onClick={handleOrderProduct} />
                    </div>
                ) : (
                    orderList.map((order, index) => {
                        const statusInfo = getStatusInfo(order.paymentStatus);
                        return (
                        <div key={index}>
                            <div className={styles.order_date}>
                                {order.paymentStatus === "PAYMENT_COMPLETED" && (
                                    <div className={styles.order_cancel}>주문취소</div>
                                )}
                                <h4 className={styles.date}>
                                    {new Date(order.created_at).toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </h4>
                                <h5 className={`${styles.order_status} ${statusInfo.className}`}>{statusInfo.text}</h5>
                            </div>
                            {order.orderDetails.map((detail, detailIndex) => (
                                <li key={detailIndex} className={styles.order_list}>
                                    <div className={styles.left}>
                                        <div className={styles.img}>
                                            <img src={detail.images[0].fileUrl} alt="상품 이미지" />
                                        </div>
                                        <div>
                                            <p className={styles.farm_name}>{detail.farmName}</p>
                                            <h5 className={styles.product_name}>{detail.productName}</h5>
                                            <h4 className={styles.price}>{detail.price}원</h4>
                                            <h4 className={styles.total_price}>총 금액: {detail.totalPrice}원</h4>
                                        </div>
                                    </div>
                                    {order.paymentStatus === "PAYMENT_COMPLETED" && (
                                        <div>
                                            <h4 className={styles.review} onClick={() => goToWriteReview(order.orderDetails[0].odId)}>리뷰 작성</h4>
                                            <h4 className={styles.quantity}>X {detail.quantity}</h4>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </div>
                        );
                    })
                )}
            </ul>
        </div>
    );
}
export default MyOrderList;