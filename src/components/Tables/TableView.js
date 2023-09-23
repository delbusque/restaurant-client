import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import ItemsContext from '../../contexts/ItemsContext.js';

import TableCard from './TableCard.js';
import FamilyButton from '../Buttons/FamilyButton.js';
import ItemLine from './ItemLine.js';
import TypeButton from '../Buttons/TypeButton.js';

import familiesAndTypes from '../../services/familiesAndTypes.js';

const TableView = ({ tables, setTables }) => {

    const [drinkIsActive, setDrinkIsActive] = useState(true);
    const [foodIsActive, setFoodIsActive] = useState(false);
    const [typeIsActive, setTypeIsActive] = useState(false);

    const [byType, setByType] = useState('');

    const { items } = useContext(ItemsContext);
    const { number } = useParams();

    let table;

    if (tables) {
        table = tables.find(t => t.number === number);
    }

    const { families, drinkTypes, foodTypes } = familiesAndTypes(items);
    drinkTypes.sort((a, b) => a.localeCompare(b));
    foodTypes.sort((a, b) => a.localeCompare(b));


    const addItemHandler = (item) => {
        table.opened = true;

        if (!table.paid) {

            let alreadyItem = table.orders.find((order, i) => {
                if (order.name === item.name) {
                    return order;
                }
            })

            if (!alreadyItem) {
                alreadyItem = {
                    ...item,
                    count: 1,
                    sent: 0
                }
                table.orders.unshift(alreadyItem);
                setTables(oldState => [...oldState], table);

            } else {
                table.orders.find((order, i) => {
                    if (order._id === alreadyItem._id) {
                        table.orders[i].count++;
                        setTables(oldState => [...oldState], table);
                    }
                })
            }
        }
    }

    const deleteItemHandler = (item) => {

        if (!table.paid) {
            let index;
            let alreadyItem = table.orders.find((order, i) => {
                if (order.name === item.name) {
                    index = i;
                    return order;
                }
            })

            if (alreadyItem.count === 1) {
                table.orders.splice(index, 1);
                setTables(oldState => [...oldState], table);
            }

            table.orders.find((order, i) => {
                if (order._id === alreadyItem._id) {
                    table.orders[i].count--;
                    setTables(oldState => [...oldState], table);
                }
            })
        }
    }

    return (
        < div className='table-card' >
            {
                table ?
                    <>

                        <TableCard table={table} setTables={setTables} tables={tables} addItemHandler={addItemHandler} deleteItemHandler={deleteItemHandler} />

                        <section className='family-sect'>
                            {families.length > 0 &&
                                families.sort((a, b) => a.localeCompare(b)).map(f => <FamilyButton family={f} key={f} setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive}
                                    setTypeIsActive={setTypeIsActive} />)}
                        </section>

                        {drinkIsActive && <section className='type-sect'>
                            {drinkTypes.length > 0 && drinkTypes.map(t => <TypeButton key={t} type={t}
                                drinkIsActive={drinkIsActive} setTypeIsActive={setTypeIsActive}
                                setByType={setByType} />)}
                        </section>}

                        {foodIsActive && <section className='type-sect'>
                            {foodTypes.length > 0 && foodTypes.map(t => <TypeButton key={t} type={t}
                                setTypeIsActive={setTypeIsActive} setByType={setByType} />)}

                        </section>}

                        {(!typeIsActive && drinkIsActive) &&
                            <section className='items-sect'>
                                {
                                    items && items.map(i => i.family === 'drinks' && <ItemLine key={i._id} item={i}
                                        addItemHandler={addItemHandler} />)
                                }
                            </section>}

                        {(!typeIsActive && foodIsActive) &&
                            <section className='items-sect'>
                                {
                                    items && items.map(i => i.family === 'food' && <ItemLine key={i._id} item={i}
                                        addItemHandler={addItemHandler} />)
                                }
                            </section>}
                        {typeIsActive &&
                            <section className='items-sect'>
                                {
                                    items && items.map(i => i.type === byType && <ItemLine key={i._id} item={i}
                                        addItemHandler={addItemHandler} />)
                                }
                            </section>}

                    </>
                    :
                    <div className='error'>No such table !</div>
            }
        </div >

    )
}

export default TableView;