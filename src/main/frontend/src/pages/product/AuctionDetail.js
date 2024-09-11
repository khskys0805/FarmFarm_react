import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import {useNavigate, useParams} from "react-router-dom";
import styles from "./AuctionDetail.module.css";
import SwiperComponent from "../../component/SwiperComponent";
import {FiShare2} from "react-icons/fi";
import {FaStar} from "react-icons/fa";
import Tabs from "../../component/Tabs";
import Button from "../../component/Button";

const AuctionDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    const [isDirect, setIsDirect] = useState(0);
    const [isAuction, setIsAuction] = useState(true);
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
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    const handleParticipateAuction = () => {
        navigate(`/shippingAddress`, { state: { isDirect, isAuction, pid:id } });
    }
    return (
        <div className={styles.box}>
            <SwiperComponent slides={images} />
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
                    </div>
                    <div className={styles.detail}>
                        <h4>{product.detail}</h4>
                    </div>
                    <div>
                        <Button content={"경매 참여하기"} onClick={handleParticipateAuction}/>
                    </div>
                </div>
            )}
        </div>
    );
}
export default AuctionDetail;