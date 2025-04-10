import styles from './StockItem.module.css'
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useState, useContext } from 'react';
import ItemsContext from '../../../contexts/ItemsContext';
import { baseUrl } from '../../../config';

const StockItem = ({ item, modalHandler, editHandler, deleteHandler, isInactive, onStockClick }) => {
    const [showStockInput, setShowStockInput] = useState(false);
    const [stockValue, setStockValue] = useState('');
    const { user } = useAuthContext();

    const handleEdit = () => {
        modalHandler()
        editHandler(item)
    }
    const handleDelete = () => {
        modalHandler()
        deleteHandler(item)
    }

    const handleStockClick = () => {
        setShowStockInput(prev => !prev);
        setStockValue('');
        onStockClick();
    }

    const { items, setItems } = useContext(ItemsContext);

    const handleStockSubmit = async () => {
        const stockNum = parseInt(stockValue);
        if (isNaN(stockNum) || stockNum < 0) {
            return;
        }

        const newStock = (item.stock || 0) + stockNum;

        try {
            const response = await fetch(`${baseUrl}/items/${item._id}/stock`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ stock: newStock })
            });

            if (!response.ok) {
                throw new Error('Failed to update stock');
            }

            // Update item in local storage
            const updatedItems = items.map(i => {
                if (i._id === item._id) {
                    return {
                        ...i,
                        stock: newStock
                    };
                }
                return i;
            });

            // Update local state
            setItems(updatedItems);
            window.localStorage.setItem('items', JSON.stringify(updatedItems));

            // Close input
            setShowStockInput(false);
            setStockValue('');
            onStockClick(); // Clear active item
        } catch (error) {
            console.error('Error updating stock:', error);
            // You might want to show an error message to the user here
        }
    }

    return (
        <>
            <div className={`${styles['stock-item']} ${isInactive ? styles['inactive'] : ''}`}>
                <div className={item.stock < 5 ? styles['stock-item__nonStock'] : styles['stock-item__inStock']}>{item.stock}</div>
                <div className={styles['stock-item__name']}>{item.name}</div>
                <div className={styles['stock-item__quantity']}>{item.quantity < 1000 ? item.quantity : item.quantity / 1000}
                    <span className={styles['stock-item__quantityType']}>{item.quantityType}</span>
                </div>
                <div className={styles['stock-item__price']}>{item.price.toFixed(2)}
                    <span className={user && user.role === 1984 ? styles['lv'] : styles['']}> лв.</span>
                </div>

                {(user && user.role === 1984) &&
                    <>
                        <div className={styles['stock-item__stock-container']}>
                            <button className={styles['stock-item__stock']} onClick={handleStockClick}>
                                <i className="fa-solid fa-layer-group"></i>
                            </button>
                            {showStockInput && (
                                <div className={styles['stock-item__stock-input-container']}>
                                    <input
                                        type="number"
                                        value={stockValue}
                                        onChange={(e) => setStockValue(e.target.value)}
                                        className={styles['stock-item__stock-input']}
                                        placeholder="стока +"
                                        onKeyDown={(e) => e.key === 'Enter' && handleStockSubmit()} 
                                    />
                                    <div className={styles['stock-item__stock-buttons']}>
                                        <button 
                                            className={styles['stock-item__stock-submit']}
                                            onClick={handleStockSubmit}
                                        >
                                            <i className="fa-solid fa-check"></i>
                                        </button>
                                        <button 
                                            className={styles['stock-item__stock-cancel']}
                                            onClick={() => {
                                            setShowStockInput(false);
                                            onStockClick(); // Clear active item
                                        }}
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className={styles['stock-item__edit']} onClick={handleEdit}>
                            <i className="fa-solid fa-marker marker"></i>
                        </button>
                        <button className={styles['stock-item__delete']} onClick={handleDelete}>
                            <i className="fa-solid fa-trash-arrow-up trash"></i>
                        </button>
                    </>}
            </div>
        </>
    )
}

export default StockItem;