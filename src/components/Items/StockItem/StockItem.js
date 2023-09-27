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
                <div className={styles['stock-item__quantity']}>{item.quantity.toFixed(3)}
                    <span className={styles['stock-item__quantityType']}>{item.quantityType}</span>
                </div>
                <div className={styles['stock-item__price']}>{item.price.toFixed(2)}
                    <span className='lv'> lv.</span></div>

                {/* <button className={styles['stock-item__info']} onClick={() => infoHandler(item)}>
                    <i className="fa-solid fa-info info"></i>
                </button> */}
                {user &&
                    <>
                        <button className={styles['stock-item__edit']} onClick={() => editHandler(item)}>
                            <i className="fa-solid fa-marker marker"></i>
                        </button>
                        {window.innerWidth > 900 && <button className={styles['stock-item__delete']} onClick={() => setOpenModal(true)}>
                            <i className="fa-solid fa-trash-arrow-up trash"></i>
                        </button>}

                    </>}
            </div>

        </>
    )
}

export default StockItem;