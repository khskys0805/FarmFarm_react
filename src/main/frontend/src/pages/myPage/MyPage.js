import {useEffect, useState} from "react";
import API from "../../config";
import styles from "./MyPage.module.css";
import Header from "../../component/Header";
import TabBar from "../../component/TabBar";
import {useNavigate} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import no_farm_image from "../../images/no_farm_Image.png";
import api from "../../api/api";

const MyPage = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);  // 로딩 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        api.get(API.MYPAGE, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data.result);
                setUser(res.data.result);
            })
            .catch((error) => {
                console.error('에러 발생: ', error.response.data || error);
            })
            .finally(() => setLoading(false));
    }, []);


    if (loading) {
        return (
            <div className={styles.loading}>
                <ClipLoader
                    color="#94C015"
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader" />
            </div>
        )
    }

    const navigateToEditProfile = () => {
        navigate(`/editProfile`, {state: {user:user}})
    }
    return (
        <div className={styles.box}>
            <Header title={"마이페이지"} go={`/home`}/>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.my_profile}>
                            <div className={styles.my_profile_inner}>
                                <div className={styles.image_box}>
                                    <img src={user.profileImage} alt=""/>
                                </div>
                                <span>{user.userName}</span>
                                님
                            </div>
                            <div>
                                <button
                                    className={styles.profile_edit_btn}
                                    onClick={navigateToEditProfile}
                                >
                                    프로필 관리
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.my_profile}>
                            {user.farmName ? (
                                <div className={styles.my_profile_inner}>
                                    <div className={styles.image_box}>
                                        <img src={user.farmImages && user.farmImages.length > 0 ? user.farmImages[0].fileUrl : ""} alt=""/>
                                    </div>
                                    <span>{user.farmName}</span>
                                </div>
                            ) : (
                                <div className={styles.my_profile_inner}>
                                    <div className={styles.image_box}>
                                        <img src={no_farm_image} alt=""/>
                                    </div>
                                    <span>농장이 아직 없어요</span>
                                </div>
                            )}
                            <div>
                                {user.farmName ? (
                                    <a href="/myFarm" className={styles.profile_edit_btn}>
                                        농장 관리
                                    </a>
                                ) : (
                                    <a href="/registerFarm" className={styles.profile_edit_btn}>
                                        농장 개설
                                    </a>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.row}><a href="/myOrder">주문 내역</a></td>
                    </tr>
                    <tr>
                        <td className={styles.row}><a href="/myAuction">경매 참가 내역</a></td>
                    </tr>
                    <tr>
                        <td className={styles.row}><a href="/myReview">상품 후기 내역</a></td>
                    </tr>
                    <tr>
                        <td className={styles.row}><a href="/myEnquiry">문의 내역</a></td>
                    </tr>
                    <tr>
                        <td className={styles.row}><a href="/user/logout">로그아웃</a></td>
                    </tr>
                </tbody>
            </table>
            <TabBar/>
        </div>
    )
}
export default MyPage;