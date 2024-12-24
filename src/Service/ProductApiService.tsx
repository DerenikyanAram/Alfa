import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export interface Product {
    id: number;
    name: string;
    email: string;
    company: number;
    image: string;
    isLiked?: boolean;
}

// Fetch products from API
export const fetchProductsFromApi = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(API_URL);
    return response.data.map((product) => ({ ...product, isLiked: false }));
};
