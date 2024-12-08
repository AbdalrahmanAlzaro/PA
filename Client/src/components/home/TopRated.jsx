import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { useCart } from "../../hooks/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopRated = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/all-services")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

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
      <ToastContainer />{" "}
      <div className="pt-[50rem] mt-16 px-4 sm:px-8 lg:pt-16 xl:px-40">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <h2 className="text-lg sm:text-xl mr-4 font-semibold text-[#060640]">
            Top Product
          </h2>
          <Link
            to="/shop"
            className="flex items-center text-gray-600 hover:underline mt-4 sm:mt-0"
          >
            <span className="mr-2 text-[#515161]">See all resources</span>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <hr className="my-4 border-[#FADED9] border-[2px]" />
      </div>
      <div className="mt-10 px-4 sm:px-8 xl:px-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
          {products.slice(0.8).map((product) => (
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
      </div>
    </>
  );
};

export default TopRated;
