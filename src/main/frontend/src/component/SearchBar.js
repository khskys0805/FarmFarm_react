import styles from "./SearchBar.module.css";
import {useState} from "react";
import { IoSearch } from "react-icons/io5";
const SearchBar = () => {
    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value);
    }
    return (
        <div className={styles.input_wrap}>
            <input type="search" placeholder="검색어를 입력해주세요." value={search} onChange={onChange}/>
            <IoSearch fontSize="20" style={{order:"2"}}/>
        </div>
    )
}
export default SearchBar;