import styles from "./Category.module.css";
import Header from "../../component/Header";
import { IoIosArrowForward } from "react-icons/io";
import TabBar from "../../component/TabBar";

const Category = () => {
    const selectList = [
        { value: "1", name: "과일" },
        { value: "2", name: "채소" },
        { value: "3", name: "기타" },
    ];
    return (
        <div className={styles.box}>
            <Header title={"카테고리"} go={-1}/>
            <div>
                {selectList.map((item) => (
                    <div value={item.value} key={item.value} className={styles.category}>
                        <a className={styles.text}>
                            <span>{item.name}</span>
                            <IoIosArrowForward />
                        </a>
                    </div>
                ))}
            </div>
            <TabBar />
        </div>
    )
}
export default Category;