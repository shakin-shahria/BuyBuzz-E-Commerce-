import React, { useState, useEffect } from "react";
import AppURL from "../../../api/AppURL";
import axios from "axios";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";

const PaymentDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const response = await axios.get(AppURL.GET_ALL_ORDERS);

        if (Array.isArray(response.data) && response.data.length > 0) {
          const oldestOrder = response.data[response.data.length - 1]; 
          setOrder(oldestOrder);
        } else {
          console.error("No orders found");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchLatestOrder();
  }, []);

  const generatePDF = () => {
    if (!order) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Payment Details", 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 40);
    doc.text(`Status: ${order.status}`, 20, 50);
    doc.text(`Total Amount: $${order.total_amount}`, 20, 60);
    doc.text(`Transaction ID: ${order.transaction_id}`, 20, 70);
    doc.text(`Payment Method: ${order.payment_gateway}`, 20, 80);

    doc.save(`Order_${order.id}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading payment details...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">Thank You!</h1>
          <p className="text-lg text-gray-500 mt-2">
            Your payment has been processed successfully.
          </p>
        </div>

        {order ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <span className="font-medium text-gray-700">Order ID:</span>
              <span className="text-gray-600">{order.id}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <span className="font-medium text-gray-700">Status:</span>
              <span className="text-gray-600">{order.status}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <span className="font-medium text-gray-700">Total Amount:</span>
              <span className="text-gray-600">${order.total_amount}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <span className="font-medium text-gray-700">Transaction ID:</span>
              <span className="text-gray-600">{order.transaction_id}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <span className="font-medium text-gray-700">Payment Method:</span>
              <span className="text-gray-600">{order.payment_gateway}</span>
            </div>

            <button
              onClick={generatePDF}
              className="w-full bg-green-600 text-black px-4 py-2 rounded-lg font-bold shadow-md hover:bg-green-700 transition duration-300"
            >
              Download PDF
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No orders found</p>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-black px-8 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
