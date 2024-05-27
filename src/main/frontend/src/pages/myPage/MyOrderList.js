import styles from "./MyOrderList.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";

const MyOrderList = () => {
    const [enquiryList, setEnquiryList] = useState([]);
    useEffect(() => {
        axios.get(API.MYORDER, {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setEnquiryList(res.data)
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);
    return (
        <div className={styles.box}>
            <Header title={"주문 내역"} go={-1}/>
        </div>
    )
}
export default MyOrderList;