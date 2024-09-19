import styles from "./AllAuction.module.css";
import {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import Header from "../../component/Header";
import ProductList from "../../component/ProductList";
import AuctionList from "../../component/AuctionList";
const AllAuction = () => {
    const { auctionList = [] } = useContext(DataContext); // 기본값을 빈 배열로 설정;
    return (
        <div className={styles.container}>
            <Header title={"경매 전체 보기"} go={`/home`} />
            <div className={styles.text_box}>
                <div>
                    <h5>총 <span>{auctionList.length}</span>개</h5>
                </div>
            </div>
            <AuctionList numToShow={auctionList.length}/>
        </div>
    )
}
export default AllAuction;