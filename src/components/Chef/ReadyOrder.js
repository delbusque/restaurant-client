import styles from './ReadyOrder.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl } from '../../config';
import { RiTakeawayLine } from 'react-icons/ri'
import { useAuthContext } from '../../hooks/useAuthContext.js';


const ReadyOrder = ({ ready, refetch, orders }) => {

    const { user } = useAuthContext()

    const createdAt = new Date(Date.parse(ready.createdAt));
    let dateNow = new Date(Date.now());
    let duration = dateNow.getTime() - createdAt.getTime()
    let time = Math.round(duration / 1000 / 60);

    const deleteReadyOrder = (clicked) => {
        axios.post(`${baseUrl}/chef/delete-ready-order`, { _id: clicked._id }).then(() => refetch())
    }

    useQuery('delete-ready-order', deleteReadyOrder, { enabled: false })

    const [count, setCount] = useState(0)

    useEffect(() => {
        orders?.forEach(o => {
            o.name === ready.name && setCount(old => old + 1)
        })
    }, [])

    return (
        <>
            <div className={ready.tableNum < 100 ? styles['order-cont'] : styles['order-cont-away']}>
                <div className={styles['order-info']}>
                    <div className={styles['order-table']}>
                        {ready.tableNum < 100 ? ready.tableNum : <RiTakeawayLine />}
                        {ready.tableNum >= 100 && <div className={styles['order-table-num']}>{ready.tableNum}</div>}
                    </div>
                    <div className={styles['order-time']}>{time} '</div>

                    <div className={styles['order-name']}>{ready.name}
                        {/* <div className={styles['order-count']}>{count}</div> */}
                    </div>

                </div>
                {user?.role === 1984 &&
                    <button className={styles['order-ready']} onClick={() => deleteReadyOrder(ready)}>ИЗТРИЙ</button>
                }

            </div>
        </>
    )
}

export default ReadyOrder