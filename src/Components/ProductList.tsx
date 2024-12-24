import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../Store/store'; // Подключаем типизированный dispatch
import { fetchProducts, toggleLike, removeProduct } from '../Store/productsSlice';
import { selectProducts, selectProductsLoading } from '../Store/productsSelector';
import ProductCard from './ProductCard';
import { Product } from '../Service/ProductApiService'; // Убедитесь, что тип `Product` определен в этом файле

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch(); // Используем типизированный dispatch
    const products = useSelector(selectProducts) as Product[]; // Явно указываем, что это массив типа `Product`
    const loading = useSelector(selectProductsLoading);
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleToggleFavorite = () => {
        setShowFavorites((prev) => !prev);
    };

    const filteredProducts = showFavorites
        ? products.filter((p: Product) => p.isLiked)
        : products;

    return (
        <div>
            <h1>Product List</h1>
            <button onClick={handleToggleFavorite}>
                {showFavorites ? 'Show All' : 'Show Favorites'}
            </button>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredProducts.map((product: Product) => (
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
