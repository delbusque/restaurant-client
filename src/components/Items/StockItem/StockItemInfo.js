import styles from './StockItemInfo.module.css'

const StockItemInfo = ({ item, setShowInfo }) => {
    return (
        <div className={styles['msform']}>
            <fieldset>
                <button className={styles['modal-close']} onClick={() => setShowInfo(false)}> x </button>
                <h2 className={styles['details-name']}>{item && item.name}</h2>
                <div className={styles['details-ingr']}>{item?.ingredients.join(', ')}</div>

                <div className={styles['details-price']}>{item && item.price.toFixed(2)} lv</div>
                <div className={styles['details-quantity']}>{item && item.quantity.toFixed(3)} {item && item.quantityType}</div>

                <div className={styles['details-family']}>{item && item.family}</div>
                <div className={styles['details-type']}>{item && item.type}</div>


            </fieldset>
        </div>
    )
}

export default StockItemInfo;