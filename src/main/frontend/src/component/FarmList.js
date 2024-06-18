import styles from "./FarmList.module.css";
import {Link} from "react-router-dom";

const FarmList = ({ numToShow, farms }) => {
    return (
        <div>
            {farms.length === 0 && <p style={{textAlign:"center", margin:"30px 0"}}>개설된 농장이 없어요.</p>}
            {farms.length > 0 && (
                <table className={styles.table}>
                    <tbody>
                    {farms.slice(0, numToShow || farms.length).map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <Link to={`/farm/${item.fid}`}>
                                <td>{item.name}</td>
                            </Link>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
export default FarmList;