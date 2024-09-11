import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import {useParams} from "react-router-dom";
import styles from "./AuctionDetail.module.css";
import SwiperComponent from "../../component/SwiperComponent";

const AuctionDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);

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
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, [])
    return (
        <div className={styles.box}>
            <SwiperComponent slides={images} />
            {product && (
                <div className={styles.info}>
                    {/* Check if farm exists before accessing farm.name */}
                    {product.farm && <h3 className={styles.farm}>{product.farm.name}</h3>}
                    <h2 className={styles.name}>{product.name}</h2>
                    <h4>경매 시작가 {product.price}원  /  최대 수량 {product.quantity}개</h4>
                    <h4 className={styles.detail}>{product.detail}</h4>
                </div>
            )}
        </div>
    );
}
export default AuctionDetail;