import styles from "./NavToggle.module.css"
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { FiMenu } from 'react-icons/fi'

const NavToggle = ({ setToggle }) => {
    const [selectedLink, setSelectedLink] = useState('')

    const { logout } = useLogout();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate('/login')
    }

    const toggleHandler = () => {
        setToggle(toggle => !toggle)
    }

    return (
        <header id='header' className={styles["header"]}>
            <h1 className={styles["deli"]}><Link id='deli' className='links' to='/tables'>Deli</Link></h1>

            <FiMenu className={styles["btn-toggle"]}
                onClick={toggleHandler} />

            <div className={styles["nav-cont"]}>
                <div className="nav__auth">
                    {user?.role !== 401 &&
                        <Link id='tables' className='links' to='/tables' onClick={() => setSelectedLink('tables')}>
                            <li className={selectedLink === 'tables' ? "nav__item link-sel" : "nav__item tables"}>МАСИ</li>
                        </Link>}
                    <Link id='items' className='links' to='/items' onClick={() => setSelectedLink('items')}>
                        <li className={selectedLink === 'items' ? "nav__item link-sel" : "nav__item items"}>МЕНЮ</li>
                    </Link>
                </div>

                <div className="nav__auth">
                    <>{user && user?.role !== 401 &&
                        <Link id='chef' className='links nav-chef' to='/chef' onClick={() => setSelectedLink('chef')}>
                            <li className={selectedLink === 'chef' ? "nav__item link-sel" : "nav__item chef"}>КУХНЯ</li>
                        </Link>}
                        {/* <Link id='messages' className='links' to='/messages'><li className="nav__item deli-blog">Messages</li></Link> */}
                        {(user && user?.role === 1984) &&
                            <Link id='staff' className='links' to='/staff'>
                                <li className="nav__item">ЕКИП</li></Link>}
                    </>
                </div>

                {user &&
                    <div id='auth' className="nav__auth">
                        <Link id='u-email' className='links' to='/my-account'>
                            <span className='u-email'>{user.email}</span></Link>
                        <button className="links nav__item-auth out" onClick={logoutHandler}>ИЗХОД</button>
                    </div>}

                {!user && <div className="nav__auth">

                    <Link id='signup' className='links' to='/signup'><li className="nav__item-auth reg">РЕГИСТРАЦИЯ</li></Link>
                    <Link id='login' className='links' to='/login'><li className="nav__item-auth in">ВХОД</li></Link>
                </div>}
            </div>
        </header>
    )
}

export default NavToggle;