import styles from "./MyParticipateAuction.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";

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
    return (
        <div className={styles.box}>
            <Header title={"경매 참가 내역"} go={-1}/>
            <ul>
                {auctionList.length === 0 ? (
                    <div className={styles.no_list}>
                        <p>아직 경매 참여 내역이 없습니다!<br/>
                            경매를 참여해보세요!!</p>
                        <a href="/product/auction/list">경매 물품 보러가기</a>
                    </div>
                ) : (
                    {/* auctionList가 비어있지 않은 경우 */}
                )}
            </ul>
        </div>
    )
}
export default MyOrderList;