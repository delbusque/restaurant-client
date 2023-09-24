import styles from './Chef.module.css'
import ChefOrder from '../../components/Chef/ChefOrder';
import ReadyOrder from '../../components/Chef/ReadyOrder';
import { useFetchOrders } from '../../hooks/useFetchOrders.js';

const Chef = () => {

    const { data, refetch } = useFetchOrders()
    const readyData = data?.filter(r => !r.waiting)
    const waitingData = data?.filter(r => r.waiting)

    return (
        <div className={styles["chef-orders"]}>
            <div className={styles["ready"]}>
                {readyData?.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map(order => <ReadyOrder orders={readyData} key={order._id} ready={order} refetch={refetch} />)}

            </div>
            <div className={styles["waiting"]}>
                {data?.map(order => order.waiting && <ChefOrder data={data} orders={waitingData} key={order._id} waiting={order} refetch={refetch} />)}
            </div>
        </div>
    )
}

export default Chef;