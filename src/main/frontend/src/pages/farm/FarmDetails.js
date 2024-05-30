import styles from "./FarmDetails.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import SwiperComponent from "../../component/SwiperComponent";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {FaPen} from "react-icons/fa6";
import {FaTrashAlt} from "react-icons/fa";
import {FiShare2} from "react-icons/fi";
import Tabs from "../../component/Tabs";
import Location from "../../component/Location";
const FarmDetails = () => {
    const { id } = useParams();
    const [farm, setFarm] = useState([]);
    const [images, setImages] = useState([]);
    const [farmAllInfo, setFarmAllInfo] = useState([]);
    const [user, setUser] = useState(null); // 사용자 정보 상태
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API.FARM(id), {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);
                console.log(res.data.farm);

                setFarm(res.data.farm);
                setFarmAllInfo(res.data);
                const imageArray = [];
                imageArray.push(<img key="image" src={res.data.farm.image} alt="Slide 1" style={{ objectFit:"cover", height:"100%" }} />);
                setImages(imageArray);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    useEffect(() => {
        // 세션 스토리지에서 사용자 정보 가져오기
        const storedUser = sessionStorage.getItem("user");
        console.log("user: " + storedUser);
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // JSON 문자열을 파싱하여 객체로 변환
        }
        console.log("DDDDDDD:" + user);
    }, []);

    return (
        <div className={styles.box}>
            <SwiperComponent slides={images}/>
            <IoIosArrowDropleftCircle className={styles.arrowLeft} size="30" color="#fff" onClick={() => navigate(-1)}/>
            <FaPen className={styles.correct} size="25" color="#fff"/>
            <FaTrashAlt className={styles.delete} size="25" color="#fff"/>
            {farm && (
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div>
                            <h3 className={styles.address}>{farm.locationCity} {farm.locationGu}</h3>
                            <h2 className={styles.productName}>{farm.name}</h2>
                        </div>
                        <FiShare2 size="30" style={{cursor:"pointer"}}/>
                    </div>
                    <Tabs type="farm" farmAllInfo={farmAllInfo}/>
                </div>
            )}
        </div>
    )
}
export default FarmDetails;