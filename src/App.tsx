import CardList from "./components/CardList"
import type { ProductListEntity } from "./types";
import { useState, useEffect } from "react";

function App() {

  const [productsList, setProductList] = useState<ProductListEntity>({
    products: [],
    total: 0,
    skip: 0,
    limit: 10
  });

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=10")
    const data = await response.json();
    setProductList(data)
  }

  useEffect(() => {
    fetchProducts();
  }, []);
 
  if (!productsList || !productsList.products) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <h1>Products</h1>
      <CardList productsList={productsList} />
    </>
  )
}

export default App
