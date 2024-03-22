import styles from "./Product.module.css";
import SwiperComponent from "../../component/SwiperComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config";
import { useParams } from "react-router-dom";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(API.PRODUCT(id), {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setProduct(res.data);
                const imageArray = [];
                if (res.data.product.image1) imageArray.push(<img key="image1" src={res.data.product.image1} alt="Slide 1" style={{ width: "100%" }} />);
                if (res.data.product.image2) imageArray.push(<img key="image2" src={res.data.product.image2} alt="Slide 2" style={{ width: "100%" }} />);
                if (res.data.product.image3) imageArray.push(<img key="image3" src={res.data.product.image3} alt="Slide 3" style={{ width: "100%" }} />);
                setImages(imageArray);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    return (
        <div>
            <SwiperComponent slides={images} />
        </div>
    )
}

export default Product;
