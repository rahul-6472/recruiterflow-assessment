import Card from "./Card";
import type { ProductListEntity } from "../types";

interface CardListProps {
    productsList: ProductListEntity;
}

export const CardList = ({ productsList }: CardListProps) => {
    const { products } = productsList;
    return (
        <div className="p-4 bg-gray-50 min-h-screen flex items-center justify-center flex-wrap space-y-4 shadow-lg">
            {products?.map((product) => (
                <Card key={product.id} product={product} />)
            )}
        </div>
    );
}
export default CardList;