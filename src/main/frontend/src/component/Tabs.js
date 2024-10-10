// Tabs.js
import styles from "./Tabs.module.css";
import { useEffect, useState } from "react";
import Review from "./Review";
import Button from "./Button";
import EnquiryForm from "./EnquiryForm";
import ProductList from "./ProductList";
import Location from "./Location";
import axios from "axios";
import API from "../config";
import SellerPage from "../pages/seller/SellerPage";
import Enquiry from "./Enquiry"; // Review 컴포넌트 import

const Tabs = ({ type, farm, product }) => {
    const [tab, setTab] = useState(0);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [productInfo, setProductInfo] = useState([]);
    const [productList, setProductList] = useState([]);
    const [groupProductList, setGroupProductList] = useState([]);
    const [enquiryList, setEnquiryList] = useState([]);

    useEffect(() => {
        if (type === "farm" && farm.fid) {
            axios.get(API.FARMPRODUCTS(farm.fid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);

                    setProductList(res.data.result.productList);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });

            axios.get(API.FARMGROUPPRODUCTS(farm.fid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);

                    setGroupProductList(res.data.result.productList);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
        }
        else if (type === "product" && product.pid) {
            axios.get(API.PRODUCT(product.pid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);

                    setProductInfo(res.data.result);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });

            axios.get(API.ENQUIRY(product.pid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result.enquiryList);

                    setEnquiryList(res.data.result.enquiryList);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
        }
    }, [type, farm, product]);

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
        { name: '판매자 페이지 '}
    ];

    const tabs = type === 'product' ? productTab : farmTab;

    const selectMenuHandler = (index) => {
        setTab(index);
    };

    const showForm = () => {
        setShowEnquiryForm(!showEnquiryForm);
    }

    const onPopup = () => {
        const width = 1200; // 팝업 창의 너비
        const height = 600; // 팝업 창의 높이
        const left = (window.screen.width / 2) - (width / 2); // 화면 중앙에 위치시키기 위한 left 위치
        const top = (window.screen.height / 2) - (height / 2); // 화면 중앙에 위치시키기 위한 top 위치

        window.open(
            `/sellerPage`, // 열고자 하는 URL
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
                        {/*{tab === 1 && reviews && (*/}
                        {/*    <div>*/}
                        {/*        {reviews.map((review, index) => (*/}
                        {/*            <Review key={index} review={review} type={1}/>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*)}*/}
                        {tab === 2 && (
                            <div>
                                <Button content={"문의 작성하기"} onClick={showForm} />
                                {showEnquiryForm && <EnquiryForm pid={productInfo.pid}/>}
                                {enquiryList && <Enquiry enquiries={enquiryList}/>}
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
                                <div className={styles.btn_wrapper}><a href="/registerProduct" className={styles.product_add_button}>판매 상품 등록</a></div>
                                <ProductList products={productList}/>
                            </>
                        )}
                        {tab === 2 && groupProductList && (
                            <>
                                <div className={styles.btn_wrapper}><a href="/registerProduct" className={styles.product_add_button}>판매 상품 등록</a></div>
                                <ProductList products={groupProductList} type={"group"}/>
                            </>
                        )}

                        {tab === 4 && (
                            <Button content={"판매자 페이지 열기"} onClick={onPopup} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Tabs;
