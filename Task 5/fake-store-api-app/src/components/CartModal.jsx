import React from 'react'

function CartModal({ cart, closeCart, removeFromCart }) {
    return (
        <div className='modal-backdrop'>
            <div className='modal'>
                <button className='close-btn' onClick={closeCart}>X</button>
                <h2>Cart Items</h2>

                {cart.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className='cart-item'>
                            <img src={item.image} alt={item.title} width="50" />
                            <p>{item.title}</p>
                            <button onClick={() => removeFromCart(item.id)}>
                                Remove from Cart
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CartModal