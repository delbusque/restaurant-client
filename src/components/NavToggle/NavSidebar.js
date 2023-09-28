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
        navigate('/login')
    }

    const toggleHandler = () => {
        setToggle(toggle => !toggle)
    }
    return (
        <>
            <div className={styles['sidebar-cont']}>
                <MdClose className={styles['sidebar-close']} onClick={toggleHandler} />


                <Link className='links' to='/tables' onClick={toggleHandler}>
                    <li className="nav__item">Tables</li>
                </Link>
                <Link className='links' to='/items'>
                    <li className="nav__item">Items</li>
                </Link>

                {user &&
                    <>
                        <Link className='links' to='/chef'><li className="nav__item">Chef</li></Link>
                        {/* <Link id='messages' className='links' to='/messages'><li className="nav__item deli-blog">Messages</li></Link> */}
                        <Link className='links' to='/staff' ><li className="nav__item">Staff</li></Link>
                    </>}

                {user && (<div>
                    <Link className='links' to='/my-account'><span className='u-email'>{user.email}</span></Link>
                    <button className="links nav__item-auth out" onClick={logoutHandler}>Logout</button>
                </div>)}

                {!user && <>
                    <Link className='links' to='/signup'><li className="nav__item-auth">Sign up</li></Link>
                    <Link className='links' to='/login'><li className="nav__item-auth">Log in</li></Link>
                </>}
            </div>


        </>
    )
}

export default NavSidebar