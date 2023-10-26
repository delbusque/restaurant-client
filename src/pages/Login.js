import styles from './Login.module.css'

import { useState } from "react";
import { useLogin } from '../hooks/useLogin';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const loginHandler = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <form className={styles['login']} onSubmit={loginHandler}>
            <h3>Вписване</h3>

            <label>Имейл:</label>
            <input type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email} />

            <label>Парола:</label>
            <input type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password} />

            <button disabled={isLoading}>Напред</button>
            {error && <div className={styles['error']}>{error}</div>}
        </form >
    )
}

export default Login;