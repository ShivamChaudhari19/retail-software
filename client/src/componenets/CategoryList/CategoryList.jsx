import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"
import "./CategoryList"
import { deleteCategory } from "../../service/CategaryService"
import { toast } from "react-hot-toast"


const dummyCategories = [
  {
    categoryID: 1,
    name: "Fruits",
    items: 12,
    imgUrl: "https://cdn-icons-png.flaticon.com/512/415/415682.png",
    bgColor: "#4CAF50",
  },
  {
    categoryID: 2,
    name: "Vegetables",
    items: 8,
    imgUrl: "https://cdn-icons-png.flaticon.com/512/766/766149.png",
    bgColor: "#FF9800",
  },
  {
    categoryID: 3,
    name: "Dairy Products",
    items: 5,
    imgUrl: "https://cdn-icons-png.flaticon.com/512/3480/3480441.png",
    bgColor: "#2196F3",
  },
  {
    categoryID: 4,
    name: "Bakery",
    items: 6,
    imgUrl: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
    bgColor: "#9C27B0",
  },
];

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  // const [categories, setCategories]= useState(dummyCategories)
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = Array.isArray(categories)
    ? categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];


  const deleteByCategoryID = async (categoryID) => {
    try {
      const response = await deleteCategory(categoryID);
      if (response.status === 204) {
        const updatedCategories = categories.filter(category => category => category.categoryID !== categoryID);
        setCategories(updatedCategories);
        toast.success("Category deleted");
      } else {
        toast.error("Unable to delete category");
      }
    } catch (error) {
      //error msg
      console.error(error);
      toast.error("Unable to delete category");
    }
  }

  return (
    <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword"
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <div key={index} className="col-12">
              <div className="card p-3" style={{ backgroundColor: category.bgColor }}>
                <div className="d-flex align-items-center">
                  <div style={{ marginRight: "15px" }}>
                    <img
                      src={category.imgUrl}
                      alt={category.name}
                      className="category-image w-25 h-25"
                    />
                  </div>

                  <div className="flex-grow-1">
                    <h5 className="mb-1 text-white">{category.name}</h5>
                    <p className="mb-0 text-white">{category.items} Items</p>
                  </div>

                  <div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteByCategoryID(category.categoryID)} // ✅ pass ID
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-white">No categories found</div>
        )}
      </div>

    </div>
  )
}

export default CategoryList
