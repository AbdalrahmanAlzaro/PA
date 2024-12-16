import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../hooks/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ShoppingCart, CreditCard, CheckCircle } from "lucide-react";

const CheckOut = () => {
  const { cartItems, clearCart, calculateTotalPrice } = useCart();
  const navigate = useNavigate();
  const [orderID, setOrderID] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOrderCreation = async (details) => {
    try {
      setIsProcessing(true);
      const productIds = cartItems.map((product) => product.id);
      const authToken = localStorage.getItem("authToken");

      await axios.post(
        "http://localhost:4000/api/orders",
        {
          product_ids: productIds,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: "Your payment was successful!",
        customClass: {
          popup: "bg-white rounded-2xl shadow-2xl",
          title: "text-2xl font-bold text-green-600",
          content: "text-gray-700",
        },
      });

      clearCart();
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "Failed to process order. Please try again.",
        customClass: {
          popup: "bg-white rounded-2xl shadow-2xl",
          title: "text-2xl font-bold text-red-600",
          content: "text-gray-700",
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: calculateTotalPrice().toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      setOrderID(details.id);
      handleOrderCreation(details);
    });
  };

  const onError = (err) => {
    Swal.fire({
      icon: "error",
      title: "Payment Error",
      text: "Something went wrong with your payment. Please try again.",
      customClass: {
        popup: "bg-white rounded-2xl shadow-2xl",
        title: "text-2xl font-bold text-red-600",
        content: "text-gray-700",
      },
    });
    console.error(err);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl overflow-hidden ">
        <div className="p-8 bg-gradient-to-r from-purple-600 to-pink-600">
          <h2 className="text-4xl font-extrabold text-white text-center flex items-center justify-center gap-4">
            <ShoppingCart className="w-12 h-12 text-white" />
            Checkout Confirmation
          </h2>
        </div>

        <div className="p-8">
          <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-purple-600" />
                Order Summary
              </h3>
              <div className="text-2xl font-extrabold text-green-600">
                ${calculateTotalPrice().toFixed(2)}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-gray-600 italic flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Thank you for your purchase! Your payment is being processed
                securely.
              </p>
            </div>

            <div className="mt-8">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AQO_lrXGFsV-gcb9dl11jWIu-BW84qeQbOxa31FnSsbeJj_fpHAMK3sb-c2aJjJSnjuaN4CDAxvT3tL1",
                  currency: "USD",
                }}
              >
                <div
                  className={`transition-opacity duration-300 ${
                    isProcessing ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    className="paypal-buttons"
                  />
                </div>
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
