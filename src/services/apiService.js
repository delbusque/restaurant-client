import { baseUrl } from "../config";

export const fetchTables = async () => {
    try {
        let responce = await fetch(`${baseUrl}/tables`);
        let result = await responce.json();
        if (responce.ok) {
            return result;
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchItems = async () => {
    try {
        let responce = await fetch(`${baseUrl}/items`);
        let result = await responce.json();
        if (responce.ok) {
            return result;
        }
    } catch (error) {
        console.log(error.message);
    }
}