import React from 'react'

function ProductCard({ product, openModal }) {
    return (
        <div className='card' onClick={() => openModal(product)}>
            <img src={product.image} alt={product.title} className='product-image' />
            <h3>{product.title}</h3>
            <p className='price'>{Math.round(product.price * 85)}</p>
            <button onClick={() => openModal(product)}>View Product</button>
        </div>
    )
}

export default ProductCard