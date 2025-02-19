import styles from './StockItemModal.module.css';
import { baseUrl } from '../../../config';

import { useContext } from 'react';

import { useAuthContext } from "../../../hooks/useAuthContext";
import ItemsContext from '../../../contexts/ItemsContext';

const StockItemModal = ({ item, setError, modalCloser }) => {

    const { user } = useAuthContext();
    const { items, setItems } = useContext(ItemsContext);

    const deleteHandler = async () => {

        if (!user) {
            setError('You aren`t authorized to delete this item !');
            return;
        }

        const responce = await fetch(`${baseUrl}/items/${item._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const result = await responce.json();

        if (!responce.ok) {
            setError(result.error)
        }

        if (responce.ok) {
            setItems(state => state.filter(i => i._id !== result._id))
            window.localStorage.setItem('items', JSON.stringify(items));

            modalCloser();
        }
    }

    return (
        <div className={styles['modal']}>
            <button className={styles['modal-close']} onClick={modalCloser}> X </button>
            <div className={styles['modal-container']} >
                <div className={styles['modal-body']}>
                    <h1 className={styles['modal-title']}>
                        Наистина ли искате да изтриете <strong>{item.name}</strong> ?
                    </h1>
                </div>
                <div className={styles['modal-buttons']}>
                    <button className={styles['modal-buttons__cancel']} onClick={modalCloser}>Отказ</button>
                    <button className={styles['modal-buttons__proceed']} onClick={deleteHandler}>Потвърждавам</button>
                </div>
            </div>
        </div>
    )
}

export default StockItemModal;