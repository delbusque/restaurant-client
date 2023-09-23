import { useState } from "react";
import styles from './AddItemForm.module.css'
import { useContext } from "react";
import ItemsContext from "../../../contexts/ItemsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { baseUrl } from "../../../config";

const AddItemForm = ({ setDrinkIsActive, setFoodIsActive, setShowAddItem }) => {

    const { items, setItems } = useContext(ItemsContext);
    const { user } = useAuthContext();

    const [inputName, setInputName] = useState('');
    const [family, setFamily] = useState('');
    const [type, setType] = useState('');
    const [inputIngredients, setInputIngredients] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [negZero, setNegZero] = useState([]);

    const typeHandler = (e) => {
        setType(e.target.value);
    }

    const addNewStockItemHandler = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You are not authorized to add menu items !');
            return;
        }

        let ingredientsTemp = inputIngredients.split(',').map(i => (i.trim())).filter(i => i)
        let ingredients = ingredientsTemp.map(i => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase())

        let name = inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase();
        const newItem = { name, family, ingredients, price, type, quantity }

        const response = await fetch(`${baseUrl}/items/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newItem)
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
            setItems(oldState => [...oldState, result]);
            window.localStorage.setItem('items', JSON.stringify(items));
            setError(null);
            setInputName('');
            setFamily('');
            setType('');
            setInputIngredients('')
            setPrice('');
            setQuantity('');
            setEmptyFields([]);
            setNegZero([]);
            setShowAddItem(false)
            if (newItem.family === 'drinks') {
                setDrinkIsActive(true);
                setFoodIsActive(false);
            } else if (newItem.family === 'food') {
                setDrinkIsActive(false);
                setFoodIsActive(true);
            }
        }
    }



    return (
        <>

            <form className={styles['msform']} onSubmit={addNewStockItemHandler}>
                <fieldset>
                    <h2 className={styles['fs-title']}>Add new item</h2>

                    <div className={styles['label-input']}>
                        <label className={styles["label"]}>Name</label>
                        <input className={emptyFields.includes('name') ? styles['input-error'] : ''}
                            type="text" name="name"
                            onChange={(e) => setInputName(e.target.value)}
                            value={inputName}
                        />

                    </div>

                    <select
                        className={emptyFields.includes('family') ? styles['input-error'] : ''}
                        onChange={(e) => {
                            setFamily(e.target.value)
                            setType('');
                        }}>
                        <option selected disabled>Choose here :</option>
                        <option value='drinks'>Drinks</option>
                        <option value='food'>Food</option>
                    </select>

                    {family === 'drinks' &&
                        <select onChange={(e) => typeHandler(e)}
                            className={emptyFields.includes('type') ? styles['input-error'] : ''}>
                            <option selected disabled>Choose from drinks :</option>
                            <option value='beer'>Beer</option>
                            <option value='vodka'>Vodka</option>
                            <option value='wine'>Wine</option>
                            <option value='whiskey'>Whiskey</option>
                            <option value='gin'>Gin</option>
                            <option value='rum'>Rum</option>
                            <option value='ouzo'>Ouzo</option>
                            <option value='mastika'>Mastika</option>
                            <option value='rum'>Rum</option>
                            <option value='juice'>Juice</option>
                            <option value='fresh'>Fresh</option>
                            <option value='water'>Water</option>
                            <option value='coctails'>Coctails</option>
                            <option value='other'>Other</option>
                        </select>}

                    {family === 'food' &&
                        <select onChange={(e) => typeHandler(e)}
                            className={emptyFields.includes('type') ? styles['input-error'] : ''}>
                            <option selected disabled>Choose from food :</option>
                            <option value='salad'>Salad</option>
                            <option value='grill'>Grill</option>
                            <option value='burgers'>Burgers</option>
                            <option value='pizza'>Pizza</option>
                        </select>}


                    <div className={styles['label-input']}>
                        <label className={styles["label"]}>Ingredients</label>
                        <textarea name="inputIngredients"
                            // className={(emptyFields?.includes('inputIngredients') || negZero?.includes('inputIngredients')) ? styles['input-error'] : ''}
                            onChange={(e) => setInputIngredients(e.target.value)}
                            value={inputIngredients}
                        />
                    </div>

                    <div className={styles['label-input']}>
                        <label className={styles["label"]}>Price</label>
                        <input type="number" name="price"
                            className={(emptyFields?.includes('price') || negZero?.includes('price')) ? styles['input-error'] : ''}
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>

                    <div className={styles['label-input']}>
                        <label className={styles["label"]}>Quantity</label>
                        <input type="number" name="quantity"
                            className={(emptyFields?.includes('quantity') || negZero?.includes('quantity')) ? styles['input-error'] : ''}
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                        />
                    </div>

                    <input
                        type="submit"
                        className={styles['action-button']}
                        defaultValue="Previous"
                    />


                </fieldset>
            </form>
            {error && <div className={styles['error']}>{error}</div>}

        </>
    )
}

export default AddItemForm;