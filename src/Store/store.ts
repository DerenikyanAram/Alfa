import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

// Типы для корневого состояния и диспетчера
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Хук для типизированного диспетчера
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

// Хук для типизированного селектора
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
