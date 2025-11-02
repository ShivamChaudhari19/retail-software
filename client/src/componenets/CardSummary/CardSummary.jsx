
import { useContext, useState } from "react"
import "./CardSummary.css"
import { AppContext } from "../../context/AppContext"
import { createOrder, deleteOrder } from "../../service/OrderService";
import { createRazorpayOrder, verifyPayment } from "../../service/PaymentService";
import { AppConstants } from "../../util/constants";
import {toast} from "react-toastify"
import ReceiptPopup from "../ReceptPopup/ReceiptPopup";


const CardSummary = ({customerName, mobileNumber, setMobileNumber, setCustomerName}) => {
  const {cartItems, clearCart} = useContext(AppContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = totalAmount * 0.01;
  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setOrderDetails("");
    setMobileNumber("");
    clearCart();
  }

  const placeOrder = () => {
      setShowPopup(true);
      clearAll();
  }

  const handlePrintReceipt = () => {
    window.print();
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    })
  }  

  const deleteOrderOnFailure = async (orderId) => {
    try{
      await deleteOrder(orderId)
    } catch (error){
      console.error(error);
      toast.error("Something went wrong!!");
    }
  }

  const completePayment = async (paymentMode) => {
      if (!customerName || !mobileNumber) {
        toast.error("Please enter customer");
        retur;
      }
      if (cartItems.length === 0){
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
          paymentMethod: paymentMode.toUpperCase()
        }

      setIsProcessing(true);
      try{
      
        const response = await createOrder(orderData);
        const saveData = response.data;
        if(response.status === 201 && paymentMode === "cash"){
           toast.success("Cash received");
           setOrderDetails(saveData)
        } else if (response.status === 202 && paymentMode === "upi"){
            const razorpayLoaded = await loadRazorpayScript(paymentMode);
            if(!razorpayLoaded){
              toast.error("unable toload razorpay");
              deleteOrderOnFailure(saveData.orderId);
              return;
            }
            //create razorpay order
            const razorpayResponse = await createRazorpayOrder({amount: grandTotal, currency: "INR"});
            const opction =  {
              key: AppConstants.RAZORPAY_KEY_ID,
              amount: razorpayResponse.data.amount,
              currency: razorpayResponse.data.currency,
              order_id: razorpayResponse.data.id,
              name:"My Retail shop",
              descripation: "order payment",
              handler: async function (response) {
                await verifyPaymentHandler(response, saveData);
              },
              prefill: {
                name: customerName,
                contact: mobileNumber
              },
              theme: {
                color: "#3399cc"
              },
              model: {
                ondismiss: async () => {
                  await deleteOrderOnFailure(saveData.orderId);
                  toast.error("Payment Cancelled")
                }
              },
            };
            const rzp = new window.Razorpay(oprions);
            rzp.on("payment.failed", async(response) => {
              await deleteOrderOnFailure(saveData.orderId);
              toast.error("payment failed ");
              console.error(response.error.descripation);
            });
            rzp.open();
        }
      }catch(error){
        console.error(error);
        toast.error("Payment processing failed");
      } finally{
        setIsProcessing(false);
      }
  } 

  const verifyPaymentHandler = async (response, saveOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: saveOrder.orderId
    };
    try{
      const paymentResopnce = await verifyPayment(paymentData);
      if(response.status === 200){
        toast.success("Payment successful");
        setOrderDetails({
          ...saveOrder,
          paymentDetails: {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorepay_signature
          },
        });
      }else{
        toast.error("Payment Processing failed");
      }
    } catch{
      console.error(error);
      toast.error("Payment failed");
    }
  };


  return (
    <div className="mb-2">
      <div className="card-summary-details">
        <div className="d-flex justify-content-betwwen">
          <span className="text-light">Item: </span>
          <spna className="text-light">₹{totalAmount.toFixed(2)}</spna>
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-light">Tax (1%):</span>
          <span className="text-light">₹{tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between ">
          <span className="text-light">Total</span>
          <span className="text-light">₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="d-flex gap-3 mt-1">
        <button style={{height:'30px'}} className="btn btn-success flex-grow-1"
          onClick={() => completePayment("cash")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing...": "Cash"}
        </button>
        <button style={{height:'30px'}} className="btn btn-primary flex-grow-1"
         onClick={() => completePayment("upi")}
         disabled={isProcessing}
        >
          {isProcessing ? "Processing...": "UPI"}
        </button>
      </div>
      {/* <ReceptPopup/> */}
      <div className="d-flex mt-2">
        <button style={{height:'30px'}} className="btn btn-warning flex-grow-1"
          onChange={placeOrder}
          disabled={isProcessing || !orderDetails}
        >
          Place Order
        </button>
      </div>
      {
        showPopup && (
          <ReceiptPopup 
            orderDetails={{
              ...orderDetails,
              razorepayOrderId: orderDetails.paymentDetails?.razorepayOrderId,
              razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId, 
            }}
            onClose={() => setShowPopup(false)}
            onPrint={handlePrintReceipt}
          />
        )
      }

    </div>
  )
}

export default CardSummary
