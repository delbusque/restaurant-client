const FamilyButton = ({ family, setFoodIsActive, setDrinkIsActive, setTypeIsActive }) => {

    const familyHandler = (e) => {

        if (e.target.name === 'drinks') {
            setDrinkIsActive(true);
            setFoodIsActive(false);
            setTypeIsActive(false);
        } else if (e.target.name === 'food') {
            setFoodIsActive(true);
            setDrinkIsActive(false);
            setTypeIsActive(false);
        }
    }

    return (
        <button className={family === 'drinks' ? 'family-btn-drinks' : 'family-btn-food'}
            onClick={(e) => familyHandler(e)} name={family}>{family.toUpperCase()}</button>
    )
}

export default FamilyButton;