import {useContext, useEffect, useState} from "react";
import axios from "axios";
import API from "../config";
import styles from "./AuctionList.module.css";
import {DataContext} from "../context/DataContext";
import {useNavigate} from "react-router-dom";

const AuctionList = ({ numToShow }) => {
    const { auctionList = [] } = useContext(DataContext); // 기본값을 빈 배열로 설정;
    const navigate = useNavigate();

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