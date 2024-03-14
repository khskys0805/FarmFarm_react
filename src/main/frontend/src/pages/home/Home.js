import styles from './Home.module.css';
import TabBar from "../../component/TabBar";
import SwiperComponent from "../../component/SwiperComponent";
import banner1 from "../../images/banner/banner1.png";
import banner2 from "../../images/banner/banner2.png";
import banner3 from "../../images/banner/banner3.png";
import logo from "../../images/logo/farmfarm_logo2.png";
import AllProduct from "../../component/AllProduct";
import AllFarm from "../../component/AllFarm";
import AllAuction from "../../component/AllAuction";

const Home = () => {
    const slides = [
        <img src={banner1} alt="Slide 1" style={{ width: "100%" }}/>,
        <img src={banner2} alt="Slide 2" style={{ width: "100%" }}/>,
        <img src={banner3} alt="Slide 3" style={{ width: "100%" }}/>,
    ];

    const numProductsToShow = 4; // 보여줄 상품 개수를 지정
    const numFarmsToShow = 5; // 보여줄 농장 개수를 지정

    return (
        <div className={styles.box}>
            <img className={styles.logo} src={logo} alt="logo"/>
            <SwiperComponent slides={slides}/>
            <div className={styles.content}>
                <div className={styles.group}>
                    <h2>이 상품 어때요?</h2>
                    <AllProduct numToShow={numProductsToShow}/>
                </div>
                <div className={styles.group}>
                    <h2>이 농장 어때요?</h2>
                    <AllFarm numToShow={numFarmsToShow}/>
                </div>
                <div className={styles.auction}>
                    <h2>진행 중인 경매</h2>
                    <AllAuction/>
                </div>
            </div>
            <TabBar />
        </div>
    )
}
export default Home;