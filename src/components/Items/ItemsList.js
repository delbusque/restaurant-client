import styles from './ItemsList.module.css';

import { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import ItemsContext from '../../contexts/ItemsContext.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';

import FamilyButton from '../Buttons/FamilyButton.js';
import TypeButton from '../Buttons/TypeButton.js';
import StockItem from './StockItem/StockItem.js';

import familiesAndTypes from "../../services/familiesAndTypes.js";

import FormModal from './FormModal.js';

const ItemsList = () => {

    const { user } = useAuthContext();

    const { items } = useContext(ItemsContext);

    const [drinkIsActive, setDrinkIsActive] = useState(true);
    const [foodIsActive, setFoodIsActive] = useState(false);
    const [typeIsActive, setTypeIsActive] = useState(false);

    const [showAddItem, setShowAddItem] = useState(false)

    const [byType, setByType] = useState('');

    const { families, drinkTypes, foodTypes } = familiesAndTypes(items);
    drinkTypes.sort((a, b) => a.localeCompare(b));
    foodTypes.sort((a, b) => a.localeCompare(b));

    const [showInfo, setShowInfo] = useState(false);
    const [editInfo, setEditInfo] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const dialog = useRef();

    const infoHandler = (item) => {
        setShowInfo(true);
        setEditInfo(false);
        setCurrentItem(item);
    }

    const editHandler = (item) => {
        setEditInfo(true);
        setShowInfo(false);
        setCurrentItem(item);
    }

    const modalHandler = () => {
        setShowAddItem(true)
        dialog.current.showModal()
    }

    const modalCloser = () => {
        setShowAddItem(false)
        setEditInfo(false);
        dialog.current.close()
    }

    useEffect(() => {
        items?.sort((a, b) => a.name.localeCompare(b.name));
    }, [])

    return (
        <>
            <FormModal item={currentItem} setEditInfo={setEditInfo} setShowInfo={setShowInfo} setShowAddItem={setShowAddItem} setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive} editInfo={editInfo} showInfo={showInfo} showAddItem={showAddItem}
                ref={dialog} modalCloser={modalCloser} />

            <div className='iL-main'>
                {(user && user.role === 1984 && !showInfo && !editInfo && !showAddItem) && <button className={styles['show-form']} onClick={modalHandler}>Добави нов артикул</button>}

                {(!typeIsActive && drinkIsActive) &&
                    <section>
                        <div className='iL-buttons-sect'>
                            <section className='iL-family-sect'>
                                {families.length > 0 &&
                                    families.sort((a, b) => a.localeCompare(b)).map(f => <FamilyButton family={f} key={f} setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive}
                                        setTypeIsActive={setTypeIsActive} />)}

                            </section>

                            {drinkIsActive && <section className='iL-type-sect'>
                                {drinkTypes.length > 0 && drinkTypes.map(t => <TypeButton key={t} type={t}
                                    drinkIsActive={drinkIsActive} setTypeIsActive={setTypeIsActive}
                                    setByType={setByType} />)}
                            </section>}



                            {foodIsActive && <section className='iL-type-sect'>
                                {foodTypes.length > 0 && foodTypes.map(t => <TypeButton key={t} type={t}
                                    setTypeIsActive={setTypeIsActive} setByType={setByType} />)}
                            </section>}
                        </div>

                        <section className='iL-items'>
                            {(!user && items.length < 1) && <div className={styles['table-error']}>Please add an item after <Link to='/login' className={styles['err-login']}> login</Link> or <Link to='/signup' className={styles['err-signup']}> sign up</Link> !</div>}

                            {(user && !items) && <div className={styles['table-error']}>Please add an item to stock !</div>}

                            {
                                items && items.map(i => i.family === 'drinks' && <StockItem key={i._id} item={i} setShowInfo={setShowInfo} modalHandler={modalHandler}
                                    setEditInfo={setEditInfo} infoHandler={infoHandler} editHandler={editHandler} />)
                            }
                        </section>
                    </section>}

                {(!typeIsActive && foodIsActive) &&
                    <section>
                        <div className='iL-buttons-sect'>
                            <section className='iL-family-sect'>
                                {families.length > 0 &&
                                    families.sort((a, b) => a.localeCompare(b)).map(f => <FamilyButton family={f} key={f} setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive}
                                        setTypeIsActive={setTypeIsActive} />)}
                            </section>

                            {drinkIsActive && <section className='iL-type-sect'>
                                {drinkTypes.length > 0 && drinkTypes.map(t => <TypeButton key={t} type={t}
                                    drinkIsActive={drinkIsActive} setTypeIsActive={setTypeIsActive}
                                    setByType={setByType} />)}
                            </section>}

                            {foodIsActive && <section className='iL-type-sect'>
                                {foodTypes.length > 0 && foodTypes.map(t => <TypeButton key={t} type={t}
                                    setTypeIsActive={setTypeIsActive} setByType={setByType} />)}

                            </section>}
                        </div>
                        <section className='iL-items'>
                            {
                                items && items.map(i => i.family === 'food' && <StockItem key={i._id} item={i} infoHandler={infoHandler} editHandler={editHandler} modalHandler={modalHandler} />)
                            }</section>
                    </section>}



                {typeIsActive &&
                    <section>
                        <div className='iL-buttons-sect'>
                            <section className='iL-family-sect'>
                                {families.length > 0 &&
                                    families.sort((a, b) => a.localeCompare(b)).map(f => <FamilyButton family={f} key={f} setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive}
                                        setTypeIsActive={setTypeIsActive} />)}
                            </section>

                            {drinkIsActive && <section className='iL-type-sect'>
                                {drinkTypes.length > 0 && drinkTypes.map(t => <TypeButton key={t} type={t}
                                    drinkIsActive={drinkIsActive} setTypeIsActive={setTypeIsActive}
                                    setByType={setByType} />)}
                            </section>}

                            {foodIsActive && <section className='iL-type-sect'>
                                {foodTypes.length > 0 && foodTypes.map(t => <TypeButton key={t} type={t}
                                    setTypeIsActive={setTypeIsActive} setByType={setByType} />)}

                            </section>}
                        </div>

                        <section className='iL-items'>
                            {
                                items && items.map(i => i.type === byType && <StockItem key={i._id} item={i} setShowInfo={setShowInfo} modalHandler={modalHandler}
                                    setEditInfo={setEditInfo}
                                    infoHandler={infoHandler} editHandler={editHandler} />)
                            }
                        </section>

                    </section>}




                {/* 
                <section id='iL-form' className='iL-form'>

                    {
                        (user && !showInfo)
                            ? <AddItemForm setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive} />
                            : <StockItemInfo item={currentItem} setShowInfo={setShowInfo} />
                    }
                    {
                        (user && !editInfo)
                            ? <StockItemEdit item={currentItem} setEditInfo={setEditInfo} />
                            : <StockItemInfo item={currentItem} setShowInfo={setShowInfo} />
                    }
                </section> */}
            </div>
        </>
    )
}

export default ItemsList;