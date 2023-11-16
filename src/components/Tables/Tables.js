import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from "../../hooks/useAuthContext";
import TableError from './TableError';

import { useQuery } from 'react-query';
import axios from 'axios';
import { baseUrl } from '../../config.js';

const Tables = ({ tables, setTables }) => {

    const { user } = useAuthContext();

    const createTable = (type) => axios.post(`${baseUrl}/tables/create`, { type })

    const createHandler = async (type) => {
        const result = await createTable(type)

        if (result.statusText === 'OK') {
            setTables(oldState => [...oldState, result.data]);
        }
    }

    return (
        <>
            {user &&
                <section className="tables-cont">
                    <div className="inside-cont">
                        {tables && tables.map(t => t.type === 'table' && (
                            <Link to={user ? t.number : null} className="links" key={t._id}>
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
                        <div className="table-btn add" onClick={() => createHandler('table')}><p className="table-btn-text">+</p></div>
                    </div>


                    <div className="inside-cont away">
                        {tables && tables.map(t => t.type === 'away' && (
                            <Link to={user ? t.number : null} className="links" key={t._id}>
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
                        <div className="table-btn add" onClick={() => createHandler('away')}><p className="table-btn-text">+</p></div>
                    </div>
                </section >
            }
            {!user && <TableError />}
        </>
    )
}

export default Tables;