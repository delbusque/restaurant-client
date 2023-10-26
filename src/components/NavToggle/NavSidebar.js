import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './NavSidebar.module.css'
import { MdClose } from 'react-icons/md'

const NavSidebar = ({ setToggle }) => {

    const { logout } = useLogout();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        setToggle(toggle => !toggle)
        navigate('/')
    }

    const toggleHandler = () => {
        setToggle(toggle => !toggle)
    }
    return (
        <>
            <div className={styles['sidebar-cont']}>
                <MdClose className={styles['sidebar-close']} onClick={toggleHandler} />

                <div className={styles['sidebar-menu']}>

                    {user?.role !== 401 && <li className={styles['sidebar-item']}>
                        <Link className={styles['sidebar-link']} to='/tables' onClick={toggleHandler}>Маси</Link>
                    </li>}

                    <li className={styles['sidebar-item']}>
                        <Link className={styles['sidebar-link']} to='/items' onClick={toggleHandler}>Меню</Link>
                    </li>

                    {user && user?.role !== 401 &&
                        <>
                            <li className={styles['sidebar-item']}>
                                <Link className={styles['sidebar-link']} to='/chef' onClick={toggleHandler}>Кухня</Link>
                            </li>
                            {/* <li className={styles['sidebar-item']}>
                                <Link className={styles['sidebar-link']} to='/staff' onClick={toggleHandler}>Staff</Link>
                            </li> */}
                        </>}

                    {user && (<div>
                        <li className={styles['sidebar-user']}>
                            <Link className={styles['sidebar-link']} to='/my-account' onClick={toggleHandler}><span>{user.email}</span></Link>
                        </li>

                        <div className={styles['sidebar-btn-cont']}>
                            <button className={styles['sidebar-btn-logout']} onClick={logoutHandler}>Sign out</button>
                        </div>

                    </div>)}

                    {!user && <>
                        <li className={styles['sidebar-item']}>
                            <Link className={styles['sidebar-link']} to='/signup' onClick={toggleHandler}>Регистрация</Link></li>

                        <div className={styles['sidebar-btn-login-cont']}>
                            <Link className={styles['sidebar-btn-login']} to='/login' onClick={toggleHandler}>Вход</Link>
                        </div>
                    </>}

                </div>

            </div>



        </>
    )
}

export default NavSidebar