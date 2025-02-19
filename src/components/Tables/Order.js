import styles from './Order.module.css'
import axios from 'axios'
import { baseUrl } from '../../config'
import { useAuthContext } from '../../hooks/useAuthContext'

const Order = ({ order, addItemHandler, deleteItemHandler, tableNum, table, setTables, tableOwner }) => {

    const { user } = useAuthContext()
    const { name, ingredients, quantity, quantityType, count, sent } = order

    const addOrders = () => {
        axios.post(`${baseUrl}/chef/add-orders`, { name, ingredients, quantity, quantityType, count: (count - sent), tableNum })
    }

    const toChefHandler = () => {

        table.orders.find((o, i) => {
            if (o._id === order._id) {
                if (!o.sent) {
                    table.orders[i].sent += o.count;
                    setTables(oldState => [...oldState], table);
                    window.localStorage.setItem('currTable', JSON.stringify(table))
                    axios.post(`${baseUrl}/tables/edit/${table._id}`, { table })
                    return addOrders()
                }
                else {
                    table.orders[i].sent += (order.count - order.sent);
                    setTables(oldState => [...oldState], table);
                    window.localStorage.setItem('currTable', JSON.stringify(table))
                    axios.post(`${baseUrl}/tables/edit/${table._id}`, { table })
                    return addOrders()
                }
            } else {
                return null
            }
        })
    }

    return (
        <>
            {window.innerWidth > 900
                ? < div className={styles['tb-orders']} >
                    <div className={styles['ord-name']}>{order.name}</div>
                    {(user?.role !== 5051 && user.id === tableOwner?._id) &&
                        <button className={styles['button-53']} onClick={() => deleteItemHandler(order)}>-</button>}

                    {(user?.role !== 5051 && user.id === tableOwner?._id) && <button className={styles['button-53-green']} onClick={() => addItemHandler(order)}>+</button>}
                    <div className={styles['ord-count']}>
                        <span className={styles['ord-counter']}>{order.count} </span> x {order.price.toFixed(2)}
                    </div>

                    {(order.family === 'food' && user?.role !== 5051 && user.id === tableOwner?._id) && <button className={styles['button-53-blue']} onClick={toChefHandler}> {sent} / {count}</button>}

                    <div className={styles['ord-total']}>{(order.count * order.price).toFixed(2)}<span className={styles['lv']}>лв.</span>
                    </div>
                </div >
                : <>
                    <div className={styles['ord-name']}>{order.name}</div>
                    < div className={styles['tb-orders']} >
                        {(user?.role !== 5051 && user.id === tableOwner?._id) &&
                            <button className={table.type == 'table' ? styles['button-53'] : styles['button-54']} onClick={() => deleteItemHandler(order)}>-</button>}
                        {(user?.role !== 5051 && user.id === tableOwner?._id) && <button className={styles['button-53-green']} onClick={() => addItemHandler(order)}>+</button>}
                        <div className={styles['ord-count']}>
                            <span className={styles['ord-counter']}>{order.count} </span> x {order.price.toFixed(2)}
                        </div>

                        {(order.family === 'food' && user?.role !== 5051 && user.id === tableOwner?._id) && <button className={styles['button-53-blue']} onClick={toChefHandler}> {sent} / {count}</button>}

                        <div className={styles['ord-total']}>{(order.count * order.price).toFixed(2)}
                            <span className={styles['lv']}>лв.</span>
                        </div>
                    </div >
                </>}

        </>
    )
}

export default Order;