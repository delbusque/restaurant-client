const ItemLine = ({ item, addItemHandler }) => {
    return (
        <div className='item' onClick={() => addItemHandler(item)}>
            <div className='item-name'>{item.name}</div>

            <div className='item-quantity'>{item.quantity.toFixed(3)}
                <span className='item-quantityType'>{item.quantityType}</span>
            </div>

            <div className='item-price'>{item.price.toFixed(2)}<span className='lv'> lv.</span></div>
        </div>
    )
}

export default ItemLine;