import AddItemForm from './AddItemForm/AddItemForm';
import StockItemEdit from './StockItem/StockItemEdit.js';
import StockItemModal from './StockItem/StockItemModal.js';

import { useAuthContext } from '../../hooks/useAuthContext.js';

const FormModal = ({ item, setEditInfo, setShowInfo, setDeleteInfo, setShowAddItem, setDrinkIsActive, setFoodIsActive, editInfo, showInfo, deleteInfo, deleteHandler, showAddItem, ref, modalCloser, setError }) => {

    const { user } = useAuthContext();

    return (
        <dialog ref={ref} className='iL-form'>
            {deleteInfo && <StockItemModal item={item} setOpenModal={setDeleteInfo} deleteHandler={deleteHandler} modalCloser={modalCloser} setError={setError} />}

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