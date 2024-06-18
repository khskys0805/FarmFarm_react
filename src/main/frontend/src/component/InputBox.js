import styles from "./InputBox.module.css";

const InputBox = ({ type = "text", name, value, placeholder, onChange, readOnly = false }) => {
    return (
        <input
            className={styles.input}
            type={type}
            name={name || ""}
            value={value || ""}
            placeholder={placeholder}
            onChange={onChange}
            readOnly={readOnly}
        />
    );
};

export default InputBox;
