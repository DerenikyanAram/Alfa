import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

// Base selector
const selectProductsState = (state: RootState) => state.products;

// Derived selectors
export const selectProducts = createSelector(selectProductsState, (state) => state.products);
export const selectProductById = (state: RootState, id: number) =>
    state.products.products.find((product) => product.id === id);
