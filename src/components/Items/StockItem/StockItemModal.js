import styles from './StockItemModal.module.css';

const StockItemModal = ({ item, setOpenModal, deleteHandler }) => {

    return (
        <div className={styles['modal-background']} >
            <button className={styles['modal-close']} onClick={() => setOpenModal(false)}> X </button>
            <div className={styles['modal-container']} >
                <div className={styles['modal-body']}>
                    <h1 className={styles['modal-title']}>
                        Наистина ли искате да изтриете {item.name} ?
                    </h1>
                    <p className={styles['modal-text']}>
                        Продължете с изтриването чрез Потвърждавам или направете Отказ !
                    </p>
                </div>
                <div className={styles['modal-buttons']}>
                    <button className={styles['modal-buttons__cancel']} onClick={() => setOpenModal(false)}>Отказ</button>
                    <button className={styles['modal-buttons__proceed']} onClick={deleteHandler}>Потвърждавам</button>
                </div>
            </div>
        </div>
    )
}

export default StockItemModal;