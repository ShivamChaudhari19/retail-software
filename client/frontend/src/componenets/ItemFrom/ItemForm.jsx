import React from 'react'

const ItemForm = () => {
  return (
<div className='item-form-container' style={{height:'100vh', overflowY:'auto', overflowX:'hidden' }}>
    <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-8 form-container">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label"> 
                                <img src="https://placehold.co/48x48" alt="" width={48} />
                            </label>
                            <input type="file" name="image" id="image" className="form-controle" hidden/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">item Name</label>
                            <input type="text"
                            name="name"
                            id="name"
                            className="form-control" 
                            placeholder="Item Name"
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label' htmlFor='category'>
                                Category
                            </label>
                            <select name="categroy" id="category" className="form-control">
                                <option value="">--SELECT CATEGORY--</option>
                                <option value="">--SELECT CATEGORY1--</option>
                                <option value="">--SELECT CATEGORY2--</option>
                                <option value="">--SELECT CATEGORY3--</option>
                            </select>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label' htmlFor='price'>Price</label>
                            <input type='number' name='price' id='price' className='form-control' placeholder='&#8377;200.00' />
                            
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Descripation" className="form-label">Descripation</label>
                            <textarea 
                            rows="5"
                            name="Descripatione"
                            id="Descripation"
                            className="form-control" 
                            placeholder="Write context here..."
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-warning w-100">Save</button>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
</div>
  )
}

export default ItemForm
