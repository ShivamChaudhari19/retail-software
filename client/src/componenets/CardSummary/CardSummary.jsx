
import { useContext } from "react"
import "./CardSummary.css"
import { AppContext } from "../../context/AppContext"
// import ReceptPopup from "../ReceptPopup/ReceptPopup";


const CardSummary = ({customerName, mobileNumber, setMobileNumber, setCustomerName}) => {
  const {cartItems} = useContext(AppContext);
  
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const tax = totalAmount * 0.01;
  
  const grandTotal = totalAmount + tax;

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
        <button style={{height:'30px'}} className="btn btn-success flex-grow-1">
          Cash
        </button>
        <button style={{height:'30px'}} className="btn btn-primary flex-grow-1">
          UPI
        </button>
      </div>
      {/* <ReceptPopup/> */}
      <div className="d-flex mt-2">
        <button style={{height:'30px'}} className="btn btn-warning flex-grow-1">
          Place Order
        </button>
      </div>

    </div>
  )
}

export default CardSummary
