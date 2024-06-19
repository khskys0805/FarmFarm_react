import styles from './Home.module.css';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import TabBar from "../../component/TabBar";
import SwiperComponent from "../../component/SwiperComponent";
import banner1 from "../../images/banner/banner1.png";
import banner2 from "../../images/banner/banner2.png";
import banner3 from "../../images/banner/banner3.png";
import logo from "../../images/logo/farmfarm_logo2.png";
import ProductList from "../../component/ProductList";
import FarmList from "../../component/FarmList";
import AuctionList from "../../component/AuctionList";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";

const Home = () => {
    const slides = [
        <img src={banner1} alt="Slide 1" style={{ width: "100%" }}/>,
        <img src={banner2} alt="Slide 2" style={{ width: "100%" }}/>,
        <img src={banner3} alt="Slide 3" style={{ width: "100%" }}/>,
    ];

    const numProductsToShow = 4; // 보여줄 상품 개수를 지정
    const numFarmsToShow = 5; // 보여줄 농장 개수를 지정

    const [farms, setFarms] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(API.ALLFARM, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setFarms(res.data);
                console.log("farm:" + res.data);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    useEffect(() => {
        axios.get(API.ALLPRODUCT, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);

                setProducts(res.data);
                console.log("product:" + res.data);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);


    return (
        <div className={styles.box}>
            <img className={styles.logo} src={logo} alt="logo"/>
            <SwiperComponent slides={slides} useContainerStyle={false}/>
            <div className={styles.content}>
                <div className={styles.group}>
                    <div className={styles.link}>
                        <h2>이 상품 어때요?</h2>
                        <Link to="/product/list" state={{ products: products }}>
                            <IoIosArrowDroprightCircle size="30" color="#94C015FF" style={{cursor:"pointer"}}/>
                        </Link>
                    </div>
                    <ProductList numToShow={numProductsToShow} products={products}/>
                </div>
                <div className={styles.group}>
                    <div className={styles.link}>
                        <h2>이 농장 어때요?</h2>
                        <Link to="/farm/list" state={{ farms: farms }}>
                            <IoIosArrowDroprightCircle size="30" color="#94C015FF" style={{cursor:"pointer"}}/>
                        </Link>
                    </div>
                    <FarmList numToShow={numFarmsToShow} farms={farms}/>
                </div>
                <div className={styles.group}>
                    <div className={styles.link}>
                        <h2>진행 중인 경매</h2>
                        <Link to="/auction/list">
                            <IoIosArrowDroprightCircle size="30" color="#94C015FF" style={{cursor:"pointer"}}/>
                        </Link>
                    </div>
                    <AuctionList/>
                </div>
            </div>
            <TabBar />
        </div>
    )
}
export default Home;
