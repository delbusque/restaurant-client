import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Order from './Order.js';
import { RiTakeawayLine } from 'react-icons/ri'
import { useAuthContext } from '../../hooks/useAuthContext.js';
import axios from 'axios';
import { baseUrl } from '../../config.js';
import * as apiService from './../../services/apiService.js'

const TableCard = ({ table, setTable, tables, setTables, addItemHandler, deleteItemHandler, tableOwner, number }) => {
    const { user } = useAuthContext();

    const [flag, setFlag] = useState(false)

    const navigate = useNavigate();

    let totalSum = 0;

    const [givenSum, setGivenSum] = useState('')
    const [changeSum, setChangeSum] = useState(0)

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
        setChangeSum(0)
    }

    const openHandler = () => {
        if (user.role !== 5051) {

            apiService.fetchTables().then(data => {
                window.localStorage.setItem('tables', JSON.stringify(data))
                let [currTable] = data.filter(t => t.number == number)
                setTable(currTable)

                if (!currTable.opened) {
                    table.opened = true;
                    table.ownerId = user.id;

                    setTable(table)
                    console.log(table);

                    setTables(oldState => [...oldState], table);

                    window.localStorage.setItem('tables', JSON.stringify(tables))
                    window.localStorage.setItem('currTable', JSON.stringify(table))

                    axios.post(`${baseUrl}/tables/edit/${table._id}`, { table }).then(() => setFlag(old => !old))
                }
            })
        }
    }

    const changeHandler = () => {
        givenSum && setChangeSum(givenSum - totalSum);
    }

    useEffect(() => {
        window.localStorage.setItem('tables', JSON.stringify(tables))
        setChangeSum(0)
        setGivenSum('')
    }, [tables, flag])

    return (
        <section className={!table.paid ? 'orders-sect' : 'orders-sect-paid'}>
            <div className="tb-head">
                <Link to={'/tables'}>
                    <button className='btn-tables'>МАСИ</button>
                </Link>
                {/* <div className='tb-title'>{table.type === 'table' ? 'МАСА' : <div className='icon-wrap'><RiTakeawayLine /></div>}</div> */}

                {table.ownerId && <div className='tb-title firstName'>{tableOwner?.firstName || tableOwner?.email}</div>}
                {table.paid && <button className='btn-green'>ПЛАТЕНО</button>}
                {table.opened ? <div className='tb-num-op'>{table.number}</div> : <div className='tb-num' onClick={openHandler}>{table.number}</div>}
            </div>

            <div className='ord-footer' onClick={changeHandler}>
                <div className='tb-foot'>СМЕТКА</div>
                <div className='tb-total'>{totalSum.toFixed(2)} <span className='tb-total-lv'>лв.</span></div>

                {(table.opened && table.orders.length > 0 && user.id === tableOwner?._id) &&
                    <div className="btn-cont">
                        {(user.role !== 5051 && user.id === tableOwner?._id) && !table.paid
                            ? <>
                                <div className='tb-money-hidden'></div>
                                <div className='tb-change-hidden'></div>
                                <button className={table.type == 'table' ? (table.orders.length > 0 ? 'btn-paid' : 'btn-dis') : (table.orders.length > 0 ? 'btn-paid-ta' : 'btn-dis')} onClick={payHandler}>ПЛАТИ</button>
                            </>
                            : <>
                                <input className='tb-money'
                                    type='text' inputMode='numeric' pattern='[0-9]'
                                    onChange={(e) => {
                                        setGivenSum(e.target.value)
                                    }} />

                                {givenSum && <><div className='tb-change-cont'><div className='tb-change'>{changeSum.toFixed(2)}</div><div class="vertical-text">ресто</div></div></>
                                }

                                <button className={table.type == 'table' ? 'btn-clear' : 'btn-clear-ta'} onClick={clearHandler}>ИЗЧИСТИ</button>
                            </>
                        }
                    </div>
                }
                {(table.opened && table.orders.length < 1) && <div className="btn-cont-0">
                    {(user.role !== 5051 && user.id === tableOwner?._id) && table.opened
                        && <button className={table.type == 'table' ? 'btn-clear' : 'btn-clear-ta'} onClick={clearHandler}>ИЗЧИСТИ</button>
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