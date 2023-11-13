import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Order from './Order.js';
import { RiTakeawayLine } from 'react-icons/ri'
import { useAuthContext } from '../../hooks/useAuthContext.js';

const TableCard = ({ table, setTables, addItemHandler, deleteItemHandler, tableOwner, setTableOwner, data }) => {

    const { user } = useAuthContext();

    const navigate = useNavigate();

    let totalSum = 0;

    if (table) {
        table.orders.map(o => totalSum += (o.price * o.count))
    }

    const payHandler = () => {
        table.paid = true;
        setTables(oldState => [...oldState], table);
    }

    const clearHandler = () => {
        table.orders = [];
        table.paid = false;
        table.opened = false;
        table.ownerId = undefined
        setTables(oldState => [...oldState], table);
    }

    const tabHandler = () => {
        navigate('/tables')
    }

    useEffect(() => {
        const owner = data?.find(user => user._id === table.ownerId)
        setTableOwner(owner)
    }, [data, setTableOwner, table.ownerId])

    return (
        <section className={!table.paid ? 'orders-sect' : 'orders-sect-paid'}>
            <div className="tb-head">
                <div className='tb-title'>{table.type === 'table' ? 'МАСА' : <div className='icon-wrap'><RiTakeawayLine /></div>}</div>
                {table.ownerId && <div className='tb-title firstName'>{tableOwner?.firstName || tableOwner?.email}</div>}
                {table.paid && <button className='btn-green'>ПЛАТЕНО</button>}
                <div className='tb-num'>{table.number}</div>
            </div>

            <div className='ord-footer'>
                <div className='tb-foot'>СМЕТКА</div>
                <div className='tb-total'>{totalSum.toFixed(2)} <span className='tb-total-lv'>лв.</span></div>
                {(user.role !== 5051 && user.id === tableOwner?._id) &&
                    <div className="btn-cont">
                        <button className='btn-tables' onClick={tabHandler}>МАСИ</button>
                        {!table.paid
                            ? <button className={table.orders.length > 0 ? 'btn-paid' : 'btn-dis'} onClick={payHandler}>ПЛАТИ</button>
                            : <button className='btn-clear' onClick={clearHandler}>ИЗЧИСТИ</button>
                        }
                    </div>
                }

            </div>

            {
                table.orders && table.orders.map((o, i) => <Order tableNum={table.number} order={o} key={i} addItemHandler={addItemHandler} deleteItemHandler={deleteItemHandler} table={table} setTables={setTables} tableOwner={tableOwner} setTableOwner={setTableOwner} data={data} />)
            }
            <br />

        </section>
    )
}

export default TableCard;