import {useCallback, useState} from "react";
import styles from "../product/RegisterProduct.module.css";
import Header from "../../component/Header";
import InputBox from "../../component/InputBox";
import Button from "../../component/Button";
import TabBar from "../../component/TabBar";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import API from "../../config";
import PopupPostCode from "../../component/PopupPostCode";

const RegisterFarm = () => {
    const navigate = useNavigate();
    const [imageSrcs, setImageSrcs] = useState([]);
    const [fileIds, setFileIds] = useState([]);
    const [farmData, setFarmData] = useState({
        name: "",
        locationCity: "",
        locationGu: "",
        locationFull: "",
        locationDetail: "",
        detail: "",
        auction:"",
        images: "",
    });

    const handleInputChange = useCallback((e) => {
        const {name, value, type, checked} = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFarmData((prevFarmData) => ({
            ...prevFarmData,
            [name]: newValue,
        }));
    }, []);

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

        if (files.length + imageSrcs.length > 3) {
            alert("사진은 최대 3개까지 선택할 수 있습니다.");
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
            setFarmData(prevFarmData => ({
                ...prevFarmData,
                images: totalFileIds
            }));
        }
    };

    const handleComplete = (data) => {
        setFarmData({
            ...farmData,
            locationCity: data.locationCity,
            locationGu: data.locationGu,
            locationFull: data.locationFull,
            locationDetail: data.locationDetail,
        });
    }

    const fieldNames = {
        name: "농장 이름",
        locationFull: "농장 전체 주소",
        locationDetail: "농장 상세 주소",
        detail: "농장 설명",
        auction: "경매 진행 여부"
    };

    const validateForm = () => {
        const requiredFields = ['name', 'locationFull', 'locationDetail', 'detail', 'auction'];
        for (const field of requiredFields) {
            if (!farmData[field]) {
                alert(`${fieldNames[field]}을(를) 입력해주세요.`);
                return false;
            }
        }
        return true;
    };

    const handleSubmitForm = useCallback(e => {
        e.preventDefault();
        console.log(farmData);
        if (!validateForm()) {
            return;
        }
        // axios.post(API.REGISTERFARM, farmData, {
        //     headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        // })
        //     .then((res) => {
        //         console.log(res);
        //         navigate(`/home`);
        //     })
        //     .catch((error) => {
        //         alert("농장 개설에 실패했습니다.");
        //         console.error(error);
        //     });
    }, [farmData, navigate]);

    return (
        <div className={styles.box}>
            <Header title={"농장 개설"} go={-1}/>
            <form className={styles.form} onSubmit={handleSubmitForm}>
                <div className={styles.content_wrapper}>
                    <h3>농장 이름</h3>
                    <InputBox type={"text"} name={"name"} value={farmData.name} placeholder={"농장 이름을 입력해주세요."} onChange={handleInputChange}/>
                </div>
                <div className={styles.content_wrapper}>
                    <div className={styles.location_title}>
                        <h3>농장 위치</h3>
                        <PopupPostCode onComplete={handleComplete} />
                    </div>
                    <div className={styles.location}>
                        <InputBox type={"text"} name={"locationCity"} value={farmData.locationCity} placeholder={"OO시/도"} readOnly={true}/>
                        <InputBox type={"text"} name={"locationGu"} value={farmData.locationGu} placeholder={"OO시/군/구"} readOnly={true}/>
                    </div>
                    <InputBox type={"text"} name={"locationFull"} value={farmData.locationFull} placeholder={"전체 주소"} readOnly={true}/>
                    <InputBox type={"text"} name={"locationDetail"} value={farmData.locationDetail} placeholder={"상세 주소"} onChange={handleInputChange}/>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>농장 설명</h3>
                    <p>농장과 관련된 내용들을 자유롭게 작성해주세요.</p>
                    <textarea name="detail" value={farmData.detail} rows="10" cols="100%" placeholder="농장에 대한 자세한 설명을 작성해주세요." onChange={handleInputChange}></textarea>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>경매를 진행하실건가요?</h3>
                    <p>경매는 상품을 등록한 시점부터 상품 등록시 설정한 경매 종료 시각까지 진행되며 <br/>
                        가격이 높은 경매건이 낙찰됩니다.
                    </p>
                    <div>
                        <InputBox type={"radio"} name={"auction"} value={"true"} onChange={handleInputChange}/><span>네</span>
                        <InputBox type={"radio"} name={"auction"} value={"false"} onChange={handleInputChange}/><span>아니오</span>
                    </div>
                </div>
                <div className={styles.content_wrapper}>
                    <h3>사진을 올려주세요 <span>(선택)</span></h3>
                    <div>
                        <label className={styles.file_label} htmlFor="chooseFile">파일 선택</label>
                        <input className={styles.file} id="chooseFile" type="file" onChange={handleFileChange} multiple/>
                        <div className={styles.image_container}>
                            {imageSrcs.map((src, index) =>(
                                <div key={index} className={styles.my_image}>
                                    <img src={src} alt={`Uploaded ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <p style={{marginTop:"20px"}}>농장과 무관한 사진을 첨부하면 노출 제한 처리될 수 있습니다.<br/>
                        사진 첨부 시 개인정보가 노출되지 않도록 유의해주세요.</p>
                </div>
                <Button content={"농장 개설"}/>
            </form>
            <TabBar/>
        </div>
    )
};

export default RegisterFarm;
