import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "./useAuthContext";
import { baseUrl } from "../config";

export const useSignup = () => {

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${baseUrl}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const result = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(result.error);
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(result));
            dispatch({ type: 'LOGIN', payload: result });
            setIsLoading(false);
            navigate('/my-account')
        }
    }

    return { signup, isLoading, error, setError }
}