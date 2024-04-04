import styles from "./InputBox.module.css";
const InputBox = ({ type = "text", name, value, placeholder, onChange }) => {
    return (
        <input className={styles.input} type={type} name={name || ""} value={value || ""} placeholder={placeholder} onChange={onChange}/>
    )
}
export default InputBox;