const familiesAndTypes = (items) => {

    let famSet = new Set();
    let drinksSet = new Set();
    let foodSet = new Set();

    items && items.forEach(i => {
        famSet.add(i.family);

        i.family === 'drinks' && drinksSet.add(i.type);
        i.family === 'food' && foodSet.add(i.type);
    });

    let families = [...famSet];
    let drinkTypes = [...drinksSet];
    let foodTypes = [...foodSet];

    return {
        families,
        drinkTypes,
        foodTypes
    }
}

export default familiesAndTypes;