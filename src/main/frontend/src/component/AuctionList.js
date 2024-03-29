import {useEffect, useState} from "react";
import axios from "axios";
import API from "../config";
import styles from "./AuctionList.module.css";

const AuctionList = ({ numToShow }) => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        axios.get(API.ALLAUCTION, {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setAuctions(res.data);
                console.log("auction:" + res.data);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    return (
        <div>
            {auctions.length === 0 && <p className={styles.no_auction}>진행 중인 경매 상품이 없어요.</p>}
            {auctions.length > 0 && (
                auctions.slice(0, numToShow || auctions.length).map((item, index) => (
                    item.open_status !== 2 && (
                        <div className={styles.item_box} key={index} onClick={() => { window.location.href=`/product/${item.product.PId}` }}>
                            <div className={styles.item_media}>
                                <img src={item.image1} alt=""/>
                            </div>
                            <div className={styles.auction_time}>
                                <h3 data-date={item.date}></h3>
                            </div>
                            <div className={styles.item_content}>
                                <h5>{item.farm.name}</h5>
                                <h3 className={styles.title}>{item.name}</h3>
                                <h4 className={styles.price}>경매 시작가 {item.price}원</h4>
                            </div>
                        </div>
                    )
                ))
            )}
        </div>
    );
}
export default AuctionList;