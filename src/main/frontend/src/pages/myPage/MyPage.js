import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../config";
import styles from "./MyPage.module.css";
import Header from "../../component/Header";
import TabBar from "../../component/TabBar";

const MyPage = () => {
    const [user, setUser] = useState([]);
    const [farm, setFarm] = useState([]);

    useEffect(() => {
        axios.get(API.MYPAGE, {
            headers: { authorization: localStorage.getItem("jwt") },
        })
            .then((res) => {
                console.log("전송 성공");
                console.log(res.data);
                console.log(res.data.user);
                console.log(res.data.myFarm);

                setUser(res.data.user);
                setFarm(res.data.myFarm);
            })
            .catch((error) => {
                console.error('작성한 게시물을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    return (
        <div className={styles.box}>
            <Header title={"마이페이지"} go={`/home`}/>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.my_profile}>
                            <div className={styles.my_profile_inner}>
                                <div className={styles.image_box}>
                                    <img src={user.image} alt=""/>
                                </div>
                                <span>{user.nickname}</span>
                                님
                            </div>
                            <div>
                                <a href="/user/profile" className={styles.profile_edit_btn}>
                                    프로필 관리
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.my_profile}>
                            {farm ? (
                                <div className={styles.my_profile_inner}>
                                    <div className={styles.image_box}>
                                        <img src={farm.image} alt=""/>
                                    </div>
                                    <span>{farm.name}</span>
                                </div>
                            ) : (
                                <div className={styles.my_profile_inner}>
                                    <div className={styles.image_box}>
                                        <img src={farm.image} alt=""/>
                                    </div>
                                    <span>농장이 아직 없어요</span>
                                </div>
                            )}
                            <div>
                                {farm ? (
                                    <a href="/farm/my" className={styles.profile_edit_btn}>
                                        농장 관리
                                    </a>
                                ) : (
                                    <a href="/farm" className={styles.profile_edit_btn}>
                                        농장 개설
                                    </a>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.row}><a href="/order">주문 내역</a></td>
                    </tr>
                    <tr>
                        <td className={styles.row}><a href="/order/auction">경매 참가 내역</a></td>
                    </tr>
                    <tr>
                        <td className={styles.row}><a href="/review/my">상품 후기 내역</a></td>
                    </tr>
                    <tr>
                        <td className={styles.row}><a href="/enquiry/my">문의 내역</a></td>
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