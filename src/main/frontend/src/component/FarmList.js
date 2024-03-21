import styles from "./FarmList.module.css";

const FarmList = ({ numToShow, farms }) => {
    return (
        <div>
            {farms.length === 0 && <p>개설된 농장이 없어요.</p>}
            {farms.length > 0 && (
                <table className={styles.table}>
                    <tbody>
                    {farms.slice(0, numToShow || farms.length).map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
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