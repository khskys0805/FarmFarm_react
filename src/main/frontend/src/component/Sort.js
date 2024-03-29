import styles from "./Sort.module.css";

const Sort = () => {
    return (
        <div className={styles.sort}>
            <select className={styles.sortSelect}>
                <option value="default" selected>정렬</option>
                <option value="rating">인기순</option>
                <option value="new">신규순</option>
                <option value="old">오래된순</option>
            </select>
        </div>
    )
}
export default Sort;