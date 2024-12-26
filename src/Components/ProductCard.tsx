import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css'

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: number;
        image: string;
        isLiked: boolean;
    };
    onToggleLike: () => void;
    onDelete: () => void;
}

const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) return ''; // Если текст отсутствует, возвращаем пустую строку
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onToggleLike, onDelete }) => {
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).tagName !== 'BUTTON') {
            navigate(`/products/${product.id}`);
        }
    };
    console.log('Image URL:', product.image);
    return (
        <div onClick={handleCardClick} className='product-card'>
            <img
                src={product.image}
                alt={product.title || 'Product Image'}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'; // Замена на заглушку при ошибке
                }}
            />


            <h3>{truncateText(product.title, 20)}</h3>
            <p>Price: ${product.price}</p>
            <div className="like-button-container">
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Останавливаем всплытие, чтобы не переходить на страницу
                    onToggleLike();
                }}
                className={`like-button ${product.isLiked ? 'liked' : ''}`}
            >
                ♥
            </button>
            </div>
            <div className="button-group">
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Останавливаем всплытие, чтобы не переходить на страницу
                    onDelete();
                }}
                className="delete-button"
            >
                Delete
            </button>
            <Link
                to={`/products/${product.id}`}
                className="details-link"
                onClick={(e) => e.stopPropagation()} // Останавливаем всплытие для предотвращения перехода
            >
                View Details
            </Link>
            </div>
        </div>
    );
};

export default ProductCard;