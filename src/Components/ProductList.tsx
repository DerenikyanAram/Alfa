import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../Store/store';
import { fetchProducts, toggleLike, removeProduct } from '../Store/productsSlice';
import { selectProducts } from '../Store/productsSelector';
import ProductCard from './ProductCard';
import { Product } from '../Service/ProductApiService';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const products = useSelector(selectProducts) as Product[];

    const [showFavorites, setShowFavorites] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const handleToggleFavorite = () => {
        setShowFavorites((prev) => !prev);
        setCurrentPage(1); // Сбрасываем текущую страницу на первую
    };

    const handleCreateProduct = () => {
        navigate('/create-product');
    };

    const filteredProducts = products
        .filter((p: Product) => (showFavorites ? p.isLiked : true))
        .filter((p: Product) => p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    console.log('Filtered Products:', filteredProducts);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    console.log('Redux State ProductsAAAAAAAAAAAAA:', products);

    return (
        <div className="product-list">
            <h1 className="product-list-title">Product List</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="button-group">
                <button className="favorites-button" onClick={handleToggleFavorite}>
                    {showFavorites ? 'Show All' : 'Show Favorites'}
                </button>
                <button className="create-button" onClick={handleCreateProduct}>
                    Create Product
                </button>
            </div>

            <div className="products-grid">
                {paginatedProducts.map((product: Product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onToggleLike={() => dispatch(toggleLike(product.id))}
                        onDelete={() => dispatch(removeProduct(product.id))}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-button"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span className="pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                        className="pagination-button"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;
