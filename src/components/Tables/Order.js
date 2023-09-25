import styles from './Order.module.css'
import axios from 'axios'
import { baseUrl } from '../../config'

const Order = ({ order, addItemHandler, deleteItemHandler, tableNum, table, setTables }) => {
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
                    return addOrders()
                }
                else {
                    table.orders[i].sent += (order.count - order.sent);
                    setTables(oldState => [...oldState], table);
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
                    <button className={styles['button-53']} onClick={() => deleteItemHandler(order)}>-</button>
                    <button className={styles['button-53-green']} onClick={() => addItemHandler(order)}>+</button>
                    <div className={styles['ord-count']}>
                        <span className={styles['ord-counter']}>{order.count} </span> x {order.price.toFixed(2)}
                    </div>

                    {order.family === 'food' && <button className={styles['button-53-blue']} onClick={toChefHandler}> {sent} / {count}</button>}

                    <div className={styles['ord-total']}>{(order.count * order.price).toFixed(2)}
                        <span className={styles['lv']}>lv.</span>
                    </div>
                </div >
                : <>
                    <div className={styles['ord-name']}>{order.name}</div>
                    < div className={styles['tb-orders']} >
                        <button className={styles['button-53']} onClick={() => deleteItemHandler(order)}>-</button>
                        <button className={styles['button-53-green']} onClick={() => addItemHandler(order)}>+</button>
                        <div className={styles['ord-count']}>
                            <span className={styles['ord-counter']}>{order.count} </span> x {order.price.toFixed(2)}
                        </div>

                        {order.family === 'food' && <button className={styles['button-53-blue']} onClick={toChefHandler}> {sent} / {count}</button>}

                        <div className={styles['ord-total']}>{(order.count * order.price).toFixed(2)}
                            <span className={styles['lv']}>lv.</span>
                        </div>
                    </div >
                </>}

        </>
    )
}

export default Order;