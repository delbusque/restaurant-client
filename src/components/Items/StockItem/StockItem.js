import styles from './StockItem.module.css'
import { useState, useContext } from 'react';
import ItemsContext from '../../../contexts/ItemsContext';
import { useAuthContext } from '../../../hooks/useAuthContext';

const StockItem = ({ item, modalHandler, editHandler, deleteHandler }) => {

    const { user } = useAuthContext();

    const handleEdit = () => {
        modalHandler()
        editHandler(item)
    }
    const handleDelete = () => {
        modalHandler()
        deleteHandler(item)
    }

    return (
        <>
            <div className={styles['stock-item']}>

                <div className={styles['stock-item__name']}>{item.name}</div>
                <div className={styles['stock-item__quantity']}>{item.quantity < 1000 ? item.quantity : item.quantity / 1000}
                    <span className={styles['stock-item__quantityType']}>{item.quantityType}</span>
                </div>
                <div className={styles['stock-item__price']}>{item.price.toFixed(2)}
                    <span className={styles['lv']}> лв.</span></div>

                {(user && user.role === 1984) &&
                    <>
                        <button className={styles['stock-item__edit']} onClick={handleEdit}>
                            <i className="fa-solid fa-marker marker"></i>
                        </button>
                        <button className={styles['stock-item__delete']} onClick={handleDelete}><i className="fa-solid fa-trash-arrow-up trash"></i>
                        </button>

                    </>}
            </div>

        </>
    )
}

export default StockItem;