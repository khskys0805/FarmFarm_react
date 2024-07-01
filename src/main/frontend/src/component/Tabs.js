// Tabs.js
import styles from "./Tabs.module.css";
import { useEffect, useState } from "react";
import Review from "./Review";
import Button from "./Button";
import EnquiryForm from "./EnquiryForm";
import ProductList from "./ProductList";
import Location from "./Location";
import axios from "axios";
import API from "../config"; // Review 컴포넌트 import

const Tabs = ({ type, farm, product }) => {
    const [tab, setTab] = useState(0);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const [productInfo, setProductInfo] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        if (type === "farm" && farm.fid) {
            axios.get(API.FARMPRODUCTS(farm.fid), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);

                    setProductList(res.data.result);
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
        }
    }, [type, farm, product]);

    const productTab = [
        { name: '상품 설명' },
        { name: '후기' }, // 리뷰 컴포넌트로 대체
        { name: '문의' },
    ];
    const farmTab = [
        { name: '농장 설명' },
        { name: '판매 상품' },
        { name: '경매' },
    ];

    const tabs = type === 'product' ? productTab : farmTab;

    const selectMenuHandler = (index) => {
        setTab(index);
    };

    const showForm = () => {
        setShowEnquiryForm(!showEnquiryForm);
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
                                {showEnquiryForm && <EnquiryForm />}
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
                    </>
                )}
            </div>
        </div>
    );
}

export default Tabs;
