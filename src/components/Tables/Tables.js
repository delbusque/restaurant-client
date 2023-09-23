import { Link } from 'react-router-dom';

import { useAuthContext } from "../../hooks/useAuthContext";
import TableError from './TableError';

const Tables = ({ tables }) => {

    const { user } = useAuthContext();

    return (
        <>
            {user &&
                <section className="tables-cont">
                    {tables && tables.map(t => (
                        <Link id='table-num' to={user ? t.number : null} className="links" key={t._id}>
                            {t.paid && <div className={t.opened ? "table-btn-opened" : "table-btn"} >
                                <p className="table-btn-text">{t.number}</p>
                            </div>}
                            {!t.paid && <div className={t.opened ? "table-btn-unpaid" : "table-btn"} >
                                <p className="table-btn-text">{t.number}</p>
                            </div>}
                        </Link>
                    ))
                    }
                </section >
            }
            {!user && <TableError />}
        </>
    )
}

export default Tables;