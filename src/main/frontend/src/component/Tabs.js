// Tabs.js
import styles from "./Tabs.module.css";
import { useEffect, useState } from "react";
import Review from "./Review";
import Button from "./Button";
import EnquiryForm from "./EnquiryForm"; // Review 컴포넌트 import


const Tabs = ({ type, productAllInfo }) => {
    const [tab, setTab] = useState(0);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);
    const product = productAllInfo.product;
    const reviews = productAllInfo.reviews;
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

    useEffect(() => {
        console.log(product);
    }, [product]);

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
                {tab === 0 && product && <p>{product.detail}</p>}
                {tab === 1 && type === 'product' && reviews && (
                    <div>
                        {reviews.map((review, index) => (
                            <Review key={index} review={review} />
                        ))}
                    </div>
                )}
                {tab === 2 && (
                    <div>
                        <Button content={"문의 작성하기"} onClick={showForm} />
                        {showEnquiryForm && <EnquiryForm />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;
