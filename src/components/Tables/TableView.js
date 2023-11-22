import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ItemsContext from '../../contexts/ItemsContext.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';

import { baseUrl } from '../../config.js';
import { useQuery } from 'react-query'
import axios from 'axios';

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

    const { user } = useAuthContext()

    const [tableOwner, setTableOwner] = useState('')

    let table;

    if (tables) {
        table = tables.find(t => t.number === number);
    }

    const { families, drinkTypes, foodTypes } = familiesAndTypes(items);
    drinkTypes.sort((a, b) => a.localeCompare(b));
    foodTypes.sort((a, b) => a.localeCompare(b));

    const fetchUsers = () => axios.get(`${baseUrl}/user`)

    const { data } = useQuery('users', fetchUsers, {
        select: data => data.data,
        refetchOnWindowFocus: false,
    })

    const addItemHandler = (item) => {
        if (table.ownerId === user.id || table.ownerId === undefined) {

            table.opened = true;

            if (!table.paid) {

                let alreadyItem = table.orders.find(order => {
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

                    if (table.orders.length > 0) { table.ownerId = user.id }
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
                if (table.orders.length === 0) {
                    table.ownerId = undefined
                    setTableOwner('')
                    table.opened = false
                }
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

    useEffect(() => {
        const owner = data?.find(user => user._id === table?.ownerId)
        setTableOwner(owner)
    }, [data, table.ownerId])

    return (
        < div className='table-card' >
            {
                table ?
                    <>

                        <TableCard table={table} setTables={setTables} tables={tables} addItemHandler={addItemHandler} deleteItemHandler={deleteItemHandler} tableOwner={tableOwner} />

                        <section className='family-sect'>
                            {families.length > 0 && user.role !== 5051 &&
                                families.sort((a, b) => a.localeCompare(b)).map(f => <FamilyButton family={f} key={f} setDrinkIsActive={setDrinkIsActive} setFoodIsActive={setFoodIsActive}
                                    setTypeIsActive={setTypeIsActive} />)}
                        </section>

                        {drinkIsActive && user.role !== 5051 && <section className='type-sect'>
                            {drinkTypes.length > 0 && drinkTypes.map(t => <TypeButton key={t} type={t}
                                drinkIsActive={drinkIsActive} setTypeIsActive={setTypeIsActive}
                                setByType={setByType} />)}
                        </section>}

                        {foodIsActive && user.role !== 5051 && <section className='type-sect'>
                            {foodTypes.length > 0 && foodTypes.map(t => <TypeButton key={t} type={t}
                                setTypeIsActive={setTypeIsActive} setByType={setByType} />)}

                        </section>}

                        {(!typeIsActive && drinkIsActive && user.role !== 5051) &&
                            <section className='items-sect'>
                                {
                                    items && items.map(i => i.family === 'drinks' && <ItemLine key={i._id} item={i}
                                        addItemHandler={addItemHandler} />)
                                }
                            </section>}

                        {(!typeIsActive && foodIsActive && user.role !== 5051) &&
                            <section className='items-sect'>
                                {
                                    items && items.map(i => i.family === 'food' && <ItemLine key={i._id} item={i}
                                        addItemHandler={addItemHandler} />)
                                }
                            </section>}
                        {typeIsActive && user.role !== 5051 &&
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