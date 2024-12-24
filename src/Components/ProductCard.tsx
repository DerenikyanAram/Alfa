import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: any;
    onToggleLike: () => void;
    onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onToggleLike, onDelete }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <h3>{product.name}</h3>
            <p>{product.description.slice(0, 50)}...</p>
            <p>Price: ${product.price}</p>
            <button onClick={onToggleLike} style={{ color: product.isLiked ? 'red' : 'black' }}>
                ♥
            </button>
            <button onClick={onDelete}>Delete</button>
            <Link to={`/products/${product.id}`}>View Details</Link>
        </div>
    );
};

export default ProductCard;
