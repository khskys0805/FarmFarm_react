import styles from "./RegisterProduct.module.css";
import Header from "../../component/Header";
import InputBox from "../../component/InputBox";
import Button from "../../component/Button";
import TabBar from "../../component/TabBar";
import {useCallback, useState} from "react";
import axios from "axios";
import API from "../../config";
import {useNavigate} from "react-router-dom";

const RegisterProduct = () => {
    const navigate = useNavigate();
    const [imageSrcs, setImageSrcs] = useState([]);
    const [productData, setProductData] = useState({
        auction:false,
        auction_quantity:"",
        category:"1",
        closeCalendar:"",
        date:"",
        detail:"",
        direct:"",
        direct_location:"",
        group:false,
        image1:"",
        image2:"",
        image3:"",
        low_price:"",
        minute:"",
        name:"",
        open_status:0,
        price:"",
        productCategory:"",
        quantity:"",
        rating:"",
        sales:"",
        type:0
    });
    const [showAuctionFields, setShowAuctionFields] = useState(false);
    const selectList = [
        { value: 1, name: "과일" },
        { value: 2, name: "채소" },
        { value: 3, name: "기타" },
    ];

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImageUrls = files.map(file => URL.createObjectURL(file));
        const totalImageUrls = [...imageSrcs, ...newImageUrls].slice(0, 3);
        setImageSrcs(totalImageUrls);
        setProductData(prevProductData => ({
            ...prevProductData,
            image1: totalImageUrls[0] || "",
            image2: totalImageUrls[1] || "",
            image3: totalImageUrls[2] || ""
        }));
    };

    const handleInputChange = useCallback((e) => {
        const {name, value} = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    }, [productData]);

    const handleRadioChange = (e, fieldName) => {
        const value = e.target.value;

        setProductData(prevProductData => {
            const newProductData = {
                ...prevProductData,
                [fieldName]: value
            };

            if (fieldName === "type") {
                const isAuction = value === "3";
                setShowAuctionFields(isAuction);
                newProductData.auction = isAuction;
            }

            return newProductData;
        });
    };



    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(productData);
        axios.post(API.REGISTERPRODUCT, productData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);
                navigate(`/product/${res.data.id}`);
            })
            .catch((error) => {
                console.error('상품 등록 중 오류 발생: ', error);
            });
    }

    return (
        <div className={styles.box}>
            <Header title={"상품 등록"} go={-1}/>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <div className={styles.content_wrapper}>
                    <h3>상품 유형</h3>
                    <p>상품 유형을 선택해주세요.</p>
                    <div>
                        <InputBox type={"radio"} name={"type"} value={1} onChange={(e) => handleRadioChange(e, "type")} checked={productData.type === 1}/><span>일반 상품</span>
                        <InputBox type={"radio"} name={"type"} value={2} onChange={(e) => handleRadioChange(e, "type")} checked={productData.type === 2}/><span>공동 구매</span>
                        <InputBox type={"radio"} name={"type"} value={3} onChange={(e) => handleRadioChange(e, "type")} checked={productData.type === 3}/><span>경매 상품</span>
                    </div>
                </div>
                {showAuctionFields && (
                    <>
                        <div className={styles.content_wrapper}>
                            <h3>경매 종료 날짜를 선택해주세요.</h3>
                            <InputBox type={"date"} name={"date"} value={productData.date} onChange={handleInputChange}/>
                        </div>
                        <div className={styles.content_wrapper}>
                            <h3>경매 종료 시각을 입력해주세요.</h3>
                            <InputBox type={"text"} name={"hour"} value={productData.hour} placeholder={"0부터 23까지 선택"} onChange={handleInputChange}/>
                        </div>
                        <div className={styles.content_wrapper}>
                            <h3>경매 종료 분을 입력해주세요.</h3>
                            <InputBox type={"text"} name={"minute"} value={productData.minute} placeholder={"0부터 59까지 선택"} onChange={handleInputChange}/>
                        </div>
                    </>
                )}
                <div className={styles.content_wrapper}>
                    <h3>상품 이름</h3>
                    <InputBox type={"text"} name={"name"} value={productData.name} placeholder={"상품 이름을 입력해주세요."} onChange={handleInputChange}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>상품 카테고리</h3>
                    <select name={"category"} onChange={handleInputChange} value={productData.category}>
                        {selectList.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>상품 수량</h3>
                    <InputBox type={"text"} name={"quantity"} value={productData.quantity} placeholder={"상품 수량을 입력해주세요."} onChange={handleInputChange}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>상품 설명</h3>
                    <p>상품과 관련된 내용들을 자유롭게 작성해주세요.</p>
                    <textarea name="detail" value={productData.detail} rows="10" cols="100%" placeholder="상품에 대한 자세한 설명을 작성해주세요." onChange={handleInputChange}></textarea>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>상품 가격</h3>
                    <p>판매하시는 상품의 가격을 입력해주세요.</p>
                    <InputBox type={"text"} name={"price"} value={productData.price} placeholder={"상품 가격을 입력해주세요."} onChange={handleInputChange}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>거래 방법</h3>
                    <p>상품을 거래할 방법을 선택해주세요.</p>
                    <div>
                        <InputBox type={"radio"} name={"direct"} value={1} onChange={(e) => handleRadioChange(e, "direct")} checked/><span>직거래</span>
                        <InputBox type={"radio"} name={"direct"} value={2} onChange={(e) => handleRadioChange(e, "direct")}/><span>배송</span>
                    </div>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>사진을 올려주세요 <span>(선택)</span></h3>
                    <div>
                        <label className={styles.file_label} htmlFor="chooseFile">파일 선택</label>
                        <input className={styles.file} id="chooseFile" type="file" onChange={handleFileChange}/>
                        <div className={styles.image_container}>
                            {imageSrcs.map((src, index) =>(
                                <div key={index} className={styles.my_image}>
                                    <img src={src} alt={`Uploaded ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <p style={{marginTop:"20px"}}>상품과 무관한 사진을 첨부하면 노출 제한 처리될 수 있습니다.<br/>
                        사진 첨부 시 개인정보가 노출되지 않도록 유의해주세요.</p>
                </div>
                <Button content={"상품 등록"} onClick={handleFormSubmit}/>
            </form>
            <TabBar/>
        </div>
    );
};

export default RegisterProduct;
