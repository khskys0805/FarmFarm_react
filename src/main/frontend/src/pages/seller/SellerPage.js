import styles from "./SellerPage.module.css";
import {useEffect, useState} from "react";
import { IoIosClose } from "react-icons/io";
import Button from "../../component/Button";
import axios from "axios";
import API from "../../config";

const SellerPage = () => {
    const [popupDelivery, setPopupDelivery] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({
        deliveryAddress: "",
        deliveryAddressDetail: "",
        deliveryMemo: ""
    });
    const [popupOrderDetails, setPopupOrderDetails] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [shippingList, setShippingList] = useState([]);

    const shippingStatusMap = {
        READY_TO_SHIP: "배송준비",
        IN_TRANSIT: "배송중",
        DELIVERED: "배송완료",
        PAYMENT_COMPLETED: "결제완료",
        PAYMENT_PENDING: "결제대기",
        DEFAULT: "입금확인"
    };

    useEffect(() => {
        axios.get(API.SHIPPINGLIST, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log(res.data.result);
                const updatedShippingList = res.data.result.map(item => ({
                    ...item,
                    isEditing: false,
                    shippingStatus: item.shippingStatus || (item.isDelivery ? "입금확인" : "X"),
                }));
                setShippingList(updatedShippingList);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, [])

    const changeshippingstatus = (index, oid) => {
        const currentStatus = shippingList[index]?.shippingStatus;
        const invoiceNumber = shippingList[index]?.invoiceNumber;
        console.log(currentStatus);
        console.log(invoiceNumber);

        let nextStatus = "";
        if (currentStatus === "입금확인") {
            nextStatus = "READY_TO_SHIP";  // 영어로 변환
        } else if (currentStatus === "READY_TO_SHIP") {
            nextStatus = "IN_TRANSIT";  // 영어로 변환
        } else if (currentStatus === "IN_TRANSIT") {
            nextStatus = "DELIVERED";  // 영어로 변환
        } else {
            console.error("유효하지 않은 상태입니다:", currentStatus);
            return;
        }

        axios.patch(API.SHIPPINGSTATUS(oid), {
            shippingStatus:nextStatus,
            invoiceNumber:invoiceNumber,
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log(res.data.result);

                const updatedShippingList = [...shippingList];
                updatedShippingList[index] = {
                    ...updatedShippingList[index],
                    shippingStatus: res.data.result.shippingStatus,
                };
                setShippingList(updatedShippingList); // 상태 업데이트

            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error.response.data || error);
            });
    }

    const toggleEditTrackingNumber = (index) => {
        const updatedData = [...shippingList];
        updatedData[index].isEditing = !updatedData[index].isEditing;
        setShippingList(updatedData);
    };

    const updateTrackingNumber = (index, invoiceNumber) => {
        const updatedData = [...shippingList];
        updatedData[index].invoiceNumber = invoiceNumber;
        setShippingList(updatedData);
    };

    const saveTrackingNumber = (index) => {
        const updatedData = [...shippingList];
        if (updatedData[index].invoiceNumber) {
            const orderId = updatedData[index].oid;
            console.log(orderId);
            // 송장번호 저장 후 상태 전환
            changeshippingstatus(index, orderId);
        }
        updatedData[index].isEditing = false;
        setShippingList(updatedData);
    };

    const showDeliveryPopup = (address, detail, memo) => {
        setSelectedAddress({
            deliveryAddress: address,
            deliveryAddressDetail: detail,
            deliveryMemo: memo
        });
        setPopupDelivery(true);
    };

    const closeDeliveryPopup = () => {
        setPopupDelivery(false);
    };

    const showOrderDetailPopup = (orderDetails) => {
        setSelectedOrderDetails(orderDetails);
        setPopupOrderDetails(true);
    }

    const closeOrderDetailPopup = () => {
        setPopupOrderDetails(false);
    }

    const handleCheckboxChange = (index) => {
        const updatedRows = [...selectedRows];
        if (updatedRows.includes(index)) {
            updatedRows.splice(updatedRows.indexOf(index), 1);
        } else {
            updatedRows.push(index);
        }
        setSelectedRows(updatedRows);

    }

    const handleBatchUpdate = (targetStatus) => {
        selectedRows.forEach((index) => {
            const orderId = shippingList[index]?.oid;

            // 상태 전환 호출
            changeshippingstatus(index, orderId, targetStatus);
        });
        setSelectedRows([]);
    };

    return (
        <div>
            <div className={styles.button}>
                <Button content={"배송중 처리"} width={"10%"} onClick={() => handleBatchUpdate("배송중")}/>
                <Button content={"배송완료 처리"} width={"10%"} onClick={() => handleBatchUpdate("배송완료")}/>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>선택</th>
                    <th>주문 번호</th>
                    <th>상품명</th>
                    <th>구매자 이름</th>
                    <th>전화번호</th>
                    <th>상품 총 수량</th>
                    <th>총 금액</th>
                    <th>거래 방법</th>
                    <th>결제 상태</th>
                    <th>송장번호</th>
                    <th>배송정보</th>
                    <th>배송상태</th>
                </tr>
                </thead>
                <tbody>
                {shippingList.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(index)}
                                onChange={() => handleCheckboxChange(index)}
                            />
                        </td>
                        <td>{item.orderNumber}</td>
                        <td className={styles.itemName} onClick={() => showOrderDetailPopup(item.orderDetails)}>{item.itemName}</td>
                        <td>{item.deliveryName}</td>
                        <td>{item.deliveryPhone}</td>
                        <td>{item.totalQuantity}</td>
                        <td>{item.totalPrice}원</td>
                        <td>{item.isDelivery ? "배송" : "직거래"}</td>
                        <td>{item.paymentStatus === "PAYMENT_COMPLETED" ? "결제완료" : "결제대기"}</td>
                        <td>
                            {item.isEditing ? (
                                <>
                                    <input
                                        type="number"
                                        value={item.invoiceNumber}
                                        onChange={(e) => updateTrackingNumber(index, e.target.value)}
                                        placeholder="송장번호 입력"
                                        className={styles.trackingNumber}
                                    />
                                    <button onClick={() => saveTrackingNumber(index)} style={{marginLeft:"7px"}}>
                                        저장
                                    </button>
                                </>
                            ) : (
                                <>
                                    {item.invoiceNumber}
                                    {item.invoiceNumber ? (
                                        <button onClick={() => toggleEditTrackingNumber(index)}  style={{marginLeft:"7px"}}>
                                            수정
                                        </button>
                                    ) : (
                                        <button onClick={() => toggleEditTrackingNumber(index)}>
                                            입력
                                        </button>
                                    )}

                                </>
                            )}
                        </td>
                        <td>
                            <button onClick={() => showDeliveryPopup(item.deliveryAddress, item.deliveryAddressDetail, item.deliveryMemo)}>보기</button>
                        </td>
                        <td>
                            {shippingStatusMap[item.shippingStatus]}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* 팝업 */}
            {popupDelivery && (
                <div className={styles.popup}>
                    <h4>거주지: <span>{selectedAddress.deliveryAddress}</span></h4>
                    <h4><span>{selectedAddress.deliveryAddressDetail}</span></h4>
                    <h4 style={{marginTop:"20px"}}>배송 메모: <span>{selectedAddress.deliveryMemo}</span></h4>
                    <div className={styles.close_popup}><IoIosClose onClick={closeDeliveryPopup} size="25"/></div>
                </div>
            )}
            {/* 팝업 배경 (클릭 시 팝업 닫기) */}
            {popupDelivery && (
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
                    onClick={closeDeliveryPopup}
                >
                </div>
            )}

            {popupOrderDetails && selectedOrderDetails && (
                <div className={styles.popup2}>
                    <h3 style={{marginBottom:"20px"}}>주문 상세 내역</h3>
                    {selectedOrderDetails.map((detail, index) => (
                        <table key={index} className={styles.order_table}>
                            <thead>
                                <th>이미지</th>
                                <th>상품 이름</th>
                                <th>수량</th>
                                <th>가격</th>
                            </thead>
                            <tbody>
                                <td><img src={detail.images[0].fileUrl} alt="Product" className={styles.productImage} /></td>
                                <td>{detail.productName}</td>
                                <td>{detail.quantity}</td>
                                <td>{detail.price}원</td>
                            </tbody>
                        </table>
                    ))}
                    <div className={styles.close_popup}>
                        <IoIosClose onClick={closeOrderDetailPopup} size="25" />
                    </div>
                </div>
            )}
            {popupOrderDetails && (
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
                    onClick={closeOrderDetailPopup}
                >
                </div>
            )}
        </div>
    );
}

export default SellerPage;
