import styles from './ChefOrder.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl } from '../../config';

const ChefOrder = ({ waiting, refetch, orders, data }) => {

    const createdAt = new Date(Date.parse(waiting.createdAt));
    let dateNow = new Date(Date.now());
    let duration = dateNow.getTime() - createdAt.getTime()
    let time = Math.round(duration / 1000 / 60);

    const updateWaitingStatus = (clicked) => axios.post(`${baseUrl}/chef/update-waiting-status`, { _id: clicked._id }).then(() => refetch())

    useQuery('update-waiting-status', updateWaitingStatus, { enabled: false })

    const [count, setCount] = useState(0)

    useEffect(() => {
        setCount(0)
        orders?.forEach(o => {
            o.name === waiting.name && setCount(old => old + 1)
        })
    }, [data])

    return (
        <>
            <div className={styles['order-cont']}>
                <div className={styles['order-info']}>
                    <div className={styles['order-table']}>{waiting.tableNum}</div>
                    <div className={styles['order-time']}>{time} min</div>
                    <div className={styles['order-quantity']}>{waiting.quantity.toFixed(3)} {waiting.quantityType}</div>

                    <div>
                        <div className={styles['order-name']}>{waiting.name} <div className={styles['order-count']}>{count}</div></div>
                        <div className={styles['order-ingr']}>{waiting.ingredients.join(', ')}</div>
                    </div>

                </div>
                <button className={styles['order-ready']} onClick={() => updateWaitingStatus(waiting)}>ГОТОВА</button>
            </div>
        </>
    )
}

export default ChefOrder