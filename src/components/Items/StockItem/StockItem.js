import styles from './StockItem.module.css'
import { useState, useContext } from 'react';
import ItemsContext from '../../../contexts/ItemsContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import StockItemModal from './StockItemModal';
import { baseUrl } from '../../../config';

const StockItem = ({ item, infoHandler, editHandler, setShowInfo, setEditInfo }) => {

    const { items, setItems } = useContext(ItemsContext);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const { user } = useAuthContext();

    const deleteHandler = async () => {

        setShowInfo(false);
        setEditInfo(false);

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
            setOpenModal(false);
        }
    }

    return (
        <>
            {openModal && <StockItemModal item={item} setOpenModal={setOpenModal} deleteHandler={deleteHandler} />}

            <div className={styles['stock-item']}>

                <div className={styles['stock-item__name']}>{item.name}</div>
                <div className={styles['stock-item__quantity']}>{item.quantity < 1000 ? item.quantity : item.quantity / 1000}
                    <span className={styles['stock-item__quantityType']}>{item.quantityType}</span>
                </div>
                <div className={styles['stock-item__price']}>{item.price.toFixed(2)}
                    <span className={styles['lv']}> лв.</span></div>

                {/* <button className={styles['stock-item__info']} onClick={() => infoHandler(item)}>
                    <i className="fa-solid fa-info info"></i>
                </button> */}
                {(user && user.role === 1984) &&
                    <>
                        <button className={styles['stock-item__edit']} onClick={() => editHandler(item)}>
                            <i className="fa-solid fa-marker marker"></i>
                        </button>
                        <button className={styles['stock-item__delete']} onClick={() => setOpenModal(true)}>
                            <i className="fa-solid fa-trash-arrow-up trash"></i>
                        </button>
                    </>}
            </div>

        </>
    )
}

export default StockItem;