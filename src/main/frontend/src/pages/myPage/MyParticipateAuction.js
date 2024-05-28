import styles from "./MyParticipateAuction.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import img from "../../images/logo/farmfarm_logo.png";

const MyOrderList = () => {
    const [auctionList, setAuctionList] = useState([]);
    useEffect(() => {
        axios.get(API.MYAUCTION, {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setAuctionList(res.data)
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "경매 낙찰 성공":
                return styles.status_success;
            case "경매 낙찰 실패":
                return styles.status_failure;
            case "경매 진행중":
                return styles.status_progress;
            default:
                return '';
        }
    };

    return (
        <div className={styles.box}>
            <Header title={"경매 참가 내역"} go={`/myPage`}/>
            <ul>
                {auctionList.length === 0 ? (
                    <div className={styles.no_list}>
                        <p>아직 경매 참여 내역이 없습니다!<br/>
                            경매를 참여해보세요!!</p>
                        <a href="/product/auction/list">경매 물품 보러가기</a>
                    </div>
                ) : (
                    auctionList.map((auction, index) => (
                        <li key={index} className={styles.auction_list}>
                            <div className={styles.left}>
                                <div className={styles.img}>
                                    <img src={img} alt="경매 이미지" />
                                </div>
                                <div>
                                    <p className={styles.farm_name}>{auction.orders[0].product.farm.name}</p>
                                    <h5 className={styles.product_name}>{auction.orders[0].product.name}</h5>
                                    <h4 className={styles.price}>{auction.orders[0].price}원</h4>
                                    <h4 className={styles.total_price}>총 금액: {auction.total_price}원</h4>
                                </div>
                            </div>
                            <div>
                                <p className={styles.date}>{new Date(auction.created_at).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                                <h4 className={styles.quantity}>X {auction.total_quantity}</h4>
                                <h5 className={`${styles.status} ${getStatusClass(auction.orders[0].auction.status)}`}>
                                    {auction.orders[0].auction.status}
                                </h5>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}
export default MyOrderList;