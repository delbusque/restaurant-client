const TypeButton = ({ type, drinkIsActive, setTypeIsActive, setByType }) => {

    const typeHandler = (e) => {
        setTypeIsActive(true);
        let currentType = e.target.textContent;
        setByType(currentType);
    }

    return (
        <button onClick={(e) => typeHandler(e)} className={drinkIsActive ? 'type-btn-drinks' : 'type-btn-food'}>{type}</button>
    )
}

export default TypeButton;