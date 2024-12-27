import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../Store/store';
import { addProduct } from '../Store/productsSlice';
import { useNavigate } from 'react-router-dom';
import {Product} from "../Service/ProductApiService";

interface ProductFormData {
    title: string;
    price: number;
    description: string;
    image: string;
}

const CreateProductForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = (data: ProductFormData) => {
        const newProduct: Product = {
            id: Date.now(),
            title: data.title,
            description: data.description,
            price: data.price,
            category: {
                id: 1,
                name: 'Default Category',
                image: 'https://via.placeholder.com/150',
            },
            images: [data.image],
            image: data.image,
            isLiked: false,
        };

    dispatch(addProduct(newProduct));
        navigate('/products');
    };

    return (
        <div className="create-product-form">
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Product title"
                        {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="Price"
                        {...register('price', { required: 'Price is required', min: 1 })}
                    />
                    {errors.price && <p className="error-message">{errors.price.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        placeholder="Product description"
                        {...register('description', { required: 'Description is required' })}
                    ></textarea>
                    {errors.description && <p className="error-message">{errors.description.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        id="image"
                        type="text"
                        placeholder="Image URL"
                        {...register('image', { required: 'Image URL is required' })}
                    />
                    {errors.image && <p className="error-message">{errors.image.message}</p>}
                </div>

                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
    );
};

export default CreateProductForm;
