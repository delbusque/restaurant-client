import styles from './ItemsList.module.css';

import AddItemForm from './AddItemForm/AddItemForm';
import StockItemInfo from './StockItem/StockItemInfo.js';
import StockItemEdit from './StockItem/StockItemEdit.js';

import { useAuthContext } from '../../hooks/useAuthContext.js';


const FormModal = ({ item, setEditInfo, setShowInfo, setShowAddItem, setDrinkIsActive, setFoodIsActive, editInfo, showInfo, showAddItem, ref, modalCloser }) => {

    const { user } = useAuthContext();

    return (
        <dialog ref={ref} className='iL-form'>
            {
                editInfo && <StockItemEdit item={item} setEditInfo={setEditInfo} setShowInfo={setShowInfo} setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive} modalCloser={modalCloser} setShowAddItem={setShowAddItem} />
            }

            {
                (user && !showInfo && !editInfo && showAddItem) && <AddItemForm ref={ref} setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive} setShowAddItem={setShowAddItem}
                    modalCloser={modalCloser} />
            }
        </dialog>
    )
}

export default FormModal;