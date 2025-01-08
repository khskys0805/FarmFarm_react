import styles from "../myPage/MyPage.module.css";
import Header from "../../component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import {useParams} from "react-router-dom";

const EventDetail = () => {
    const [eventDetail, setEventDetail] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(API.EVENT(id), {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log(res.data.result);
                setEventDetail(res.data.result);
            })
            .catch((error) => {
                console.error('에러 발생: ', error.response.data || error);
            })
    }, []);

    return (
        <div className={styles.box}>
            <Header title={"이벤트 상세페이지"} go={`/home`}/>
        </div>
    )
}
export default EventDetail;