import styles from "./Sort.module.css";

const Sort = ({ onSortChange, type }) => {
    const handleChange = (e) => {
        onSortChange(e.target.value);
        console.log(e.target.value);
    };
    return (
        <div className={styles.sort} onChange={handleChange} >
            <select className={styles.sortSelect} defaultValue="default">
                {type === "farm" && (
                    <>
                        <option value="default">정렬</option>
                        <option value="rating">인기순</option>
                        <option value="new">신규순</option>
                        <option value="old">오래된순</option>
                    </>
                )}
                {type === "product" && (
                    <>
                        <option value="default">정렬</option>
                        <option value="rating">인기순</option>
                        <option value="lowPrice">낮은가격순</option>
                        <option value="highPrice">높은가격순</option>
                    </>
                )}
            </select>
        </div>
    )
}
export default Sort;