import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const navigate = useNavigate();

    const login = async (email, password) => {

        setIsLoading(true);
        setError(null);

        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(result.error);
        }

        if (response.ok) {
            setIsLoading(false);
            localStorage.setItem('user', JSON.stringify(result));
            dispatch({ type: 'LOGIN', payload: result });
            navigate('/tables')
        }
    }

    return { login, error, isLoading, setError };
}