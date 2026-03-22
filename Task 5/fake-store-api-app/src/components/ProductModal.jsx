import React from 'react'

function ProductModal({ product, closeModal, addToCart }) {
    return (
        <div className='modal-backdrop'>
            <div className="modal">
                <button className='close-btn' onClick={closeModal}>X</button>
                <img src={product.image} alt={product.title} className='modal-image' />
                <h2>{product.title}</h2>
                <p><strong>Category:</strong>{product.category}</p>
                <p><strong>Price:</strong> {Math.round(product.price * 85)}</p>
                <p className='description'>{product.description}</p>
                <button className='add-btn' onClick={() => addToCart(product)}>
                    Add to Cart
                </button>
            </div>
        </div >
    )
}

export default ProductModal