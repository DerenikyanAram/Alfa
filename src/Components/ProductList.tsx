import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, toggleLike, removeProduct } from '../store/productsSlice';
import { selectProducts, selectProductsLoading } from '../store/productsSelectors';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectProductsLoading);
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleToggleFavorite = () => {
        setShowFavorites((prev) => !prev);
    };

    const filteredProducts = showFavorites ? products.filter((p) => p.isLiked) : products;

    return (
        <div>
            <h1>Product List</h1>
    <button onClick={handleToggleFavorite}>
        {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
    {loading && <p>Loading...</p>}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredProducts.map((product) => (
            <ProductCard
                key={product.id}
            product={product}
            onToggleLike={() => dispatch(toggleLike(product.id))}
            onDelete={() => dispatch(removeProduct(product.id))}
            />
        ))}
        </div>
        </div>
    );
    };

    export default ProductList;
