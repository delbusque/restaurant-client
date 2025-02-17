import styles from './ItemsList.module.css';

import AddItemForm from './AddItemForm/AddItemForm';
import StockItemInfo from './StockItem/StockItemInfo.js';
import StockItemEdit from './StockItem/StockItemEdit.js';

import { useAuthContext } from '../../hooks/useAuthContext.js';


const FormModal = ({ item, setEditInfo, setShowInfo, setShowAddItem, setDrinkIsActive, setFoodIsActive, editInfo, showInfo, showAddItem }) => {

    const { user } = useAuthContext();

    return (
        <section id='iL-form' className='iL-form'>
            {
                editInfo && <StockItemEdit item={item} setEditInfo={setEditInfo} setShowInfo={setShowInfo} setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive} />
            }



            {
                (user && !showInfo && !editInfo && showAddItem) && <AddItemForm setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive} setShowAddItem={setShowAddItem} />
            }
        </section>
    )
}

export default FormModal;