import "./Explor.css"
import { AppContext } from "../../context/AppContext"
import { useContext, useState } from "react";
import DisplayCategory from "../../componenets/DisplayCategory/DisplayCategory";
import DisplayItems from "../../componenets/DisplayItems/DisplayItems";
import CustomerForm from "../../componenets/CustomerForm/CustomerForm";
import CardItem from "../../componenets/CardItem/CardItem";
import CardSummary from "../../componenets/CardSummary/CardSummary";

const Explor = () => {

  const {categories} = useContext(AppContext)
  const[selectedCategory, setSelectedCategory] = useState("");

  
  return (
    <div className='explor-container text-light'>
      <div className='left-column'>

        <div className="first-row" style={{ overflow: "auto" }}>
          <DisplayCategory 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories} />
        </div>

        <hr className='horizontal-line' />
        <div className='second-row' style={{ overflow: "auto" }}>
          <DisplayItems />
        </div>
      </div>

      <div className='right-column d-flex flex-column'>
        <div className="customer-form-container" style={{ height: '15%' }}>
          <CustomerForm />
        </div>
        <hr className='my-3 text-light' />
        <div className='cart-items-container' style={{ height: "55%", overflowY: 'auto' }}>
          <CardItem/>
        </div>
        <div className="cart-summary-container" style={{ height: "30%" }}>
          <CardSummary/>
        </div>
      </div>
    </div>
  )
}

export default Explor
