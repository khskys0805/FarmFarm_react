import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import {useParams} from "react-router-dom";

const AuctionDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get(API.PRODUCT(id), {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data.result);

            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, [])
    return (
        <div>

        </div>
    )
}
export default AuctionDetail;