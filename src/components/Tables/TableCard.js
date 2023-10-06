import { useNavigate } from 'react-router-dom'
import Order from './Order.js';
import { RiTakeawayLine } from 'react-icons/ri'

const TableCard = ({ table, setTables, addItemHandler, deleteItemHandler }) => {

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
        setTables(oldState => [...oldState], table);
    }

    const tabHandler = () => {
        navigate('/tables')
    }

    return (
        <section className={!table.paid ? 'orders-sect' : 'orders-sect-paid'}>
            <div className="tb-head">
                <div className='tb-title'>{table.type === 'table' ? 'TABLE' : <div className='icon-wrap'><RiTakeawayLine /></div>}</div>
                {table.paid && <button className='btn-green'>PAID</button>}
                <div className='tb-num'>{table.number}</div>
            </div>

            <div className='ord-footer'>
                <div className='tb-foot'>DUE AMOUNT</div>
                <div className='tb-total'>{totalSum.toFixed(2)} lv.</div>
                <div className="btn-cont">
                    <button className='btn-tables' onClick={tabHandler}>TABLES</button>
                    {!table.paid
                        ? <button className={table.orders.length > 0 ? 'btn-paid' : 'btn-dis'} onClick={payHandler}>PAY</button>
                        : <button className='btn-clear' onClick={clearHandler}>CLEAR</button>
                    }
                </div>
            </div>

            {
                table.orders && table.orders.map((o, i) => <Order tableNum={table.number} order={o} key={i} addItemHandler={addItemHandler} deleteItemHandler={deleteItemHandler} table={table} setTables={setTables} />)
            }
            <br />

        </section>
    )
}

export default TableCard;