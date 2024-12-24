import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../Store/store';
import { selectProductById } from '../Store/productsSelector';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Типизация id как строки
    const navigate = useNavigate();

    // Используем типизированный селектор
    const product = useAppSelector((state) =>
        selectProductById(state, Number(id))
    );

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: ${product.email}</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default ProductDetail;
