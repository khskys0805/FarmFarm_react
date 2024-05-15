import styles from "./ProductDetails.module.css";
import SwiperComponent from "../../component/SwiperComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config";
import {useNavigate, useParams} from "react-router-dom";
import { FiShare2 } from "react-icons/fi";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import Tabs from "../../component/Tabs";
import Button from "../../component/Button";
const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [productAllInfo, setProductAllInfo] = useState([]);
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isGroupProductVisible, setIsGroupProductVisible] = useState(false);
    const [groups, setGroups] = useState([]);
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
                setGroups(res.data.groups);
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

    const handleGroupProduct = () => {
        setIsGroupProductVisible(true);
    }

    const handleCancelGroupProduct = () => {
        setIsGroupProductVisible(false);
    };

    return (
        <>
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
                            <FiShare2 size="30" style={{cursor:"pointer"}}/>
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
                            <Button content={["같이 주문", `${formatNumber(groupPrice(product.price))}원`]} width={"30%"} color={"#FFC42B"} onClick={handleGroupProduct}/>
                            <Button content={["혼자 주문", `${formatNumber(product.price)}원`]} width={"70%"}/>
                        </div>
                    ) : (
                        <Button content={["혼자 주문", `${formatNumber(product.price)}원`]}/>
                    )}
                </div>
            </div>
            <div className={styles.mask} style={{ display: isGroupProductVisible ? 'block' : 'none' }}></div>
            {isGroupProductVisible && (
                <div className={styles.layer} style={{ display: isGroupProductVisible ? 'block' : 'none' }}>
                    <form>
                        <div className={styles.title}>
                            <h3>공동구매 참여하기</h3>
                            <a href="#" onClick={handleCancelGroupProduct}>
                                <MdCancel size="25"/>
                            </a>
                        </div>
                        <div>
                            <div className={styles.group_open_btn}>
                                <Button content={"공구 개설"} width={"70px"} className="open" padding={"10px"}/>
                            </div>
                        </div>
                        {groups.length > 0 ? (
                            groups.map((group, index) => (
                                <div className={styles.group_user}>
                                    <div className={styles.group_left}>
                                        <div key={index} className={styles.user}>
                                            {group.user1 && <img src={group.user1.image} alt={`Group ${index}`} />}
                                        </div>
                                        <div key={index} className={styles.user}>
                                            {group.user2 && <img src={group.user2.image} alt={`Group ${index}`} />}
                                        </div>
                                        <p className={styles.user_nickname}>{group.user1.nickname} ({2 - group.capacity}/2)</p>
                                    </div>
                                    <div className={styles.group_right}>
                                        {group.capacity === 1 && group.isClose !== 1 && (
                                            <>
                                                <div className={styles.group_status}>
                                                    <h5>1명 남음</h5>
                                                    <h5 name="remain_time"></h5>
                                                    <input type="hidden" name="back_time" value={group.closed_at} />
                                                </div>
                                                <div className={styles.group_action}>
                                                    <button type="button">주문 참여</button>
                                                </div>
                                            </>
                                        )}
                                        {group.capacity === 0 && group.isClose !== 1 && (
                                            <p>공동구매완료</p>
                                        )}
                                        {group.isClose === 1 && (
                                            <p>공동구매종료</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.no_groups}>
                                공동 구매를 개설해보세요!
                            </div>
                        )}
                    </form>
                </div>
            )}
        </>
    )
}

export default ProductDetails;
