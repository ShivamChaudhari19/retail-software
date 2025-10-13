import CategoryFrom from '../../componenets/CategoryFrom/CategoryFrom';
import CategoryList from '../../componenets/CategoryList/CategoryList';
import './ManageCategories.css';

const ManageCategoties = () => {
  return (
    <div className='category-container text-light'>
      <div className='left-column'>
          <CategoryFrom/>
      </div>

      <div className='right-column'>
          <CategoryList/>
      </div>
      
    </div>
  )
}

export default ManageCategoties
