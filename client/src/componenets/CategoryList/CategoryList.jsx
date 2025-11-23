import { useContext, useState } from "react";
import "./CategoryList.css";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { deleteCategory, fetchCategories } from "../../service/CategaryService";
import axios from "axios";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  // const [categories, setCategories] = useState(dummyCategories);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete category
  const deleteByCategoryID = async (categoryID) => {
    if (!categoryID) {
      toast.error("Invalid category ID");
      return;
    }

    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryID);
        toast.success("Category deleted successfully!");

        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to delete category.");
      }
    }
  };

  console.log("Categories in CategoryList:", categories);

  return (
    <div
      className="py-3"
      style={{
        minHeight: "75vh",
        overflowY: "auto",
        overflowX: "hidden",
        // backgroundColor: "#f7f7f7",
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
                  backgroundColor: category.bgColour,
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
                      onClick={() => {
                        // console.log("Deleting category with ID:", category);
                        deleteByCategoryID(category.categoryId);
                      }}
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


