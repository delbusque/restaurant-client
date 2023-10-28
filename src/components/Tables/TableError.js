import styles from './TableError.module.css'
import { Link } from 'react-router-dom';

const TableError = () => {
    return (
        <div className="table-error">Не сте оторизиран и трябва да се <Link id='err-login' to='/login' className={styles['err-login']}> впишете</Link> или <Link id='err-signup' to='/signup' className={styles['err-signup']}> регистрирате</Link> за да продължите напред !</div>
    )
}

export default TableError;