import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CreateProductForm from './components/CreateProductForm';

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/products" element={<ProductList />} />
<Route path="/products/:id" element={<ProductDetail />} />
<Route path="/create-product" element={<CreateProductForm />} />
</Routes>
</Router>
);

export default AppRoutes;
