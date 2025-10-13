import "./ManageItems.css"
import ItemForm from '../../componenets/ItemFrom/ItemForm'
import ItemList from '../../componenets/ItemList/ItemList'

const ManageItems = () => {
  return (
     <div className='items-container text-light'>
      <div className='left-column'>
          <ItemForm/>
      </div>

      <div className='right-column'>
          <ItemList/>
      </div>
      
    </div>
  )
}

export default ManageItems
