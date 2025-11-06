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

const TableView = ({ tables, setTables, setItems }) => {
    const [toast, setToast] = useState(null);

    const { user } = useAuthContext()

    // let table = JSON.parse(window.localStorage.getItem('currTable'))
    const [table, setTable] = useState(JSON.parse(window.localStorage.getItem('currTable')))

    const { items } = useContext(ItemsContext);
    const { number } = useParams();

    const { families, drinkTypes, foodTypes } = familiesAndTypes(items);
    drinkTypes.sort((a, b) => a.localeCompare(b));
    foodTypes.sort((a, b) => a.localeCompare(b));

    const fetchUsers = () => axios.get(`${baseUrl}/user`)

    const { data } = useQuery('users', fetchUsers, {
        select: data => data.data,
        refetchOnWindowFocus: false,
    })

    const [tableOwner, setTableOwner] = useState(data?.find(user => user._id === table.ownerId))

    const [drinkIsActive, setDrinkIsActive] = useState(true);
    const [foodIsActive, setFoodIsActive] = useState(false);
    const [typeIsActive, setTypeIsActive] = useState(false);

    const [byType, setByType] = useState('');

    useEffect(() => {
        const owner = data?.find(user => user._id === table?.ownerId)
        setTableOwner(owner)

    }, [data, table.ownerId])


    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 4000);
    };

    const updateBackendStock = async (itemId, newStock) => {
        try {
            const response = await fetch(`${baseUrl}/items/${itemId}/stock`, {
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
        } catch (error) {
            console.error('Error updating stock:', error);
            showToast('Failed to update stock!');
            throw error;
        }
    };

    const addItemHandler = async (item) => {
        if ((!item.stock || item.stock < 1) && table.opened) {
            showToast(`Моля заредете ${item.name.toUpperCase()} !`);
        }
        if (item.stock > 0 && (table.ownerId === user.id && !table.paid)) {
            // Check if item has stock available
            const currentItem = items.find(i => i._id === item._id);
            if (!currentItem || currentItem.stock <= 0) {
                return; // No stock available
            }

            let alreadyItem = table.orders.find(order => order.name === item.name);

            if (!alreadyItem) {
                alreadyItem = {
                    ...item,
                    count: 1,
                    sent: 0,
                    leftCount: 1  // Add leftCount initialization
                }
                table.orders.unshift(alreadyItem);
                if (table.orders.length > 0) { table.ownerId = user.id }
            } else {
                table.orders.find((order, i) => {
                    if (order._id === alreadyItem._id) {
                        table.orders[i].count++;
                        table.orders[i].leftCount++;  // Add this line
                    }
                });
            }

            const newStock = currentItem.stock - 1;

            // Update stock in local storage
            const updatedItems = items.map(i => {
                if (i._id === item._id) {
                    return {
                        ...i,
                        stock: newStock
                    };
                }
                return i;
            });

            // Update items context and localStorage
            setItems(updatedItems);
            window.localStorage.setItem('items', JSON.stringify(updatedItems));

            try {
                // Update backend stock
                await updateBackendStock(item._id, newStock);
            } catch (error) {
                // Revert local changes if backend update fails
                const revertedItems = items.map(i => {
                    if (i._id === item._id) {
                        return {
                            ...i,
                            stock: currentItem.stock
                        };
                    }
                    return i;
                });
                setItems(revertedItems);
                window.localStorage.setItem('items', JSON.stringify(revertedItems));
                return; // Stop further processing
            }

            // Update table
            setTables(oldState => [...oldState], table);
            window.localStorage.setItem('currTable', JSON.stringify(table));
            await axios.post(`${baseUrl}/tables/edit/${table._id}`, { table });
        }

    }

    const deleteItemHandler = async (item) => {
        if (!table.paid) {
            let index;
            let alreadyItem = table.orders.find((order, i) => {
                if (order.name === item.name) {
                    index = i;
                    return order;
                }
            });

            if (alreadyItem) {
                if (alreadyItem.count === 1) {
                    table.orders.splice(index, 1);
                } else {
                    table.orders[index].count--;
                    table.orders[index].leftCount--;  // Add this line
                }

                const currentItem = items.find(i => i._id === item._id);
                const newStock = (currentItem?.stock || 0) + 1;

                // Update stock in local storage
                const updatedItems = items.map(i => {
                    if (i._id === item._id) {
                        return {
                            ...i,
                            stock: newStock
                        };
                    }
                    return i;
                });

                // Update items context and localStorage
                setItems(updatedItems);
                window.localStorage.setItem('items', JSON.stringify(updatedItems));

                try {
                    // Update backend stock
                    await updateBackendStock(item._id, newStock);
                } catch (error) {
                    // Revert local changes if backend update fails
                    const revertedItems = items.map(i => {
                        if (i._id === item._id) {
                            return {
                                ...i,
                                stock: currentItem.stock
                            };
                        }
                        return i;
                    });
                    setItems(revertedItems);
                    window.localStorage.setItem('items', JSON.stringify(revertedItems));
                    return; // Stop further processing
                }

                // Update table
                setTables(oldState => [...oldState], table);
                window.localStorage.setItem('currTable', JSON.stringify(table));
                await axios.post(`${baseUrl}/tables/edit/${table._id}`, { table });
            }
        }
    }

    const serveItemHandler = async (item) => {
        if (!table.paid) {
            const orderIndex = table.orders.findIndex(order => order._id === item._id);
            if (orderIndex !== -1 && table.orders[orderIndex].leftCount > 0) {
                table.orders[orderIndex].leftCount--;

                // Update the table
                setTables(oldState => [...oldState], table);
                window.localStorage.setItem('currTable', JSON.stringify(table));
                await axios.post(`${baseUrl}/tables/edit/${table._id}`, { table });
            }
        }
    };

    return (
        <div className='table-card'>
            {toast && <div className='toast-notification'>{toast}</div>}
            {
                table ?
                    <>
                        <TableCard table={table} setTable={setTable} setTables={setTables} tables={tables} addItemHandler={addItemHandler} deleteItemHandler={deleteItemHandler} tableOwner={tableOwner} number={number}
                            serveItemHandler={serveItemHandler}
                        />

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