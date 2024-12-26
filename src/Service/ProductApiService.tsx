import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1/products';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: string[];
    image: string;
    isLiked: boolean;
}

// Fetch products from API
export const fetchProductsFromApi = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(API_URL);
    console.log('Fetched products:', response.data); // Лог ответа от API
    return response.data.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        images: product.images,
        image: product.images?.[0] || product.category?.image || 'https://via.placeholder.com/150', // Используем первое изображение или заглушку
        isLiked: false,
    }));
};
