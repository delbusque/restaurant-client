import { useContext } from "react";

import { ItemsContextReducer } from "../contexts/ItemsContextReducer";

export const useItemsContext = () => {
    const context = useContext(ItemsContextReducer);

    if (!context) {
        throw Error('useItemsContext must be used inside ItemsContextReducerProvider ');
    }

    return context;
}