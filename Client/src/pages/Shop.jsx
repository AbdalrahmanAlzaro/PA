import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { useCart } from "../hooks/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/all-services")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Set initial filtered products to all products
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      mainImage: product.mainImage,
      quantity: 1,
    });

    toast.success(`${product.title} has been added to the cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-10 px-4 sm:px-8 xl:px-40">
        <div className="flex justify-center mb-10 space-x-2">
          {["all", "accessories", "food"].map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-lg text-black font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#fa5990] shadow-lg"
                  : "bg-gray-200 text-gray-800 hover:bg-[#fa5990] hover:text-white"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Display message when no products are found */}
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">
            <h2 className="text-2xl font-semibold">
              No products found in this category.
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-100 rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative"
              >
                <div
                  className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-5 h-5 text-gray-800" />
                </div>

                <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                  <img
                    src={`http://localhost:4000/${product.mainImage}`}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {product.description}
                  </p>
                  <h4 className="text-lg text-gray-800 font-bold mt-4">
                    ${product.price.toFixed(2)}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
