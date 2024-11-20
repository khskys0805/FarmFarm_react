import styles from "./Category.module.css";
import Header from "../../component/Header";
import { IoIosArrowForward } from "react-icons/io";
import TabBar from "../../component/TabBar";
import axios from "axios";
import API from "../../config";
import {useNavigate} from "react-router-dom";

const Category = () => {
    const navigate = useNavigate();
    const selectList = [
        { value: "1", name: "과일" },
        { value: "2", name: "채소" },
        { value: "3", name: "기타" },
    ];

    const getCategoryName = (cid) => {
        switch (cid) {
            case 0:
                return "FRUIT";
            case 1:
                return "VEGETABLE";
            case 2:
                return "ETC";
        }
    };

    const handleShowCategoryProduct = (cid) => {
        const categoryName = getCategoryName(parseInt(cid)); // 카테고리 이름 가져오기
        if (categoryName) {
            axios.get(API.CATEGORY(categoryName), {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            })
                .then((res) => {
                    console.log(res.data.result);
                    navigate('/productList', {
                        state: { productList: res.data.result.productList },
                        search: `?type=product`, // 쿼리 파라미터 추가
                    });
                })
                .catch((error) => {
                    console.error('작성한 게시물을 가져오는 중 오류 발생: ', error.response.data || error);
                });
        }
    }
    return (
        <div className={styles.box}>
            <Header title={"카테고리"} go={-1}/>
            <div>
                {selectList.map((item) => (
                    <div
                        value={item.value}
                        key={item.value}
                        className={styles.category}
                        onClick={() => handleShowCategoryProduct(item.value - 1)}
                    >
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