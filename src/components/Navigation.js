import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navigation = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate('/login')
    }

    return (
        <header id='header' className="header">
            <h1 className="deli"><Link id='deli' className='links' to='/tables'>Deli</Link></h1>

            <div className="nav__auth">
                <Link id='tables' className='links' to='/tables'>
                    <li className="nav__item tables">МАСИ</li>
                </Link>
                <Link id='items' className='links' to='/items'>
                    <li className="nav__item">МЕНЮ</li>
                </Link>
            </div>


            <div className="nav__auth">

                {user &&
                    <>
                        <Link id='chef' className='links' to='/chef'><li className="nav__item chef">КУХНЯ</li></Link>
                        {/* <Link id='messages' className='links' to='/messages'><li className="nav__item deli-blog">Messages</li></Link> */}
                        <Link id='staff' className='links' to='/staff'><li className="nav__item">ЕКИП</li></Link>

                    </>}
            </div>

            {user && (<div id='auth' className="nav__auth">

                <Link id='u-email' className='links' to='/my-account'><span className='u-email'>{user.email}</span></Link>

                <button className="links nav__item-auth out" onClick={logoutHandler}>Logout</button>
            </div>)}

            {!user && <>

                <Link id='signup' className='links' to='/signup'><li className="nav__item-auth">Sign up</li></Link>
                <Link id='login' className='links' to='/login'><li className="nav__item-auth">Log in</li></Link>
            </>}

        </header>
    )
}

export default Navigation;