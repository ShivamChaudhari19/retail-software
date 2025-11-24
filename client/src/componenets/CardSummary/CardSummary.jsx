import { useContext, useState } from "react";
import "./CardSummary.css";
import { AppContext } from "../../context/AppContext";
import { createOrder, deleteOrder } from "../../service/OrderService";
import { createRazorpayOrder, verifyPayment } from "../../service/PaymentService";
import { AppConstants } from "../../util/constants";
import { toast } from "react-toastify";
import ReceiptPopup from "../ReceptPopup/ReceiptPopup";

const CardSummary = ({ customerName, mobileNumber, setMobileNumber, setCustomerName }) => {
  const { cartItems, clearCart } = useContext(AppContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = totalAmount * 0.01;
  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setOrderDetails(null);
    setMobileNumber("");
    setCustomerName("");
    clearCart();
  };

  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  const handlePrintReceipt = () => window.print();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Please enter customer details");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      subtotal: totalAmount,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };

    setIsProcessing(true);

    try {
      const response = await createOrder(orderData);
      const savedData = response.data;

      console.log("",response.status);
      console.log("",paymentMode)
      if (response.status == 201 && paymentMode == "CASH") {
        console.log("Inside cash payment!!!");
        toast.success("Cash received");
        setOrderDetails(savedData);
      }

      if (response.status == 201 && paymentMode == "UPI") {
        console.log("Inside razorpay gateway!!!");
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          toast.error("Unable to load Razorpay");
          await deleteOrderOnFailure(savedData.orderId);
          return;
        }

        const razorResponse = await createRazorpayOrder({
          // amount: grandTotal * 100,
           amount: grandTotal,
          currency: "INR",
        });

        console.log("Razorpay response:", razorResponse);
        const options = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorResponse.data.amount,
          currency: razorResponse.data.currency,
          order_id: razorResponse.data.id,
          name: "My Retail Shop",
          description: "Order Payment",
          handler: async (paymentResponse) => {
            await verifyPaymentHandler(paymentResponse, savedData);
          },
          prefill: { name: customerName, contact: mobileNumber },
          theme: { color: "#3399cc" },
          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment Cancelled");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async () => {
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment failed");
        });
        rzp.open();
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (paymentResponse, savedOrder) => {
    const paymentData = {
      razorpayOrderId: paymentResponse.razorpay_order_id,
      razorpayPaymentId: paymentResponse.razorpay_payment_id,
      razorpaySignature: paymentResponse.razorpay_signature,
      orderId: savedOrder.orderId,
    };

    try {
      const paymentResp = await verifyPayment(paymentData);
      if (paymentResp.status === 200) {
        toast.success("Payment Successful");
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            razorpayOrderId: paymentResponse.razorpay_order_id,
            razorpayPaymentId: paymentResponse.razorpay_payment_id,
            razorpaySignature: paymentResponse.razorpay_signature,
          },
        });
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="mb-2">
      <div className="card-summary-details">
        <div className="d-flex justify-content-between">
          <span className="text-light">Items:</span>
          <span className="text-light">₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-light">Tax (1%):</span>
          <span className="text-light">₹{tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-light">Total:</span>
          <span className="text-light">₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="d-flex gap-3 mt-1">
        <button className="btn btn-success flex-grow-1" onClick={() => completePayment("CASH")} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Cash"}
        </button>
        <button className="btn btn-primary flex-grow-1" onClick={() => completePayment("UPI")} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "UPI"}
        </button>
      </div>

      <div className="d-flex mt-2">
        <button className="btn btn-warning flex-grow-1" onClick={placeOrder} disabled={!orderDetails || isProcessing}>
          Place Order
        </button>
      </div>

      {showPopup && (
        <ReceiptPopup
          orderDetails={orderDetails}
          onClose={() => setShowPopup(false)}
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
};

export default CardSummary;
