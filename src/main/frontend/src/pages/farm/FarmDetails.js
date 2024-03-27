import styles from "./FarmDetails.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
const FarmDetails = () => {
    const { id } = useParams();
    const [farm, setFarm] = useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API.FARM(id), {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);
                console.log(res.data.farm);

                setFarm(res.data.farm);
                const imageArray = [];
                imageArray.push(<img key="image" src={res.data.farm.image} alt="Slide 1" style={{ objectFit:"cover", height:"100%" }} />);
                setImages(imageArray);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    return (
        <></>
    )
}
export default FarmDetails;