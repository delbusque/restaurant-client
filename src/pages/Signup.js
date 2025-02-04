import styles from './Signup.module.css'

import { useState } from "react";
import { useSignup } from '../hooks/useSignup';

const Signup = ({ setSelectedLink }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const { signup, error, setError, isLoading } = useSignup();

    const signupHandler = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setError('Passwords do not match !');
            return null;
        }
        setSelectedLink('user')
        await signup(email, password);
    }

    return (
        <form className={styles['signup']} onSubmit={signupHandler}>
            <h3>Регистрирай се</h3>

            <label>Имейл:</label>
            <input type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email} />

            <label>Парола:</label>
            <input type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password} />

            <label>Повтори парола:</label>
            <input type='password'
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword} />

            <button disabled={isLoading}>Потвърди</button>

            {error && <div className={styles['error']}>{error}</div>}

            {/* <p>* Password must be at least 8 characters long with minimum 1 uppercase and lowercase letter, 1 digit and 1 symbol !</p> */}
            <p>* Паролата трябва да бъде най-малко 4 символа</p>
        </form >
    )
}

export default Signup;