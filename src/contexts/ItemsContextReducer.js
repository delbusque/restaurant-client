import { createContext, useReducer } from "react";

export const ItemsContextReducer = createContext();

export const itemsReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_ITEM':
            return {
                items: [...state.items, action.payload]
            };
        case 'SET_ITEMS':
            return {
                items: action.payload
            };
        default: return state
    }

}

export const ItemsContextReducerProvider = ({ children }) => {

    const { state, dispatch } = useReducer(itemsReducer, { items: null })

    return (
        <ItemsContextReducer.Provider value={{ ...state, dispatch }}>
            {children}
        </ItemsContextReducer.Provider>
    )
}