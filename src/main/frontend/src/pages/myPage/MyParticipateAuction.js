import styles from "./MyParticipateAuction.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import API from "../../config";
import img from "../../images/logo/farmfarm_logo.png";
import Button from "../../component/Button";
import {useNavigate} from "react-router-dom";
import api from "../../api/api";

const MyOrderList = () => {
    const [auctionList, setAuctionList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(API.MYAUCTION, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.result);

                setAuctionList(res.data.result);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error.response ? error.response.data : error.message);
            });
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "경매 낙찰 성공":
                return styles.status_success;
            case "경매 낙찰 실패":
                return styles.status_failure;
            case "AUCTION_IN_PROGRESS":
                return styles.status_progress;
            default:
                return '';
        }
    };

    const getStatus = (status) => {
        switch (status) {
            case "AUCTION_CLOSE":
                return
            case "AUCTION_IN_PROGRESS":
                return "경매 진행 중";
        }
    }

    const handleShowAuction = () => {
        navigate(`/allAuction`);
    }

    return (
        <div className={styles.box}>
            <Header title={"경매 참가 내역"} go={`/myPage`}/>
            <ul>
                {auctionList.length === 0 ? (
                    <div className={styles.no_list}>
                        <p>아직 경매 참여 내역이 없습니다!<br/>
                            경매를 참여해보세요!!</p>
                        <Button content={"경매 상품 보러가기"} onClick={handleShowAuction} />
                    </div>
                ) : (
                    auctionList.map((auction, index) => (
                        <li key={index} className={styles.auction_list}>
                            <div className={styles.left}>
                                <div className={styles.img}>
                                    <img src={auctionList[index].images[0].fileUrl} alt="경매 이미지" />
                                </div>
                                <div>
                                    <p className={styles.farm_name}>{auctionList[index].farmName}</p>
                                    <h5 className={styles.product_name}>{auctionList[index].productName}</h5>
                                    <h4 className={styles.price}>{auctionList[index].price}원</h4>
                                    <h4 className={styles.total_price}>총 금액: {auctionList[index].totalPrice}원</h4>
                                </div>
                            </div>
                            <div>
                                <p className={styles.date}>{new Date(auctionList[index].createdAt).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                                <h4 className={styles.quantity}>X {auctionList[index].quantity}</h4>
                                <h5 className={`${styles.status} ${getStatusClass(auctionList[index].auctionStatus)}`}>
                                    {getStatus(auctionList[index].auctionStatus)}
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