import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import {useNavigate, useParams} from "react-router-dom";
import styles from "./AuctionDetail.module.css";
import SwiperComponent from "../../component/SwiperComponent";
import {FiShare2} from "react-icons/fi";
import Button from "../../component/Button";
import {IoIosArrowDropleftCircle} from "react-icons/io";

const AuctionDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    const [isDirect, setIsDirect] = useState(0);
    const [isAuction, setIsAuction] = useState(true);
    const [timeLeft, setTimeLeft] = useState({});
    const [days, setDays] = useState('00'); // days는 별도로 관리
    const navigate = useNavigate();

    const formatNumber = (value) => {
        return new Intl.NumberFormat().format(value);
    };

    useEffect(() => {
        axios.get(API.PRODUCT(id), {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.result);
                setProduct(res.data.result);

                const imageArray = res.data.result.images.map(image => (
                    <img key={image.fileId} src={image.fileUrl} alt={`Slide ${image.fileId}`} style={{ objectFit: "cover", height: "50%" }} />
                ));
                setImages(imageArray);

                if (res.data.result.shippingMethod === "DIRECT") {
                    setIsDirect(1);
                } else {
                    setIsDirect(0);
                }

                // 1초마다 남은 시간을 갱신
                const initialTimeLeft = calculateTimeLeft(res.data.result.closeCalendar);
                setTimeLeft(initialTimeLeft);
                setDays(initialTimeLeft.days); // 초기 days 설정

                // 1초마다 남은 시간을 갱신
                const timer = setInterval(() => {
                    const updatedTimeLeft = calculateTimeLeft(res.data.result.closeCalendar);
                    setTimeLeft(updatedTimeLeft);

                    // days가 바뀌었을 때만 업데이트
                    if (updatedTimeLeft.days !== days) {
                        setDays(updatedTimeLeft.days);
                    }

                    // 경매 시간이 종료되면 타이머 정지
                    if (
                        updatedTimeLeft.days === '00' &&
                        updatedTimeLeft.hours === '00' &&
                        updatedTimeLeft.minutes === '00' &&
                        updatedTimeLeft.seconds === '00'
                    ) {
                        clearInterval(timer);
                    }
                }, 1000);

                // 컴포넌트가 언마운트될 때 타이머 정리
                return () => clearInterval(timer);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, [id, days]); // days가 바뀔 때마다 타이머 체크

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

    const handleParticipateAuction = () => {
        navigate(`/shippingAddress`, { state: { isDirect, isAuction, pid:id } });
    }
    return (
        <div className={styles.box}>
            <SwiperComponent slides={images} />
            <IoIosArrowDropleftCircle className={styles.arrowLeft} size="30" color="#fff" onClick={() => navigate(-1)}/>
            {product && (
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div>
                            <h3 className={styles.farmName}>{product.farm && product.farm.name}</h3>
                            <h2 className={styles.productName}>{product.name}</h2>
                        </div>
                        <FiShare2 size="30" style={{cursor:"pointer"}}/>
                    </div>
                    <div className={styles.middle}>
                        <h2>경매시작가: {formatNumber(product.price)}원</h2>
                        <h3>{timeLeft.days}일 {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</h3>
                    </div>
                    <div className={styles.detail}>
                        <h4>{product.detail}</h4>
                    </div>
                    <div className={styles.buttonWrap}>
                        <Button content={"경매 참여하기"} onClick={handleParticipateAuction}/>
                    </div>
                </div>
            )}
        </div>
    );
}
export default AuctionDetail;