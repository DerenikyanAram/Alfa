import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../Service/ProductApiService';
import { fetchProductsFromApi } from '../Service/ProductApiService';

const saveToLocalStorage = (products: Product[]) => {
    try {
        const plainProducts = products.map((product) => JSON.parse(JSON.stringify(product)));
        console.log('Saving to LocalStorage:', plainProducts);
        localStorage.setItem('products', JSON.stringify(plainProducts));
    } catch (error) {
        console.error('Failed to save to LocalStorage:', error);
    }
};

const loadFromLocalStorage = (): Product[] => {
    const saved = localStorage.getItem('products');
    console.log('Loading from LocalStorage:', saved);
    return saved ? JSON.parse(saved) : [];
};

// Асинхронный thunk для загрузки продуктов
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchProductsFromApi();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: loadFromLocalStorage(),
    loading: false,
    error: null,
};
console.log('Initial Redux State:', initialState.products);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        toggleLike: (state, action: PayloadAction<number>) => {
            const product = state.products.find((p) => p.id === action.payload);
            if (product) {
                product.isLiked = !product.isLiked;
                saveToLocalStorage(state.products);
            }
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter((p) => p.id !== action.payload);
            saveToLocalStorage(state.products);
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            console.log('Adding Product:', action.payload);
            state.products = [...state.products, action.payload];
            console.log('Updated Products State:', state.products);
            saveToLocalStorage(state.products);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                saveToLocalStorage(state.products);
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export const { toggleLike, removeProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
