// Tabs.js
import styles from "./Tabs.module.css";
import {useCallback, useEffect, useState} from "react";
import Review from "./Review";
import Button from "./Button";
import EnquiryForm from "./EnquiryForm";
import ProductList from "./ProductList";
import Location from "./Location";
import API from "../config";
import Enquiry from "./Enquiry";
import AuctionList from "./AuctionList"; // Review 컴포넌트 import
import ClipLoader from "react-spinners/ClipLoader";
import api from "../api/api";

const Tabs = ({ type, farm, product }) => {
    const [tab, setTab] = useState(0);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [productInfo, setProductInfo] = useState([]);
    const [productList, setProductList] = useState([]);
    const [groupProductList, setGroupProductList] = useState([]);
    const [auctionList, setAuctionList] = useState([]);
    const [enquiryList, setEnquiryList] = useState([]);
    const [reviewList, setReviewList] = useState([]);
    const [isMyFarm, setIsMyFarm] = useState(false);
    const [loading, setLoading] = useState(true);  // 로딩 상태 추가
    console.log(product);

    const fetchEnquiry = useCallback(() => {
        api.get(API.ENQUIRY(product.pid), {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            withCredentials: true
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.result.enquiryList);
                setEnquiryList(res.data.result.enquiryList);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, [product.pid]); // product.pid가 변경될 때만 함수가 다시 생성됨

    useEffect(() => {
        setLoading(true);  // 데이터 로딩 시작 시 true로 설정
        if (type === "farm" && farm.fid) {
            api.get(API.FARMPRODUCTS(farm?.fid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);

                    setProductList(res.data.result.productList);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });

            api.get(API.FARMGROUPPRODUCTS(farm.fid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);

                    setGroupProductList(res.data.result.productList);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });

            api.get(API.FARMAUCTIONPRODUCTS(farm.fid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);

                    setAuctionList(res.data.result.productList);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });

            api.get(API.FARM(farm.fid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);
                    setIsMyFarm(res.data.result.isMyFarm);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
            setLoading(false);
        }
        else if (type === "product" && product.pid) {
            setLoading(true);
            api.get(API.PRODUCT(product?.pid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);

                    setProductInfo(res.data.result);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });

            fetchEnquiry();
            api.get(API.REVIEW(product.pid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result.reviewList);

                    setReviewList(res.data.result.reviewList);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
            setLoading(false);
        }
    }, [type, farm, product, fetchEnquiry]);

    if (loading) {
        return (
            <div style={{textAlign:"center"}}>
                <ClipLoader
                color="#94C015"
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader" />
            </div>
        )
    }

    const productTab = [
        { name: '상품 설명' },
        { name: '후기' }, // 리뷰 컴포넌트로 대체
        { name: '문의' },
    ];
    const farmTab = [
        { name: '농장 설명' },
        { name: '일반 상품' },
        { name: '공동구매' },
        { name: '경매' },
    ];
    if (isMyFarm) {
        farmTab.push({ name: '배송관리' });
        farmTab.push({ name: '문의관리' });
    }

    const tabs = type === 'product' ? productTab : farmTab;

    const selectMenuHandler = (index) => {
        setTab(index);
    };

    const showForm = () => {
        setShowEnquiryForm(!showEnquiryForm);
    }

    const closeEnquiryForm = () => {
        setShowEnquiryForm(false);
    }

    const onPopupDelivery = () => {
        const width = 1200; // 팝업 창의 너비
        const height = 600; // 팝업 창의 높이
        const left = (window.screen.width / 2) - (width / 2); // 화면 중앙에 위치시키기 위한 left 위치
        const top = (window.screen.height / 2) - (height / 2); // 화면 중앙에 위치시키기 위한 top 위치

        window.open(
            `/deliveryAdmin`, // 열고자 하는 URL
            "_blank", // 새 창으로 열기
            `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer` // 팝업 창의 옵션 설정
        );
    }

    const onPopupEnquiry = () => {
        const width = 1200; // 팝업 창의 너비
        const height = 600; // 팝업 창의 높이
        const left = (window.screen.width / 2) - (width / 2); // 화면 중앙에 위치시키기 위한 left 위치
        const top = (window.screen.height / 2) - (height / 2); // 화면 중앙에 위치시키기 위한 top 위치

        window.open(
            `/enquiryAdmin`, // 열고자 하는 URL
            "_blank", // 새 창으로 열기
            `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer` // 팝업 창의 옵션 설정
        );
    }
    return (
        <div className={styles.tab_title}>
            <ul>
                {tabs.map((el, index) => (
                    <li
                        key={index}
                        className={index === tab ? styles.submenu_focused : styles.submenu}
                        onClick={() => selectMenuHandler(index)}
                    >
                        {el.name}
                    </li>
                ))}
            </ul>
            <div className={styles.tab_content}>
                {type === 'product' && (
                    <>
                        {tab === 0 && product && <p>{productInfo.detail}</p>}
                        {tab === 1 && reviewList && (
                            <div>
                                {reviewList.map((review, index) => (
                                    <Review key={index} review={review} type={1}/>
                                ))}
                            </div>
                        )}
                        {tab === 2 && (
                            <div>
                                <Button content={"문의 작성하기"} onClick={showForm} />
                                {showEnquiryForm && <EnquiryForm pid={productInfo.pid} closeForm={closeEnquiryForm} fetchEnquiry={fetchEnquiry}/>}
                                {enquiryList && <Enquiry enquiries={enquiryList} fetchEnquiry={fetchEnquiry}/>}
                            </div>
                        )}
                    </>
                )}
                {type === 'farm' && (
                    <>
                        {tab === 0 && farm && (
                            <>
                                <Location farms={farm} type={2}/>
                                <p className={styles.detail}>{farm.detail}</p>
                            </>
                        )}
                        {tab === 1 && productList && (
                            <>
                                {isMyFarm && (
                                    <div className={styles.btn_wrapper}><a href="/registerProduct" className={styles.product_add_button}>판매 상품 등록</a></div>
                                )}
                                <ProductList products={productList}/>
                            </>
                        )}
                        {tab === 2 && groupProductList && (
                            <>
                                {isMyFarm && (
                                    <div className={styles.btn_wrapper}><a href="/registerProduct" className={styles.product_add_button}>판매 상품 등록</a></div>
                                )}
                                <ProductList products={groupProductList} type={"group"}/>
                            </>
                        )}
                        {tab === 3 && auctionList && (
                            <>
                                {isMyFarm && (
                                    <div className={styles.btn_wrapper}><a href="/registerProduct" className={styles.product_add_button}>판매 상품 등록</a></div>
                                )}
                                <AuctionList />
                            </>
                        )}
                        {tab === 4 && isMyFarm && (
                            <Button content={"배송관리 페이지 열기"} onClick={onPopupDelivery} />
                        )}
                        {tab === 5 && isMyFarm && (
                            <Button content={"문의관리 페이지 열기"} onClick={onPopupEnquiry} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Tabs;
