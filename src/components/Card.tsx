import { TrashIcon } from "lucide-react";
import type { ProductEntity } from "../types";
interface CardProps {
    product: ProductEntity;
}

export const Card = ({ product }: CardProps) => {
    const handleDeleteProduct = (id: number) => {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        })
    }
    return (
        <div className="border p-4 m-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white-500 hover:bg-gray-100">
            {product.thumbnail && (
                <img src={product.thumbnail} alt={product.title} className="rounded" />
            )}
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span>${product.price}</span>
            <button className="mt-4 bg-red-500 text-white px-3 py-1 cursor-pointer" onClick={() => handleDeleteProduct(product.id)}><TrashIcon />Delete</button>
        </div>
    );
}
export default Card;