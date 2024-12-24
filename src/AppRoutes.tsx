import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetail';
import CreateProductForm from './Components/CreateUserDialog'; // Убедитесь, что это правильный файл
import { useDispatch } from 'react-redux';
import { addProduct } from './Store/productsSlice';

const AppRoutes: React.FC = () => {
    const dispatch = useDispatch();

    const handleAddProduct = (newProduct: any) => {
        dispatch(addProduct(newProduct));
    };

    return (
        <Router>
            <Routes>
                {/* Редирект с корневого маршрута на /products */}
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route
                    path="/create-product"
                    element={<CreateProductForm onAddProduct={handleAddProduct} />}
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
