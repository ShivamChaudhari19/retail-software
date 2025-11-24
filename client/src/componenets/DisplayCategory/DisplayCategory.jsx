import Category from "../Category/Category";
import "./DisplayCategory.css";
import logo from "../../assets/logo.png";
import DisplayItems from "../DisplayItems/DisplayItems";

const DisplayCategory = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className="row g-3 w-100 m-0">

      <div key="all" className="col-md-3 col-sm-6 px-2">
        <Category
          categoryName="All Items"
          imgUrl={logo}
          numberOfItems={categories.reduce((acc, cat) => acc + cat.items, 0)}
          bgColour="#6c757d"
          isSelected={selectedCategory === ""}
          onClick={() => setSelectedCategory("")}
        />
      </div>

      {categories.map((category) => (
        <div key={category.categoryId} className="col-md-3 col-sm-6 px-2">
          <Category
            categoryName={category.name}
            imgUrl={category.imgUrl}
            numberOfItems={category.items}
            bgColour={category.bgColour}
            isSelected={selectedCategory === category.categoryId}
            onClick={() => setSelectedCategory(category.categoryId)}
          />
        </div>
      ))}

    </div>
  );
};

export default DisplayCategory;
