import "./Explor.css"
import { AppContext } from "../../context/AppContext"
import { useContext } from "react";

const Explor = () => {

  const {categories} = useContext(AppContext)
  console.log(categories);
  
  return (
    <div className='explor-container text-light'>
      <div className='left-column'>

        <div className="first-row" style={{ overflow: "auto" }}>
          Categories
        </div>

        <hr className='horizontal-line' />
        <div className='second-row' style={{ overflow: "auto" }}>
          Items
        </div>
      </div>

      <div className='right-column d-flex flex-column'>
        <div className="customer-form-container" style={{ height: '15%' }}>
          Customer Form
        </div>
        <hr className='my-3 text-light' />
        <div className='cart-items-container' style={{ height: "55%", overflowY: 'auto' }}>
          Card Items
        </div>
        <div className="cart-summary-container" style={{ height: "30%" }}>
          Card Summary
        </div>
      </div>
    </div>
  )
}

export default Explor
