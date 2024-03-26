import styles from "./Product.module.css";
import SwiperComponent from "../../component/SwiperComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config";
import {useNavigate, useParams} from "react-router-dom";
import { FiShare2 } from "react-icons/fi";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FaPen } from "react-icons/fa6";
import Tabs from "../../component/Tabs";
import Button from "../../component/Button";
const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [productAllInfo, setProductAllInfo] = useState([]);
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API.PRODUCT(id), {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.product);
                console.log(res.data);

                setProduct(res.data.product);
                setReviews(res.data.reviews);
                setProductAllInfo(res.data);
                const imageArray = [];
                if (res.data.product.image1) imageArray.push(<img key="image1" src={res.data.product.image1} alt="Slide 1" style={{ objectFit:"cover", height:"100%" }} />);
                if (res.data.product.image2) imageArray.push(<img key="image2" src={res.data.product.image2} alt="Slide 2" style={{ height: "70%" }} />);
                if (res.data.product.image3) imageArray.push(<img key="image3" src={res.data.product.image3} alt="Slide 3" style={{ height: "70%" }} />);
                setImages(imageArray);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) {
            setQuantity(Math.min(Math.max(newQuantity, 0), 100));
        }
    }
    const decreaseValue = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
    }

    const increaseValue = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, 100));
    }

    const formatNumber = (value) => {
        // 숫자를 형식에 맞게 처리하여 반환 (예: 1000원 -> 1,000원)
        return new Intl.NumberFormat().format(value);
    };

    const groupPrice = (price) => {
        return price * 0.9;
    }

    return (
        <div className={styles.box}>
            <SwiperComponent slides={images}/>
            <IoIosArrowDropleftCircle className={styles.arrowLeft} size="30" color="#fff" onClick={() => navigate(-1)}/>
            <FaPen className={styles.correct} size="25" color="#fff"/>
            <FaTrashAlt className={styles.delete} size="25" color="#fff"/>
            {product && (
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div>
                            <h3 className={styles.farmName}>{product.farm && product.farm.name}</h3>
                            <h2 className={styles.productName}>{product.name}</h2>
                        </div>
                        <FiShare2 size="30"/>
                    </div>
                    <div className={styles.middle}>
                        <h2>{formatNumber(product.price)}원</h2>
                        <div className={styles.stepper}>
                            <div className={styles.stepper_button_minus} onClick={decreaseValue}></div>
                            <div className={styles.stepper_input_wrap}>
                                <input type="number" value={quantity} onChange={handleQuantityChange} readOnly/>
                            </div>
                            <div className={styles.stepper_button_plus} onClick={increaseValue}></div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.review}>
                            <FaStar size="18" color="#FFC42B"/>
                            <p className={styles.length}>({reviews.length} reviews)</p>
                        </div>
                    </div>
                    <Tabs type="product" productAllInfo={productAllInfo}/>
                </div>
            )}
            <div className={styles.under_bar}>
                {product.group ? (
                    <div className={styles.group}>
                        <Button content={["같이 주문", `${formatNumber(groupPrice(product.price))}`]} width={"30%"} color={"#FFC42B"} />
                        <Button content={["혼자 주문", `${formatNumber(product.price)}`]} color={"#94C015"} width={"70%"}/>
                    </div>
                ) : (
                    <Button content={["혼자 주문", `${formatNumber(product.price)}`]} color={"#94C015"}/>
                )}
            </div>

        </div>
    )
}

export default Product;
