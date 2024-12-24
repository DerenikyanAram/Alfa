import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductsFromApi, Product } from '../Service/ProductApiService';

interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

// Thunks
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        return await fetchProductsFromApi();
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// Slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        toggleLike: (state, action: PayloadAction<number>) => {
            const product = state.products.find((p) => p.id === action.payload);
            if (product) {
                product.isLiked = !product.isLiked;
            }
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter((p) => p.id !== action.payload);
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message || null;
                state.loading = false;
            });
    },
});

export const { toggleLike, removeProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
