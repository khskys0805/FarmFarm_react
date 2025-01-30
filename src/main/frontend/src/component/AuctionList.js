import {useContext, useEffect, useState} from "react";
import styles from "./AuctionList.module.css";
import {DataContext} from "../context/DataContext";
import {useNavigate} from "react-router-dom";

const AuctionList = ({ numToShow }) => {
    const { auctionList = [] } = useContext(DataContext); // 기본값을 빈 배열로 설정;
    const navigate = useNavigate();
    const [timeLeftArray, setTimeLeftArray] = useState([]);

    useEffect(() => {
        const updateRemainingTime = () => {
            const updatedTimeLeftArray = auctionList.map(item => calculateTimeLeft(item.closeCalendar));
            setTimeLeftArray(updatedTimeLeftArray);
        };

        // 최초 남은 시간 계산
        updateRemainingTime();

        // 1초마다 시간 갱신
        const intervalId = setInterval(updateRemainingTime, 1000);

        // 컴포넌트가 언마운트될 때 타이머 정리
        return () => clearInterval(intervalId);
    }, [auctionList]);

    const calculateTimeLeft = (closedAt) => {
        const difference = new Date(closedAt) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
                hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
                minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
                seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
            };
        } else {
            timeLeft = { days: '00', hours: '00', minutes: '00', seconds: '00' };
        }

        return timeLeft;
    };

    const handleGoToAuctionDetail = (item) => {
        navigate(`/auctionDetail/${item.pid}`, { state: { id:item.pid } });
    }
    return (
        <div>
            {auctionList.length === 0 && <p className={styles.no_auction}>진행 중인 경매 상품이 없어요.</p>}
            {auctionList.length > 0 && (
                auctionList.slice(0, numToShow || auctionList.length).map((item, index) => (
                    item.open_status !== 2 && (
                        <div className={styles.item_box} key={index} onClick={() => handleGoToAuctionDetail(item)}>
                            <div className={styles.item_media}>
                                <img src={item.images[0].fileUrl} alt=""/>
                            </div>
                            <div className={styles.auction_time}>
                                <h3 data-date={item.date}></h3>
                            </div>
                            <div className={styles.item_content}>
                                <div>
                                    <h5>{item.farm.name}</h5>
                                    <h3 className={styles.title}>{item.name}</h3>
                                    <h4 className={styles.price}>경매 시작가 {item.price}원</h4>
                                </div>
                                <div>
                                    {timeLeftArray[index] && (
                                        <h3>
                                            {timeLeftArray[index].days}일 {timeLeftArray[index].hours}:{timeLeftArray[index].minutes}:{timeLeftArray[index].seconds}
                                        </h3>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                ))
            )}
        </div>
    );
}
export default AuctionList;