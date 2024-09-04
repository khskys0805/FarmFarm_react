import {useEffect, useState} from "react";
import axios from "axios";

const AuctionProduct = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get(API.product)
    }, [])
    return (
        <div>

        </div>
    )
}
export default AuctionProduct;