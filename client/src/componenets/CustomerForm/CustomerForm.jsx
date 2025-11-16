import React from 'react'
import "./CustomerForm.css"
const CustomerForm = ({customerName, mobilenumber, setCustomerName, setMobileNumber}) => {
  return (
    <div className="p-1">
      <div className="mb-2">
        <div className="d-flex align-item-center gap-2">
          <label htmlFor='customerName' className='col-4'>Customer name</label>
          <input type='text' className="form-control form-control-sm" id='customerName' onChange={(e) => setCustomerName(e.target.value)} value={customerName} required/>
        </div>
      </div>

      <div className="mb-5">
        <div className="d-flex align-item-center gap-2">
          <label htmlFor='mobileNumber' className='col-4'>Mobile number</label>
          <input type='text' className="form-control form-control-sm" id='mobileNumber' onChange={(e) => setMobileNumber(e.target.value)} value={mobilenumber} required/>
        </div>
      </div>
    </div>
  )
}

export default CustomerForm
