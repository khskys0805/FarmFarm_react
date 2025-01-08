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
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../context/DataContext";
import axios from "axios";
import API from "../../config";

const Home = () => {
    const { productList = [], farmList = [], groupProductList = [] } = useContext(DataContext);
    const [eventSlides, setEventSlides] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API.EVENTLIST, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log(res.data.result);
                const slides = res.data.result.map(event => (
                    <img
                        src={event.image_url}
                        alt={event.title}
                        style={{ width: "100%" , cursor:"pointer"}}
                        key={event.evId}
                        onClick={() => navigate(`/event/${event.evId}`)} // 클릭 시 상세 페이지로 이동
                    />
                ));
                setEventSlides(slides);
            })
            .catch((error) => {
                console.error('에러 발생: ', error.response.data || error);
            })
    }, []);

    // const slides = [
    //     <img src={banner1} alt="Slide 1" style={{ width: "100%" }}/>,
    //     <img src={banner2} alt="Slide 2" style={{ width: "100%" }}/>,
    //     <img src={banner3} alt="Slide 3" style={{ width: "100%" }}/>,
    // ];

    const numProductsToShow = 4; // 보여줄 상품 개수를 지정
    const numFarmsToShow = 5; // 보여줄 농장 개수를 지정
    const numAuctionToShow = 1;

    return (
        <div className={styles.box}>
            <img className={styles.logo} src={logo} alt="logo"/>
            <SwiperComponent slides={eventSlides} useContainerStyle={false}/>
            <div className={styles.content}>
                <div className={styles.group}>
                    <div className={styles.link}>
                        <h2>이 상품 어때요?</h2>
                        <Link to="/productList">
                            <IoIosArrowDroprightCircle size="30" color="#94C015FF" style={{cursor:"pointer"}}/>
                        </Link>
                    </div>
                    <ProductList numToShow={numProductsToShow}/>
                </div>
                <div className={styles.group}>
                    <div className={styles.link}>
                        <h2>이 농장 어때요?</h2>
                        <Link to="/allFarm">
                            <IoIosArrowDroprightCircle size="30" color="#94C015FF" style={{cursor:"pointer"}}/>
                        </Link>
                    </div>
                    {farmList.length > 0 ? (
                        <FarmList numToShow={numFarmsToShow} farms={farmList} />
                    ) : (
                        <p style={{textAlign:"center", margin:"30px 0"}}>개설된 농장이 없어요.</p>
                    )}
                </div>
                <div className={styles.group}>
                    <div className={styles.link}>
                        <h2>이 공동구매 상품 어때요?</h2>
                        <Link to="/productList?type=group">
                            <IoIosArrowDroprightCircle size="30" color="#94C015FF" style={{cursor:"pointer"}}/>
                        </Link>
                    </div>
                    <ProductList numToShow={numProductsToShow} type="group"/>
                </div>
                <div className={styles.group}>
                    <div className={styles.link}>
                        <h2>진행 중인 경매</h2>
                        <Link to="/allAuction">
                            <IoIosArrowDroprightCircle size="30" color="#94C015FF" style={{cursor:"pointer"}}/>
                        </Link>
                    </div>
                    <AuctionList numToShow={numAuctionToShow}/>
                </div>
            </div>
            <TabBar />
        </div>
    )
}
export default Home;
