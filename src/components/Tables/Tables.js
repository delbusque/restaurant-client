import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from "../../hooks/useAuthContext";
import TableError from './TableError';

import axios from 'axios';
import { baseUrl } from '../../config.js';
import * as apiService from './../../services/apiService.js'

const Tables = ({ tables, setTables }) => {

    const { user } = useAuthContext();

    const createTable = (type) => axios.post(`${baseUrl}/tables/create`, { type })

    const createHandler = async (type) => {
        const result = await createTable(type)
        setTables(oldState => [...oldState, result.data]);
    }

    const clickHandler = (table) => {
        window.localStorage.setItem('currTable', JSON.stringify(table))
    }

    useEffect(() => {
        apiService.fetchTables().then(data => {
            window.localStorage.setItem('tables', JSON.stringify(data))
            return data
        }).then((data) => {
            setTables(data)
            console.log(JSON.parse(window.localStorage.getItem('tables')));
        })

    }, [])

    return (
        <>
            {user &&
                <section className="tables-cont">
                    <div className="inside-cont">
                        {tables && tables.map(t => t.type === 'table' && (


                            <Link to={user ? t.number : null} className="links" key={t._id}
                                onClick={() => clickHandler(t)}>
                                {t.paid &&
                                    <div className={t.ownerId === user.id ? '' : 'other'}>
                                        <div className={t.opened ? "table-btn opened" : "table-btn"} >
                                            <p className="table-btn-text">{t.number}</p>
                                        </div>
                                    </div>
                                }
                                {!t.paid &&
                                    <div className={t.ownerId === user.id ? '' : !t.opened ? '' : 'other'}>
                                        <div className={t.opened ? "table-btn unpaid" : "table-btn"} >
                                            <p className="table-btn-text">{t.number}</p>
                                        </div>
                                    </div>
                                }
                            </Link>
                        ))}
                        {
                            (user.role === 1984 || user.role === 400) && <div className="table-btn add" onClick={() => createHandler('table')}><p className="table-btn-text">+</p></div>
                        }
                    </div>


                    <div className="inside-cont away">
                        {tables && tables.map(t => t.type === 'away' && (
                            <Link to={user ? t.number : null} className="links" key={t._id}
                                onClick={() => clickHandler(t)}>
                                {t.paid &&
                                    <div className={t.ownerId === user.id ? '' : 'other'}>
                                        <div className={t.opened ? "table-btn opened away" : "table-btn away"} >
                                            <p className="table-btn-text">{t.number}</p>
                                        </div>
                                    </div>
                                }
                                {!t.paid &&
                                    <div className={t.ownerId === user.id ? '' : !t.opened ? '' : 'other'}>
                                        <div className={t.opened ? "table-btn unpaid away" : "table-btn away"} >
                                            <p className="table-btn-text">{t.number}</p>
                                        </div>
                                    </div>}
                            </Link>
                        ))}
                        {
                            (user.role === 1984 || user.role === 400) && <div className="table-btn add" onClick={() => createHandler('away')}><p className="table-btn-text">+</p></div>
                        }
                    </div>
                </section >
            }
            {!user && <TableError />}
        </>
    )
}

export default Tables;