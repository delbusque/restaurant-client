import { useNavigate } from 'react-router-dom'
import Order from './Order.js';
import { RiTakeawayLine } from 'react-icons/ri'
import { useAuthContext } from '../../hooks/useAuthContext.js';
import axios from 'axios';
import { baseUrl } from '../../config.js';

const TableCard = ({ table, setTables, addItemHandler, deleteItemHandler, tableOwner }) => {

    const { user } = useAuthContext();

    const navigate = useNavigate();

    let totalSum = 0;

    if (table) {
        table.orders.map(o => totalSum += (o.price * o.count))
    }

    const payHandler = () => {
        table.paid = true;
        setTables(oldState => [...oldState], table);
        window.localStorage.setItem('currTable', JSON.stringify(table))

        axios.post(`${baseUrl}/tables/edit/${table._id}`, { table })
    }

    const clearHandler = () => {
        table.orders = [];
        table.paid = false;
        table.opened = false;
        table.ownerId = ''
        setTables(oldState => [...oldState], table);
        window.localStorage.setItem('currTable', JSON.stringify(table))

        axios.post(`${baseUrl}/tables/edit/${table._id}`, { table })
    }

    const tabHandler = () => {
        navigate('/tables')
    }

    return (
        <section className={!table.paid ? 'orders-sect' : 'orders-sect-paid'}>
            <div className="tb-head">
                <button className='btn-tables' onClick={tabHandler}>МАСИ</button>
                {/* <div className='tb-title'>{table.type === 'table' ? 'МАСА' : <div className='icon-wrap'><RiTakeawayLine /></div>}</div> */}

                {table.ownerId && <div className='tb-title firstName'>{tableOwner?.firstName || tableOwner?.email}</div>}
                {table.paid && <button className='btn-green'>ПЛАТЕНО</button>}
                <div className='tb-num'>{table.number}</div>
            </div>

            <div className='ord-footer'>
                <div className='tb-foot'>СМЕТКА</div>
                <div className='tb-total'>{totalSum.toFixed(2)} <span className='tb-total-lv'>лв.</span></div>

                {table.opened && <div className="btn-cont">
                    {(user.role !== 5051 && user.id === tableOwner?._id) && !table.paid
                        ? <button className={table.type == 'table' ? (table.orders.length > 0 ? 'btn-paid' : 'btn-dis') : (table.orders.length > 0 ? 'btn-paid-ta' : 'btn-dis')} onClick={payHandler}>ПЛАТИ</button>
                        : <button className='btn-clear' onClick={clearHandler}>ИЗЧИСТИ</button>
                    }
                </div>
                }



            </div>

            {
                table.orders && table.orders.map((o, i) => <Order tableNum={table.number} order={o} key={i} addItemHandler={addItemHandler} deleteItemHandler={deleteItemHandler} table={table} setTables={setTables} tableOwner={tableOwner} />)
            }
            <br />

        </section>
    )
}

export default TableCard;