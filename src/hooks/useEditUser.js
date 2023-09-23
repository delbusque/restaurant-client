import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useEditUser = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const { dispatch } = useAuthContext();

    const editUser = async (email, firstName, lastName, phone) => {

        setIsLoading(true);
        setError(null);

        const response = await fetch(`/user/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, firstName, lastName, phone })
        })

        const result = await response.json();

        if (!response.ok && result.emptyFields) {
            setError(result.error);
            setEmptyFields(result.emptyFields);
            setIsLoading(false);
        }

        if (!response.ok) {
            setIsLoading(false);
            setError(result.error);
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(result));
            dispatch({ type: 'EDIT', payload: result });
            setIsLoading(false);
        }
    }
    return { editUser, isLoading, error, setError, emptyFields, setEmptyFields }
}