import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProductById } from '../store/productsSelectors';

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useSelector((state) => selectProductById(state, Number(id)));

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
    <button onClick={() => navigate(-1)}>Back</button>
    </div>
);
};

export default ProductDetail;
