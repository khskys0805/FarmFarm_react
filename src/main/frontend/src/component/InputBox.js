import styles from "./InputBox.module.css";

const InputBox = ({ type = "text", name, value, placeholder, onChange, checked }) => {
    return (
        <input
            className={styles.input}
            type={type}
            name={name || ""}
            value={value || ""}
            placeholder={placeholder}
            onChange={onChange}
            checked={checked} // 수정된 부분: 불리언 값으로 설정
        />
    );
};

export default InputBox;
