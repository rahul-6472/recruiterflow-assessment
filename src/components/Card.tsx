import { TrashIcon } from "lucide-react";
import type { ProductEntity } from "../types";
import { motion } from "framer-motion";

interface CardProps {
  product: ProductEntity;
  handleDeleteProduct: (id: number) => void;
}

export const Card = ({ product, handleDeleteProduct }: CardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
      className="p-4 m-2 w-[280px] flex-wrap rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-100 hover:bg-gray-200 cursor-pointer"
    >
      {product.thumbnail && (
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-[220px] h-[220px] object-cover mx-auto"
        />
      )}
      <h3 className="font-bold text-base text-gray-800 text-center mt-2">
        {product.title}
      </h3>
      <div className="flex justify-end">
        <button
          className="mt-4 cursor-pointer  text-red-500 hover:text-red-700 hover:scale-110 transition-transform duration-200"
          onClick={() => handleDeleteProduct(product.id)}
        >
          <TrashIcon />
        </button>
      </div>
    </motion.div>
  );
};
export default Card;
