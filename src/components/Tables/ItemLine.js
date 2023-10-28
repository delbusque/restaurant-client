const ItemLine = ({ item, addItemHandler }) => {
    return (
        <div className='item' onClick={() => addItemHandler(item)}>
            <div className='item-name'>{item.name}</div>

            <div className='item-quantity'>{item.quantity < 1000 ? item.quantity : item.quantity / 1000}
                <span className='item-quantityType'>{item.quantityType}</span>
            </div>



            <div className='item-price'>{item.price.toFixed(2)}<span className='lv'> лв.</span></div>
        </div>
    )
}

export default ItemLine;