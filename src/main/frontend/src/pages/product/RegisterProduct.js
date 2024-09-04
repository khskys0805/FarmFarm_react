import styles from "./RegisterProduct.module.css";
import Header from "../../component/Header";
import InputBox from "../../component/InputBox";
import Button from "../../component/Button";
import TabBar from "../../component/TabBar";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import {useNavigate, useParams} from "react-router-dom";
import { FaCircleXmark } from "react-icons/fa6";

const RegisterProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imageSrcs, setImageSrcs] = useState([]);
    const [fileIds, setFileIds] = useState([]);
    const [productData, setProductData] = useState({
        auction: false,
        auction_quantity: "",
        closeCalendar: "",
        date: "",
        detail: "",
        shippingMethod: "",
        direct_location: "",
        group: false,
        hour: "",
        images: [],
        low_price: "",
        minute: "",
        name: "",
        open_status: 0,
        price: "",
        productCategory: "1",
        quantity: "",
        rating: "",
        sales: "",
        productType: 0,
        groupProductQuantity:"",
        groupProductDiscount:""
    });
    const [showGroupFileds, setShowGroupFields] = useState(false);
    const [showAuctionFields, setShowAuctionFields] = useState(false);
    const selectList = [
        { value: "FRUIT", name: "과일" },
        { value: "VEGETABLE", name: "채소" },
        { value: "ETC", name: "기타" },
    ];
    const [isEditMode, setIsEditMode] = useState(false); // 추가: 수정 모드 상태
    const [addImages, setAddImages] = useState([]); // 추가: 추가된 이미지 파일 ID 배열
    const [deleteImages, setDeleteImages] = useState([]); // 추가: 삭제된 이미지 파일 ID 배열

    useEffect(() => {
        if (id) {
            setIsEditMode(true); // 추가: 수정 모드 활성화
            axios.get(API.PRODUCT(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    const product = res.data.result;
                    console.log(product);
                    setProductData({
                        ...product,
                        images: product.images.map(img => img.fileId),
                    });
                    setImageSrcs(product.images.map(img => img.fileUrl));
                    setFileIds(product.images.map(img => img.fileId));
                    setShowGroupFields(product.productType === "2");
                    setShowAuctionFields(product.productType === "3");
                })
                .catch((error) => {
                    console.error('상품 정보를 불러오는 중 오류 발생: ', error);
                });
        }
    }, [id]);

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("multipartFiles", file);

        try {
            const response = await axios.post("/s3/file", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            console.log("File upload response:", response.data);
            return response.data;
        } catch (error) {
            console.error("File upload error: ", error);
            return null;
        }
    };

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files);

        if (files.length + imageSrcs.length > 10) {
            alert("사진은 최대 10개까지 선택할 수 있습니다.");
            return;
        }

        const uploadedFiles = await Promise.all(files.map(file => uploadFile(file)));
        const validFiles = uploadedFiles.filter(file => file !== null);

        if (validFiles.length > 0) {
            const newImageUrls = validFiles.map(file => file.result[0].fileUrl);
            const totalImageUrls = [...imageSrcs, ...newImageUrls].slice(0, 10);
            const newFileIds = validFiles.map(file => file.result[0].fileId);
            const totalFileIds = [...fileIds, ...newFileIds].slice(0, 10);

            setImageSrcs(totalImageUrls);
            setFileIds(totalFileIds);
            setProductData(prevProductData => ({
                ...prevProductData,
                images: totalFileIds
            }));
            if (isEditMode) {
                setAddImages(prevAddImages => [...prevAddImages, ...newFileIds]); // 추가된 이미지 파일 ID 추가
            }
        }
    };

    const handleRemoveImage = (index) => {
        const newImageSrcs = [...imageSrcs];
        const newFileIds = [...fileIds];

        const removedFileId = newFileIds.splice(index, 1)[0]; // 삭제할 파일 ID 가져오기

        newImageSrcs.splice(index, 1);

        setImageSrcs(newImageSrcs);
        setFileIds(newFileIds);
        setProductData(prevProductData => ({
            ...prevProductData,
            images: newFileIds
        }));
        if (isEditMode) {
            setDeleteImages(prevDeleteImages => [...prevDeleteImages, removedFileId]); // 삭제된 이미지 파일 ID 추가
        }
    };

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
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

            if (fieldName === "productType") {
                const isAuction = value === "2";
                setShowAuctionFields(isAuction);
                newProductData.auction = isAuction;

                const isGroup = value === "1";
                setShowGroupFields(isGroup);
                newProductData.group = isGroup;
            }

            return newProductData;
        });
    };

    const fieldNames = {
        productType: "상품 유형",
        name: "상품 이름",
        quantity: "상품 수량",
        detail: "상품 설명",
        price: "상품 가격",
        shippingMethod: "거래 방법"
    };

    const validateForm = () => {
        const requiredFields = ['productType', 'name', 'quantity', 'detail', 'price', 'shippingMethod'];

        for (const field of requiredFields) {
            const value = productData[field];

            // Check for empty strings
            if (typeof value === 'string' && value.trim() === "") {
                alert(`${fieldNames[field]}을(를) 입력해주세요.`);
                return false;
            }

            // Check for non-string types (e.g., number, boolean)
            if (value === null || value === undefined || value === '') {
                alert(`${fieldNames[field]}을(를) 입력해주세요.`);
                return false;
            }
        }

        return true;
    };

    const handleSubmitForm = useCallback(e => {
        e.preventDefault();
        console.log(productData);
        if (!validateForm()) {
            return;
        }

        const formData = {
            ...productData,
            addImages: addImages, // 추가된 이미지 파일 ID 배열 추가
            deleteImages: deleteImages, // 삭제된 이미지 파일 ID 배열 추가
        };
        console.log(formData);

        if (isEditMode) {
            axios.patch(API.PRODUCT(formData.pid), formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data);
                    navigate(`/productDetail/${formData.pid}`);
                })
                .catch((error) => {
                    console.error('상품 수정 중 오류 발생: ', error);
                });
        }
        else {
            axios.post(API.REGISTERPRODUCT, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data);
                    navigate(`/productDetail/${res.data.result.pid}`);
                })
                .catch((error) => {
                    console.error('상품 등록 중 오류 발생: ', error);
                    console.error('상품 등록 중 오류 발생: ', error.response?.data);
                });
        }
    }, [productData, navigate, addImages, deleteImages]);

    return (
        <div className={styles.box}>
            <Header title={isEditMode ? "상품 수정" : "상품 등록"} go={-1}/>
            <form className={styles.form} onSubmit={handleSubmitForm}>
                <div className={styles.content_wrapper}>
                    <h3>상품 유형</h3>
                    <p>상품 유형을 선택해주세요.</p>
                    <div>
                        <input type={"radio"} name={"productType"} value={"0"} onChange={(e) => handleRadioChange(e, "productType")} checked={productData.productType === "0"} disabled={isEditMode}/><span>일반 상품</span>
                        <input type={"radio"} name={"productType"} value={"1"} onChange={(e) => handleRadioChange(e, "productType")} checked={productData.productType === "1"} disabled={isEditMode}/><span>공동 구매</span>
                        <input type={"radio"} name={"productType"} value={"2"} onChange={(e) => handleRadioChange(e, "productType")} checked={productData.productType === "2"} disabled={isEditMode}/><span>경매 상품</span>
                        {isEditMode && (
                            <input
                                type="hidden"
                                name="productType"
                                value={productData.productType}
                            />
                        )}
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
                    {/*<select name={"productCategory"} onChange={handleInputChange} value={productData.productCategory}>*/}
                    {/*    {selectList.map((item) => (*/}
                    {/*        <option value={item.value} key={item.value}>*/}
                    {/*            {item.name}*/}
                    {/*        </option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}
                    <select
                        name={"productCategory"}
                        onChange={handleInputChange}
                        value={productData.productCategory}
                        disabled={isEditMode} // editMode일 때 수정 불가능하도록 비활성화
                    >
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
                {showGroupFileds && (
                    <>
                        <div className={styles.content_wrapper}>
                            <h3>공동 구매 수량</h3>
                            <InputBox type={"text"} name={"groupProductQuantity"} value={productData.groupProductQuantity} placeholder={"한 팀이 구매해야 하는 공동구매 수량을 입력해주세요"} onChange={handleInputChange}/>
                        </div>
                        <div className={styles.content_wrapper}>
                            <h3>공동 구매 할인율</h3>
                            <InputBox type={"text"} name={"groupProductDiscount"} value={productData.groupProductDiscount} placeholder={"공동구매시 적용될 할인율을 입력해주세요."} onChange={handleInputChange}/>
                        </div>
                    </>
                )}
                <div className={styles.content_wrapper}>
                    <h3>상품 설명</h3>
                    <p>상품과 관련된 내용들을 자유롭게 작성해주세요.</p>
                    <textarea name="detail" value={productData.detail} rows="10" cols="100%" placeholder="상품에 대한 자세한 설명을 작성해주세요." onChange={handleInputChange}></textarea>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>상품 가격</h3>
                    {showAuctionFields === true ? (<p>경매 상품의 경매 시작가를 입력해주세요.</p>) : (<p>판매하시는 상품의 가격을 입력해주세요.</p>)}
                    <InputBox type={"text"} name={"price"} value={productData.price} placeholder={"상품 가격을 입력해주세요."} onChange={handleInputChange}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>거래 방법</h3>
                    <p>상품을 거래할 방법을 선택해주세요.</p>
                    <div>
                        <input
                            type="radio"
                            name="shippingMethod"
                            value="DIRECT"
                            onChange={(e) => handleRadioChange(e, "shippingMethod")}
                            checked={productData.shippingMethod === "DIRECT"}
                            disabled={isEditMode}
                        />
                        <span>직거래</span>

                        <input
                            type="radio"
                            name="shippingMethod"
                            value="DELIVERY"
                            onChange={(e) => handleRadioChange(e, "shippingMethod")}
                            checked={productData.shippingMethod === "DELIVERY"}
                            disabled={isEditMode}
                        />
                        <span>배송</span>
                        {isEditMode && (
                            <input
                                type="hidden"
                                name="shippingMethod"
                                value={productData.shippingMethod}
                            />
                        )}
                    </div>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>사진을 올려주세요 <span>(선택) (최대 10장)</span></h3>
                    <div className={styles.image_wrapper}>
                        <label className={styles.file_label} htmlFor="chooseFile">파일 선택</label>
                        <input className={styles.file} id="chooseFile" type="file" onChange={handleFileChange} multiple/>
                        <div className={styles.image_container}>
                            {imageSrcs.map((src, index) =>(
                                <div key={index} className={styles.my_image}>
                                    <img src={src} alt={`Uploaded ${index + 1}`} />
                                    <div className={styles.remove_image} onClick={() => handleRemoveImage(index)}><FaCircleXmark color={"#fff"} size={"20px"}/></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p style={{marginTop:"20px"}}>상품과 무관한 사진을 첨부하면 노출 제한 처리될 수 있습니다.<br/>
                        사진 첨부 시 개인정보가 노출되지 않도록 유의해주세요.</p>
                </div>
                <Button content={isEditMode ? "상품 수정하기" : "상품 등록하기"} />
            </form>
            <TabBar/>
        </div>
    );
};

export default RegisterProduct;