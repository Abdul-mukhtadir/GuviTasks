import React from 'react'

function Header({ cartCount, openCart }) {
    return (
        <header className="header">
            <h2>My Store</h2>
            <div className='cart-box' onClick={openCart}>
                 Cart: {cartCount}
                 </div>
        </header>
    )
}

export default Header