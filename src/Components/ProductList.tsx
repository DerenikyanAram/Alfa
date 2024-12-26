import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../Store/store';
import { fetchProducts, toggleLike, removeProduct } from '../Store/productsSlice';
import { selectProducts } from '../Store/productsSelector';
import ProductCard from './ProductCard';
import { Product } from '../Service/ProductApiService';


const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useSelector(selectProducts) as Product[];

    const [showFavorites, setShowFavorites] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleToggleFavorite = () => {
        setShowFavorites((prev) => !prev);
    };

    const filteredProducts = products
        .filter((p: Product) => (showFavorites ? p.isLiked : true))
        .filter((p: Product) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

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

            <button className="favorites-button" onClick={handleToggleFavorite}>
                {showFavorites ? 'Show All' : 'Show Favorites'}
            </button>

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
