import React from 'react';
import { useForm } from 'react-hook-form';

interface CreateProductFormProps {
    onAddProduct: (newProduct: any) => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ onAddProduct }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        onAddProduct({ ...data, id: Date.now(), isLiked: false });
    };

    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} placeholder="Name" required />
                <textarea {...register('description')} placeholder="Description" required />
                <input type="number" {...register('price')} placeholder="Price" required />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default CreateProductForm;
