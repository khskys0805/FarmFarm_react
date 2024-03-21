import styles from "./ProductList.module.css";

const ProductList = ({ numToShow, products }) => {
    return (
        <div className={styles.item_container}>
            {products.length === 0 && <p>등록된 상품이 없어요.</p>}
            {products.length > 0 && (
                products.slice(0, numToShow || products.length).map((item, index) => (
                    <div className={styles.item_box} key={index}>
                        <div className={styles.item_media}>
                            <img src={item.image1} alt=""/>
                        </div>
                        <label className="bookmark-btn">
                            <input type="checkbox" checked/>
                        </label>
                        <div className={styles.item_content}>
                            <h5>{item.farm.name}</h5>
                            <h3 className={styles.title}>
                                {item.name}
                            </h3>
                            <h4 className={styles.price}>{item.price}원</h4>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProductList;
