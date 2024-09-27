import styles from "./SellerPage.module.css";
import {useState} from "react";
import { IoIosClose } from "react-icons/io";

const SellerPage = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const data = [
        { productName: "일반 딸기", buyerName: "김현수", quantity: 10, method: "배송", status: "배송중", trackingNumber: "89547621433", location: "서울시 노원구 덕릉로79길 23 103동 1408호 (중계동, 염광아파트)" },
        { productName: "신선 블루베리", buyerName: "박지민", quantity: 5, method: "직거래", status: "결제완료", trackingNumber: "12345678901", location: "부산시 해운대구" },
        { productName: "제철 사과", buyerName: "이정호", quantity: 3, method: "배송", status: "배송완료", trackingNumber: "98765432109", location: "서울시 강남구" },
        { productName: "프리미엄 망고", buyerName: "최은지", quantity: 7, method: "직거래", status: "결제완료", trackingNumber: "87654321098", location: "대구시 달서구" },
        { productName: "산딸기", buyerName: "오민수", quantity: 12, method: "배송", status: "배송중", trackingNumber: "76543210987", location: "광주시 북구" },
        { productName: "제주 감귤", buyerName: "정수빈", quantity: 20, method: "배송", status: "배송대기", trackingNumber: "65432109876", location: "제주시 한림읍" },
        { productName: "유기농 바나나", buyerName: "황서연", quantity: 8, method: "배송", status: "배송완료", trackingNumber: "54321098765", location: "인천시 서구" },
        { productName: "무농약 배", buyerName: "김민지", quantity: 6, method: "직거래", status: "결제대기", trackingNumber: "43210987654", location: "수원시 영통구" },
        { productName: "샤인머스캣", buyerName: "박상우", quantity: 4, method: "배송", status: "배송대기", trackingNumber: "32109876543", location: "서울시 송파구" },
        { productName: "프리미엄 체리", buyerName: "이하영", quantity: 15, method: "배송", status: "결제완료", trackingNumber: "21098765432", location: "대전시 중구" },
        { productName: "옥수수", buyerName: "윤지호", quantity: 11, method: "배송", status: "배송완료", trackingNumber: "19876543210", location: "전주시 덕진구" },
        { productName: "무농약 토마토", buyerName: "서지현", quantity: 9, method: "직거래", status: "결제완료", trackingNumber: "29876543210", location: "수원시 장안구" },
        { productName: "친환경 수박", buyerName: "최수진", quantity: 2, method: "배송", status: "배송대기", trackingNumber: "39876543210", location: "대구시 북구" },
        { productName: "국산 포도", buyerName: "장한결", quantity: 16, method: "배송", status: "배송중", trackingNumber: "49876543210", location: "청주시 상당구" },
        { productName: "황금참외", buyerName: "박민수", quantity: 3, method: "직거래", status: "결제완료", trackingNumber: "59876543210", location: "안산시 상록구" },
        { productName: "감자", buyerName: "이윤호", quantity: 13, method: "배송", status: "배송대기", trackingNumber: "69876543210", location: "춘천시 남산면" },
        { productName: "수입 바나나", buyerName: "김하늘", quantity: 5, method: "배송", status: "배송중", trackingNumber: "79876543210", location: "경주시 중부동" },
        { productName: "오이", buyerName: "손민정", quantity: 6, method: "직거래", status: "결제완료", trackingNumber: "89876543210", location: "서울시 마포구" },
        { productName: "고구마", buyerName: "이종민", quantity: 4, method: "배송", status: "배송중", trackingNumber: "99876543210", location: "광주시 서구" },
        { productName: "파프리카", buyerName: "홍예진", quantity: 10, method: "배송", status: "배송완료", trackingNumber: "11121314151", location: "인천시 연수구" }
    ];

    const showPopup = (location) => {
        setSelectedAddress(location);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>상품명</th>
                    <th>구매자 이름</th>
                    <th>상품 수량</th>
                    <th>거래 방법</th>
                    <th>거래 상태</th>
                    <th>송장번호</th>
                    <th>거주지</th>
                    <th>상태</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.productName}</td>
                        <td>{item.buyerName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.method}</td>
                        <td>{item.status}</td>
                        <td>{item.trackingNumber}</td>
                        <td>
                            <button onClick={() => showPopup(item.location)}>보기</button>
                        </td>
                        <td></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* 팝업 */}
            {popupVisible && (
                <div className={styles.popup}>
                    <h4>거주지: <span>{selectedAddress}</span></h4>
                    <div className={styles.close_popup}><IoIosClose onClick={closePopup} size="25"/></div>
                </div>
            )}
            {/* 팝업 배경 (클릭 시 팝업 닫기) */}
            {popupVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 999
                    }}
                    onClick={closePopup}
                >
                </div>
            )}
        </div>
    );
}

export default SellerPage;
