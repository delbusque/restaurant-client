import styles from './Signup.module.css'

import { useState } from "react";
import { useSignup } from '../hooks/useSignup';

const Signup = () => {

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

        await signup(email, password);
    }

    return (
        <form className={styles['signup']} onSubmit={signupHandler}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email} />

            <label>Password:</label>
            <input type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password} />

            <label>Repeat password:</label>
            <input type='password'
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword} />

            <button disabled={isLoading}>Sign up</button>

            {error && <div className={styles['error']}>{error}</div>}

            <p>* Password must be at least 8 characters long with minimum 1 uppercase and lowercase letter, 1 digit and 1 symbol !</p>
        </form >
    )
}

export default Signup;