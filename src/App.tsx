import { PlusIcon } from "lucide-react";
import CardList from "./components/CardList";
import type { ProductListEntity } from "./types";
import { useState, useEffect } from "react";
import Pagination from "./components/Pagination";

function App() {
  const [productsList, setProductList] = useState<ProductListEntity>({
    products: [],
    total: 0,
    skip: 0,
    limit: 12,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageWindowSize = 12;

  const windowStart =
    Math.floor((currentPage - 1) / pageWindowSize) * pageWindowSize + 1;
  const windowEnd = Math.min(windowStart + pageWindowSize - 1, totalPages);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=12&&skip=${currentPage * 12 - 12}`
      );
      const data = await response.json();
      setProductList(data);
      setTotalPages(data.total / 12);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async () => {
    const newProduct = {
      title: `New Product ${Math.floor(Math.random() * 1000)}`,
      thumbnail: `https://picsum.photos/seed/${Math.random()
        .toString(36)
        .substring(7)}/200/200`,
    };
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      data.id = Date.now();
      setProductList((prev) => ({
        ...prev,
        products: [data, ...prev.products],
      }));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const selectPageHandler = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== currentPage
    )
      setCurrentPage(selectedPage);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  if (!productsList || !productsList.products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-5">Product List</h1>
      <div className="flex justify-center sm:justify-end items-center px-4">
        <button
          className="bg-blue-700 flex items-center justify-center gap-2 text-white font-semibold text-sm px-4 py-2 rounded-lg  hover:bg-blue-800 transition-colors duration-300 mb-0 sm:mb-4"
          onClick={handleAddProduct}
        >
          <PlusIcon size={24} /> Add Product
        </button>
      </div>
      <CardList productsList={productsList} />
      {/* {productsList?.products?.length > 0 && (
        <div className="flex justify-center items-center space-x-2 m-8">
          <button
            className={`px-3 py-1 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 transition ${
              currentPage > 1
                ? "cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              currentPage > 1 && selectPageHandler(currentPage - 1)
            }
          >
            Prev
          </button>

          {Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => {
            const page = i + windowStart;
            return (
              <button
                key={page}
                className={`px-3 py-1 rounded border border-gray-300 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => selectPageHandler(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className={`px-3 py-1 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 transition ${
              currentPage < totalPages
                ? "cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              currentPage < totalPages && selectPageHandler(currentPage + 1)
            }
          >
            Next
          </button>
        </div>
      )} */}

      {productsList?.products?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={selectPageHandler}
          pageWindowSize={pageWindowSize}
        />
      )}
    </>
  );
}

export default App;
