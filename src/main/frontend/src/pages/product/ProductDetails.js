// ProductDetails.js
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import API from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { FiShare2 } from "react-icons/fi";
import { FaStar, FaTrashAlt, FaPen } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import Tabs from "../../component/Tabs";
import Button from "../../component/Button";
import SwiperComponent from "../../component/SwiperComponent";
import styles from "./ProductDetails.module.css";
import api from "../../api/api";

const ProductDetails = () => {
    const { id } = useParams();
    const { fetchProductList } = useContext(DataContext);
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isGroup, setIsGroup] = useState(false);
    const [isDirect, setIsDirect] = useState(false);
    const [showLayer, setShowLayer] = useState(false);
    const [groups, setGroups] = useState([]);
    const [discount, setDiscount] = useState("");
    const [groupCapacity, setGroupCapacity] = useState("");
    const [groupList, setGroupList] = useState([]);
    const [closedGroups, setClosedGroups] = useState([]); // 추가: 이미 호출된 그룹 ID를 추적
    const [isMyProduct, setIsMyProduct] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(API.PRODUCT(id), {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setProduct(res.data.result);
                setIsGroup(res.data.result.productType === 1);
                setIsMyProduct(res.data.result.isMyProduct);
                if (res.data.result.productType === 1) {
                    setDiscount(res.data.result.groupProductDiscount);
                    setGroupCapacity(res.data.result.groupProductQuantity);
                }
                setIsDirect(res.data.result.direct);
                setReviews(res.data.reviews || []); // null을 빈 배열로 대체
                const imageArray = res.data.result.images.map(image => (
                    <img key={image.fileId} src={image.fileUrl} alt={`Slide ${image.fileId}`} style={{ objectFit: "cover", height: "50%" }} />
                ));
                setImages(imageArray);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, [id]);

    useEffect(() => {
        if (isGroup) {
            api.get(API.GROUPLIST(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("그룹 목록 전송 성공");
                    console.log(res.data.result.groupList);

                    const updatedGroupList = res.data.result.groupList.map(group => {
                        const remainingTime = calculateTimeLeft(group.closed_at);
                        return { ...group, remainingTime };
                    });

                    setGroupList(updatedGroupList);
                })
                .catch((error) => {
                    console.error('그룹 목록을 가져오는 중 오류 발생: ', error);
                });
        }
    }, [id, isGroup]); // id와 isGroup이 변경될 때마다 실행

    useEffect(() => {
        const checkGroupTimes = () => {
            setGroupList(prevGroupList =>
                prevGroupList.map(group => {
                    const remainingTime = calculateTimeLeft(group.closed_at);

                    // 남은 시간이 00:00:00이고, 이미 처리되지 않은 그룹만 API 호출
                    if (
                        remainingTime.hours === '00' &&
                        remainingTime.minutes === '00' &&
                        remainingTime.seconds === '00' &&
                        !closedGroups.includes(group.gid) // 이미 처리된 그룹이 아닌 경우에만
                    ) {
                        closeGroup(group.gid);  // 그룹 종료 API 호출
                        setClosedGroups(prev => [...prev, group.gid]); // 성공 시 그룹 ID 추가
                    }

                    return {
                        ...group,
                        remainingTime: remainingTime || { hours: '00', minutes: '00', seconds: '00' }
                    };
                })
            );
        };

        const intervalId = setInterval(checkGroupTimes, 1000); // 1초마다 상태를 확인

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트 될 때 interval 해제
    }, [closedGroups]); // closedGroups만 의존성으로 추가, groupList 제거


    const calculateTimeLeft = (closedAt) => {
        const difference = new Date(closedAt) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
                minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
                seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
            };
        } else {
            timeLeft = { hours: '00', minutes: '00', seconds: '00' };
        }

        return timeLeft;
    };

    const closeGroup = (gId) => {
        api.delete(API.CLOSEGROUP(gId), {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("그룹 종료 및 환불 성공", res.data);
                setClosedGroups(prev => [...prev, gId]); // 성공 시 그룹 ID 추가
            })
            .catch((error) => {
                console.error('그룹 종료 중 오류 발생: ', error);
            });
    };

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
        return new Intl.NumberFormat().format(value);
    };

    const groupPrice = (price) => {
        return price * (100 - discount) / 100;
    }

    const handleGroupProduct = () => {
        setShowLayer(true);
    }

    const handleCancelGroupProduct = () => {
        setShowLayer(false);
    };

    const handleEditClick = () => {
        navigate(`/editProduct/${product.pid}`);
    };

    const handleRemoveProduct = () => {
        if (window.confirm("상품을 삭제하시겠습니까?")) {
            api.delete(API.PRODUCT(product.pid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data);
                    fetchProductList(); // 삭제 후 상품 목록 다시 가져오기
                    navigate(`/productList`);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
        }
    }

    const handleAddToCart = () => {
        console.log("quantity" + quantity);
        api.post(API.PRODUCTTOCART(product.pid), { quantity: quantity }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);
                alert(`${quantity}개의 상품이 장바구니에 담겼습니다.`);
                navigate(`/cart`);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }

    const handleCreateGroup = (e) => {
        e.preventDefault();
        api.get(API.CREATEGROUP(product.pid), {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.result);
                console.log(isDirect);
                console.log(isGroup);
                navigate(`/shippingAddress`, { state: { isDirect, isGroup } });
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }

    const handleAttendGroup = (gid, e) => {
        e.preventDefault();
        api.get(API.ATTENDGROUP(gid), {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.result);
                console.log(isDirect);
                console.log(isGroup);
                navigate(`/shippingAddress`, { state: { isDirect, isGroup } });
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }

    if (!product) {
        return <p>상품 정보를 불러오는 중입니다...</p>;
    }

    return (
        <>
            <div className={styles.box}>
                <SwiperComponent slides={images}/>
                <IoIosArrowDropleftCircle className={styles.arrowLeft} size="30" color="#fff" onClick={() => navigate(-1)} />
                {isMyProduct && (
                    <>
                        <FaPen className={styles.correct} size="25" color="#fff" onClick={handleEditClick}/>
                        <FaTrashAlt className={styles.delete} size="25" color="#fff" onClick={handleRemoveProduct}/>
                    </>
                )}
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
                            {isGroup ? (
                                <h2>{formatNumber(groupPrice(product.price))}원 <span>{formatNumber(product.price)}원</span></h2>
                            ) : (
                                <h2>{formatNumber(product.price)}원</h2>
                            )}
                            {isGroup ? (
                                <h5>공동구매 수량: {groupCapacity}</h5>
                            ) : (
                                <div className={styles.stepper}>
                                    <div className={styles.stepper_button_minus} onClick={decreaseValue}></div>
                                    <div className={styles.stepper_input_wrap}>
                                        <input type="number" value={quantity} onChange={handleQuantityChange} readOnly/>
                                    </div>
                                    <div className={styles.stepper_button_plus} onClick={increaseValue}></div>
                                </div>
                            )}
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.review}>
                                <FaStar size="18" color="#FFC42B"/>
                            </div>
                        </div>
                        <Tabs type="product" product={product}/>
                    </div>
                )}
                <div className={styles.under_bar}>
                    {isGroup ? (
                        <Button content={"공동구매 참여하기"} color={"#FFC42B"} onClick={handleGroupProduct}/>
                    ) : (
                        <Button content={["주문하기", `${formatNumber(product.price)}원`]} onClick={handleAddToCart}/>
                    )}
                </div>
            </div>
            <div className={styles.mask} style={{ display: showLayer ? 'block' : 'none' }}></div>
            {isGroup && (
                <div className={styles.layer} style={{ display: showLayer ? 'block' : 'none' }}>
                    <form>
                        <div className={styles.title}>
                            <h3>공동구매 참여하기</h3>
                            <a href="#" onClick={handleCancelGroupProduct}>
                                <MdCancel size="25"/>
                            </a>
                        </div>
                        <div>
                            <div className={styles.group_open_btn}>
                                <Button content={"공구 개설"} width={"70px"} className="open" padding={"10px"} onClick={(e) => handleCreateGroup(e)}/>
                            </div>
                        </div>
                        {groupList.length > 0 ? (
                            groupList.map((group, index) => (
                                <div className={styles.group_user}>
                                    <div className={styles.group_left}>
                                        <div key={index} className={styles.user}>
                                            <img src={group.image} alt={`Group ${index}`} />
                                        </div>
                                        <p className={styles.user_nickname}>{group.nickname}</p>
                                    </div>
                                    <div className={styles.group_right}>
                                        {group.capacity === 1 && group.isClose !== 1 && (
                                            <>
                                                <div className={styles.group_status}>
                                                    <h5 className={styles.stock}>{group.stock}개 남음</h5>
                                                    <h5 className={styles.remain_time}>
                                                        {group.remainingTime.hours}:{group.remainingTime.minutes}:{group.remainingTime.seconds}
                                                    </h5>
                                                </div>
                                                <div className={styles.group_action}>
                                                    <Button content={"주문 참여"} color={"#FFC42BFF"} width={"70px"} padding={"10px"} onClick={(e) => handleAttendGroup(group.gid, e)}/>
                                                </div>
                                            </>
                                        )}
                                        {group.capacity === 0 && (
                                            <p>공동구매완료</p>
                                        )}
                                        {group.isClose === 1 && group.capacity === 1 && (
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
