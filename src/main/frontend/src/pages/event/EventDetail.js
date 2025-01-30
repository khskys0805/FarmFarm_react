import styles from "../event/EventDetail.module.css";
import Header from "../../component/Header";
import { useEffect, useState } from "react";
import API from "../../config";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const EventDetail = () => {
    const [eventDetail, setEventDetail] = useState(null);
    const [endDate, setEndDate] = useState(""); // endDate를 상태로 관리
    const { id } = useParams();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
        const day = date.getDate();

        return `${year}년 ${month}월 ${day}일`;
    };

    useEffect(() => {
        api.get(API.EVENT(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
            })
            .then((res) => {
                console.log(res.data.result);
                setEventDetail(res.data.result);
                setEndDate(formatDate(res.data.result.end_date));

            })
            .catch((error) => {
                console.error("에러 발생: ", error.response.data || error);
            });
    }, [id]);

    if (!eventDetail) {
        return <div>Loading...</div>; // 데이터 로딩 중일 때 표시
    }

    // content를 마침표로 분리
    const lines = eventDetail.content.split(".").map(line => line.trim());

    return (
        <div className={styles.box}>
            <Header title={"이벤트"} go={`/home`} />
            <div className={styles.container}>
                <h1 className={styles.title}>" {eventDetail.title} "</h1>
                <img src={eventDetail.image_url} alt={eventDetail.evId} />
                <div className={styles.text}>
                {/*{lines.map((line, index) => (*/}
                {/*    <h4 key={index}>{line + (index < lines.length - 1 ? "." : "")}</h4>*/}
                {/*))}*/}
                    <h4>{eventDetail.content}</h4>
                </div>
                <p className={styles.end_date}>마감기한: {endDate}까지</p>
            </div>
        </div>
    );
};
export default EventDetail;
