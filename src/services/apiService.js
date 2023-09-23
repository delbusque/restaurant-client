export const fetchTables = async (setTables) => {
    try {
        let responce = await fetch('/tables');
        let result = await responce.json();
        if (responce.ok) {
            setTables(result);
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchItems = async (setItems) => {
    try {
        let responce = await fetch('/items');
        let result = await responce.json();
        if (responce.ok) {
            setItems(result);
        }
    } catch (error) {
        console.log(error.message);
    }
}