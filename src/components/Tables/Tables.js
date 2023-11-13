import { useState, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useAuthContext } from "../../hooks/useAuthContext";
import TableError from './TableError';

import { baseUrl } from '../../config.js';
import { useQuery } from 'react-query'
import axios from 'axios';

const Tables = ({ tables }) => {

    const { user } = useAuthContext();

    const fetchUsers = () => axios.get(`${baseUrl}/user`)

    const { data } = useQuery('users', fetchUsers, {
        select: data => data.data,
        refetchOnWindowFocus: false,
    })

    console.log(data);
    console.log(tables);

    return (
        <>
            {user &&
                <section className="tables-cont">
                    <div className="inside-cont">
                        {tables && tables.map(t => t.type === 'table' && (
                            <Link to={user ? t.number : null} className="links" key={t._id}>
                                {t.paid && <div className={t.opened ? "table-btn opened" : "table-btn"} >
                                    <p className="table-btn-text">{t.number}</p>
                                </div>}
                                {!t.paid && <div className={t.opened ? "table-btn unpaid" : "table-btn"} >
                                    <p className="table-btn-text">{t.number}</p>
                                </div>}
                            </Link>
                        ))}
                        <div className="table-btn add"><p className="table-btn-text">+</p></div>
                    </div>


                    <div className="inside-cont away">
                        {tables && tables.map(t => t.type === 'away' && (
                            <Link to={user ? t.number : null} className="links" key={t._id}>
                                {t.paid && <div className={t.opened ? "table-btn opened away" : "table-btn away"} >
                                    <p className="table-btn-text">{t.number}</p>
                                </div>}
                                {!t.paid && <div className={t.opened ? "table-btn unpaid away" : "table-btn away"} >
                                    <p className="table-btn-text">{t.number}</p>
                                </div>}
                            </Link>
                        ))}
                        <div className="table-btn add"><p className="table-btn-text">+</p></div>
                    </div>
                </section >
            }
            {!user && <TableError />}
        </>
    )
}

export default Tables;