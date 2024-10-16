import styles from "./EnquiryAdminPage.module.css";
import {useState} from "react";

const EnquiryAdminPage = () => {
    const [data, setData] = useState([
        { inquiryNumber: 1, productName: "일반 딸기", inquirerName: "김현수", inquiryContent: "배송은 얼마나 걸리나요?", answerStatus: "답변 완료", inquiryDate: "2024-10-01" },
        { inquiryNumber: 2, productName: "신선 블루베리", inquirerName: "박지민", inquiryContent: "보관 방법이 궁금합니다.", answerStatus: "답변 대기", inquiryDate: "2024-10-02" },
        { inquiryNumber: 3, productName: "제철 사과", inquirerName: "이정호", inquiryContent: "유통기한이 어떻게 되나요?", answerStatus: "답변 완료", inquiryDate: "2024-10-03" },
        { inquiryNumber: 4, productName: "프리미엄 망고", inquirerName: "최은지", inquiryContent: "비회원도 구매 가능한가요?", answerStatus: "답변 대기", inquiryDate: "2024-10-03" },
        { inquiryNumber: 5, productName: "산딸기", inquirerName: "오민수", inquiryContent: "포장이 어떻게 되어 있나요?", answerStatus: "답변 완료", inquiryDate: "2024-10-04" },
        { inquiryNumber: 6, productName: "제주 감귤", inquirerName: "정수빈", inquiryContent: "추가 할인 가능한가요?", answerStatus: "답변 대기", inquiryDate: "2024-10-05" },
        { inquiryNumber: 7, productName: "유기농 바나나", inquirerName: "황서연", inquiryContent: "세척해서 배송되나요?", answerStatus: "답변 완료", inquiryDate: "2024-10-06" },
        { inquiryNumber: 8, productName: "무농약 배", inquirerName: "김민지", inquiryContent: "생산지는 어디인가요?", answerStatus: "답변 대기", inquiryDate: "2024-10-07" },
        { inquiryNumber: 9, productName: "샤인머스캣", inquirerName: "박상우", inquiryContent: "재입고 예정 있나요?", answerStatus: "답변 완료", inquiryDate: "2024-10-07" },
        { inquiryNumber: 10, productName: "프리미엄 체리", inquirerName: "이하영", inquiryContent: "배송비가 있나요?", answerStatus: "답변 대기", inquiryDate: "2024-10-08" },
        { inquiryNumber: 11, productName: "옥수수", inquirerName: "윤지호", inquiryContent: "묶음 배송 가능한가요?", answerStatus: "답변 완료", inquiryDate: "2024-10-08" },
        { inquiryNumber: 12, productName: "무농약 토마토", inquirerName: "서지현", inquiryContent: "환불 가능한가요?", answerStatus: "답변 대기", inquiryDate: "2024-10-09" },
        { inquiryNumber: 13, productName: "친환경 수박", inquirerName: "최수진", inquiryContent: "배송지 변경 가능한가요?", answerStatus: "답변 완료", inquiryDate: "2024-10-10" },
        { inquiryNumber: 14, productName: "국산 포도", inquirerName: "장한결", inquiryContent: "상품 하자가 있을 경우 교환 되나요?", answerStatus: "답변 대기", inquiryDate: "2024-10-10" },
        { inquiryNumber: 15, productName: "황금참외", inquirerName: "박민수", inquiryContent: "언제 출고되나요?", answerStatus: "답변 완료", inquiryDate: "2024-10-11" },
        { inquiryNumber: 16, productName: "감자", inquirerName: "이윤호", inquiryContent: "비닐 포장인가요?", answerStatus: "답변 대기", inquiryDate: "2024-10-11" },
        { inquiryNumber: 17, productName: "수입 바나나", inquirerName: "김하늘", inquiryContent: "대량 구매 시 추가 할인 있나요?", answerStatus: "답변 완료", inquiryDate: "2024-10-12" },
        { inquiryNumber: 18, productName: "오이", inquirerName: "손민정", inquiryContent: "신선도 유지 방법이 있나요?", answerStatus: "답변 대기", inquiryDate: "2024-10-12" },
        { inquiryNumber: 19, productName: "고구마", inquirerName: "이종민", inquiryContent: "크기가 어느 정도인가요?", answerStatus: "답변 완료", inquiryDate: "2024-10-13" },
        { inquiryNumber: 20, productName: "파프리카", inquirerName: "홍예진", inquiryContent: "유통기한이 얼마 남았나요?", answerStatus: "답변 대기", inquiryDate: "2024-10-13" }
    ]);

    const handleAnswer = (inquiryNumber) => {
        // 답변하기 버튼을 눌렀을 때 동작하는 함수
        console.log(`문의 ${inquiryNumber}에 대한 답변하기 버튼 클릭됨`);
    };

    return (
        <div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>문의번호</th>
                    <th>상품명</th>
                    <th>문의자 이름</th>
                    <th>문의 내용</th>
                    <th>답변 상태</th>
                    <th>문의 날짜</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.inquiryNumber}</td>
                        <td>{item.productName}</td>
                        <td>{item.inquirerName}</td>
                        <td>{item.inquiryContent}</td>
                        <td>
                            {item.answerStatus === "답변 대기" ? (
                                <button className={styles.answerBtn} onClick={() => handleAnswer(item.inquiryNumber)}>답변하기</button>
                            ) : (
                                item.answerStatus
                            )}
                        </td>
                        <td>{item.inquiryDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default EnquiryAdminPage;