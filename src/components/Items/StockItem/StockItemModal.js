import styles from './StockItemModal.module.css';

const StockItemModal = ({ item, setOpenModal, deleteHandler }) => {

    return (
        <div className={styles['modal-background']} >
            <button className={styles['modal-close']} onClick={() => setOpenModal(false)}> X </button>
            <div className={styles['modal-container']} >
                <div className={styles['modal-body']}>
                    <h1 className={styles['modal-title']}>
                        Do you really want to delete {item.name} ?
                    </h1>
                    <p className={styles['modal-text']}>
                        You can proceed with deletion by clicking Yes or Cancel it !
                    </p>
                </div>
                <div className={styles['modal-buttons']}>
                    <button className={styles['modal-buttons__cancel']} onClick={() => setOpenModal(false)}>Cancel</button>
                    <button className={styles['modal-buttons__proceed']} onClick={deleteHandler}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default StockItemModal;