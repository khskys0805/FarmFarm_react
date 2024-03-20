import {useEffect, useState} from "react";
import axios from "axios";
import API from "../config";
import styles from "./FarmList.module.css";

const FarmList = ({ numToShow }) => {
    const [farms, setFarms] = useState([]);

    useEffect(() => {
        axios.get(API.ALLFARM, {
            headers: { authorization: localStorage.getItem("jwt") },
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
    return (
        <div>
            {farms.length === 0 && <p>개설된 농장이 없어요.</p>}
            {farms.length > 0 && (
                <table className={styles.table}>
                    <tbody>
                    {farms.slice(0, numToShow || farms.length).map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            <td><a href={`/farm/${item.FId}`}>{item.name}</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
export default FarmList;