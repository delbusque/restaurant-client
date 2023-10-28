import styles from './StockItemEdit.module.css'
import { useState, useContext, useEffect } from 'react';
import ItemsContext from '../../../contexts/ItemsContext';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { baseUrl } from '../../../config';


const StockItemEdit = ({ item, setEditInfo, setShowInfo, setDrinkIsActive, setFoodIsActive }) => {
    const { items, setItems } = useContext(ItemsContext);
    const { user } = useAuthContext();

    const [inputName, setInputName] = useState('');
    const [family, setFamily] = useState('');
    const [type, setType] = useState('');
    const [inputIngredients, setInputIngredients] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const [negZero, setNegZero] = useState([]);
    const [error, setError] = useState(null);

    const typeHandler = (e) => {
        setType(e.target.value);
    }

    useEffect(() => {
        setInputName(item.name);
        setPrice(item.price);
        setQuantity(item.quantity);
        setInputIngredients(item.ingredients?.join(', '))
        setFamily(item.family)
        setType(item.type)
    }, [item])

    const editItemHandler = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You are not authorized to add menu items !');
            return;
        }

        let name = inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase();
        let quantityType;

        if (family === 'drinks') {
            quantityType = quantity < 1000 ? 'мл' : 'л';
        } else if (family === 'food') {
            quantityType = quantity < 1000 ? 'гр' : 'кг';
        }

        let ingredients = inputIngredients?.split(/[,./';]/).map(i => (i.trim())).filter(i => i)
        const editedItem = { name, family, ingredients, price, type, quantity, quantityType, _id: item._id }

        const response = await fetch(`${baseUrl}/items/edit/${item._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(editedItem)
        })

        const result = await response.json();

        if (!response.ok && result.emptyFields) {
            setError(result.error);
            setEmptyFields(result.emptyFields);
        }

        if (!response.ok) {
            setError(result.error);
            setNegZero(result.negZero);
        }

        if (response.ok) {
            let oldItems = items.filter(i => i._id !== result._id);
            oldItems.push(result);

            window.localStorage.setItem('items', JSON.stringify(oldItems));
            setItems(JSON.parse(window.localStorage.getItem('items')));

            setEditInfo(false);
            setShowInfo(false);
            setError(null);
            setInputName('');
            setFamily('');
            setType('');
            setInputIngredients('')
            setPrice('');
            setQuantity('');
            setEmptyFields([]);
            setNegZero([]);
            if (editedItem.family === 'drinks') {
                setDrinkIsActive(true);
                setFoodIsActive(false);
            } else if (editedItem.family === 'food') {
                setDrinkIsActive(false);
                setFoodIsActive(true);
            }
        }
    }

    return (
        <>
            <form className={styles['msform']} onSubmit={editItemHandler}>
                <fieldset>
                    <button className={styles['modal-close']} onClick={() => setEditInfo(false)}> x </button>
                    <h2 className={styles['fs-title']}>{item.name}</h2>

                    <div className={styles['label-input']}>
                        <label className={styles["label"]}>Име</label>
                        <input className={emptyFields.includes('name') ? styles['input-error'] : ''}
                            type="text" name="name"
                            onChange={(e) => {
                                setInputName(e.target.value);
                                setEmptyFields(old => old.filter(f => f !== 'name'));
                            }}
                            value={inputName}
                        />
                    </div>
                    <select
                        value={family}
                        className={emptyFields.includes('family') ? styles['input-error'] : ''}
                        onChange={(e) => {
                            setFamily(e.target.value)
                            setType('');
                            setEmptyFields(old => old.filter(f => f !== 'family'));
                        }}>
                        <option selected disabled>Избери тук :</option>
                        <option value='drinks'>Напитки</option>
                        <option value='food'>Хапване</option>
                    </select>

                    {family === 'drinks' &&
                        <select
                            value={type}
                            onChange={(e) => {
                                typeHandler(e);
                                setEmptyFields(old => old.filter(f => f !== 'type'));
                            }}
                            className={emptyFields.includes('type') ? styles['input-error'] : ''}>
                            <option selected disabled>Избери от напитки :</option>
                            <option value='Топли'>Топли</option>
                            <option value='Студени'>Студени</option>
                            <option value='Бира'>Бира</option>
                            <option value='Водка'>Водка</option>
                            <option value='Уиски'>Уиски</option>
                            <option value='Ракия'>Ракия</option>
                            <option value='Други'>Други</option>
                        </select>}

                    {family === 'food' &&
                        <select
                            value={type}
                            onChange={(e) => {
                                typeHandler(e);
                                setEmptyFields(old => old.filter(f => f !== 'type'));
                            }}
                            className={emptyFields.includes('type') ? styles['input-error'] : ''}>
                            <option selected disabled>Избери от хапване :</option>
                            <option value='Топла'>Топла</option>
                            <option value='Салати'>Салати</option>
                            <option value='Скара'>Скара</option>
                            <option value='Пици'>Пици</option>
                            <option value='Ядки'>Ядки</option>
                            <option value='Други'>Други</option>
                        </select>}

                    <div className={styles['label-input']}>
                        <label className={styles["label"]}>Продукти / Състав</label>
                        <textarea name="inputIngredients"
                            // className={(emptyFields?.includes('inputIngredients') || negZero?.includes('inputIngredients')) ? styles['input-error'] : ''}
                            onChange={(e) => setInputIngredients(e.target.value)}
                            value={inputIngredients}
                        />
                    </div>

                    <div className={styles['label-input']}>
                        <label className={styles["label"]}>Цена</label>
                        <input type="number" name="price"
                            className={(emptyFields.includes('price') || negZero.includes('price')) ? styles['input-error'] : ''}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                setEmptyFields(old => old.filter(f => f !== 'price'));
                                setNegZero(old => old.filter(f => f !== 'price'));
                            }}
                            value={price}
                        />
                    </div>

                    <div className={styles['label-input']}>
                        <label className={styles["label"]}>Количество</label>
                        <input type="number" name="quantity"
                            className={(emptyFields.includes('quantity') || negZero.includes('quantity')) ? styles['input-error'] : ''}
                            onChange={(e) => {
                                setQuantity(e.target.value);
                                setEmptyFields(old => old.filter(f => f !== 'quantity'));
                                setNegZero(old => old.filter(f => f !== 'quantity'));
                            }}
                            value={quantity}
                        />
                    </div>

                    <button className={styles['action-button']}>Промени</button>

                </fieldset>
            </form>
            {error && <div className={styles['error']}>{error}</div>}

        </>
    )
}

export default StockItemEdit;