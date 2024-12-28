import styles from "./FarmDetails.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import SwiperComponent from "../../component/SwiperComponent";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {FaPen} from "react-icons/fa6";
import {FaTrashAlt} from "react-icons/fa";
import {FiShare2} from "react-icons/fi";
import Tabs from "../../component/Tabs";
const FarmDetails = ({ myFarm }) => {
    const { id } = useParams();
    const [farm, setFarm] = useState([]);
    const [images, setImages] = useState([]);
    const [isMyFarm, setIsMyFarm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (myFarm) {
            axios.get(API.MYFARM, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);
                    const rslt = res.data.result;
                    setFarm(rslt);
                    setIsMyFarm(true);

                    const imageArray = [];
                    if (rslt.images && rslt.images.length > 0) {
                        rslt.images.slice(0, 3).forEach((image, index) => {
                            imageArray.push(
                                <img
                                    key={`image-${index}`}
                                    src={image.fileUrl}
                                    alt={`Slide ${index + 1}`}
                                    style={{ objectFit: "cover", height: "100%" }}
                                />
                            );
                        });
                    } else {
                        imageArray.push(<div key="no-image" style={{ backgroundColor: "#94C015", height: "100%" }} />);
                    }
                    setImages(imageArray);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
        } else {
            axios.get(API.FARM(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);
                    const rslt = res.data.result;
                    setFarm(rslt);
                    setIsMyFarm(res.data.result.isMyFarm);

                    const imageArray = [];
                    if (rslt.images && rslt.images.length > 0) {
                        rslt.images.slice(0, 3).forEach((image, index) => {
                            imageArray.push(
                                <img
                                    key={`image-${index}`}
                                    src={image.fileUrl}
                                    alt={`Slide ${index + 1}`}
                                    style={{ objectFit: "cover", height: "100%" }}
                                />
                            );
                        });
                    } else {
                        imageArray.push(<div key="no-image" style={{ backgroundColor: "#94C015", height: "100%" }} />);
                    }
                    setImages(imageArray);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
        }
    }, []);

    const handleEdit = () => {
        navigate(`/editFarm/${id}`);
    };

    const deleteFarm = () => {
        if (window.confirm("농장을 삭제하시겠습니까?")) {
            axios.delete(API.FARM(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log("전송 성공");
                    console.log(res.data.result);
                    navigate(`/farmList`);
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
                });
        }
    }

    return (
        <div className={styles.box}>
            <SwiperComponent slides={images}/>
            <IoIosArrowDropleftCircle className={styles.arrowLeft} size="30" color="#fff" onClick={() => navigate(-1)}/>
            {isMyFarm && (
                <>
                    <FaPen className={styles.correct} size="25" color="#fff" onClick={handleEdit}/>
                    <FaTrashAlt className={styles.delete} size="25" color="#fff" onClick={deleteFarm}/>
                </>
            )}
            {farm && (
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div>
                            <h3 className={styles.address}>{farm.locationCity} {farm.locationGu}</h3>
                            <h2 className={styles.productName}>{farm.name}</h2>
                        </div>
                        <FiShare2 size="30" style={{cursor:"pointer"}}/>
                    </div>
                    <Tabs type="farm" farm={farm}/>
                </div>
            )}
        </div>
    )
}
export default FarmDetails;