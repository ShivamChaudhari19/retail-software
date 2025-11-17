import { useContext, useState } from "react";
import "./CategoryList.css";
import { toast } from "react-hot-toast";
import {AppContext} from "../../context/AppContext";
import { deleteCategory } from "../../service/CategaryService";
import axios from "axios";
// Dummy Data (Electronic Categories)
// const dummyCategories = [
//   {
//     categoryID: 1,
//     name: "Smartphones",
//     items: 15,
//     imgUrl: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
//     bgColor: "#FFFFFF",
//     textColor: "#000000",
//   },
//   {
//     categoryID: 2,
//     name: "Laptops",
//     items: 10,
//     imgUrl: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
//     bgColor: "#FFFFFF",
//     textColor: "#000000",
//   },
//   {
//     categoryID: 3,
//     name: "Headphones",
//     items: 8,
//     imgUrl: "https://cdn-icons-png.flaticon.com/512/1042/1042339.png",
//     bgColor: "#FFFFFF",
//     textColor: "#000000",
//   },
//   {
//     categoryID: 4,
//     name: "Smartwatches",
//     items: 6,
//     imgUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
//     bgColor: "#FFFFFF",
//     textColor: "#000000",
//   },
//   {
//     categoryID: 5,
//     name: "Televisions",
//     items: 9,
//     imgUrl: "https://cdn-icons-png.flaticon.com/512/3104/3104009.png",
//     bgColor: "#FFFFFF",
//     textColor: "#000000",
//   },
// ];

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  // const [categories, setCategories] = useState(dummyCategories);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete category
  const deleteByCategoryID = (categoryID) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = categories.filter(
        (category) => category.categoryID !== categoryID
      );
      deleteCategory(categoryID).catch((error) => {
        if (axios.isAxiosError(error)) {
          toast.error("Failed to delete category.");
        }
      });
      setCategories(updatedCategories);
      toast.success("Category deleted successfully!");
    }
  };

  return (
    <div
      className="category-list-container container py-3"
      style={{
        minHeight: "75vh",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "#f7f7f7",
      }}
    >
      {/* Search bar */}
      <div className="row mb-3 pe-2">
        <div className="input-group">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword..."
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      {/* Category cards */}
      <div className="row g-3 pe-2">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <div key={index} className="col-12">
              <div
                className="card p-3 shadow-sm border-0 rounded-3"
                style={{
                  backgroundColor: category.bgColor,
                  color: category.textColor,
                }}
              >
                <div className="d-flex align-items-center">
                  <div style={{ marginRight: "15px" }}>
                    <img
                      src={category.imgUrl}
                      alt={category.name}
                      className="category-image"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className="flex-grow-1">
                    <h5 className="mb-1 fw-bold">{category.name}</h5>
                    <p className="mb-0">{category.items} Items</p>
                  </div>

                  <div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteByCategoryID(category.categoryID)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No categories found</div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;






// import { useContext, useState } from "react";
// import "./CategoryList.css";
// import { toast } from "react-hot-toast";
// import { AppContext } from "../../context/AppContext";

// const CategoryList = () => {

//   const { categories } = useContext(AppContext)

//   return (
//     <div>
//       <div className="category-list-container" style={{ height: "100vh", overflowY: 'auto', overflowX: 'hidden' }}>
//         <div className="row pe2">
//           search Bar
//         </div>
//         <div className="row g-3 pe-2">
//           {categories.map((category, index) => (
//             <div key={index} className="col-12">
//               <div className="card p-3" style={{ background: category.bgColore }}>
//                 <div className="d-flex align-items-center">
//                   <div style={{ marginRight: "15px" }}>
//                     <img src={category.imaURl} alt={category.name} className="category-image"/>
//                   </div>
//                   <div className="flex-grow-1">
//                     <h5 className="mb-1 text-white">{category.name}</h5>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   )
// }

// export default CategoryList
