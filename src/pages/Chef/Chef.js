import styles from './Chef.module.css'
import ChefOrder from '../../components/Chef/ChefOrder';
import ReadyOrder from '../../components/Chef/ReadyOrder';
import { useFetchOrders } from '../../hooks/useFetchOrders.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';

const Chef = () => {

    const { user } = useAuthContext()
    const { data, refetch } = useFetchOrders()
    const readyData = data?.filter(r => !r.waiting)
    const waitingData = data?.filter(r => r.waiting)

    return (
        <div className={styles["chef-orders"]}>
            {window.innerWidth > 900 ?
                <>
                    <div className={styles["ready"]}>
                        {readyData?.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map(order => <ReadyOrder orders={readyData} key={order._id} ready={order} refetch={refetch} />)}

                    </div>
                    <div className={styles["waiting"]}>
                        {data?.map(order => order.waiting && <ChefOrder data={data} orders={waitingData} key={order._id} waiting={order} refetch={refetch} />)}
                    </div>
                </>
                : user.role !== 402 ?
                    <>
                        <div className={styles["waiting"]}>
                            {data?.map(order => order.waiting && <ChefOrder data={data} orders={waitingData} key={order._id} waiting={order} refetch={refetch} />)}
                        </div>
                        <div className={styles["ready"]}>
                            {readyData?.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map(order => <ReadyOrder orders={readyData} key={order._id} ready={order} refetch={refetch} />)}

                        </div>
                    </> :
                    <>
                        <div className={styles["ready"]}>
                            {readyData?.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map(order => <ReadyOrder orders={readyData} key={order._id} ready={order} refetch={refetch} />)}

                        </div>
                        <div className={styles["waiting"]}>
                            {data?.map(order => order.waiting && <ChefOrder data={data} orders={waitingData} key={order._id} waiting={order} refetch={refetch} />)}
                        </div>

                    </>}
        </div>
    )
}

export default Chef;