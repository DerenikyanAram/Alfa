import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../Store/store';
import { selectProductById } from '../Store/productsSelector';
import './ProductDetail.css'

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();

    // Используем типизированный селектор
    const product = useAppSelector((state) =>
        selectProductById(state, Number(id))
    );

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className='product-detail'>
            <img src={product.image} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h1>{product.title}</h1>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => navigate(-1)} className='back-button'>Back</button>
        </div>
    );
};


export default ProductDetail;