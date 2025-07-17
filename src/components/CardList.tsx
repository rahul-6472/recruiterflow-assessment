import Card from "./Card";
import type { ProductListEntity, ProductEntity } from "../types";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface CardListProps {
  productsList: ProductListEntity;
}

export const CardList = ({ productsList }: CardListProps) => {
  const [products, setProducts] = useState<ProductEntity[]>(
    productsList.products
  );

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    if (productsList.products?.length) {
      setProducts(productsList.products);
    }
  }, [productsList]);

  if (!products || products.length === 0) {
    return (
      <div className="p-4 min-h-screen flex flex-col items-center justify-center">
        <Loader2 size={32} className="animate-spin text-gray-700" />
        <div className="text-gray-700 ml-4 text-xl">Loading products...</div>
      </div>
    );
  }
  return (
    <motion.div
      layout
      className="p-2 min-h-screen flex items-center justify-center flex-wrap"
    >
      <AnimatePresence>
        {products?.map((product) => (
          <Card
            key={product.id}
            product={product}
            handleDeleteProduct={handleDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
export default CardList;
