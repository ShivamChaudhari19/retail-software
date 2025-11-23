import Category from "../Category/Category"
import "./DisplayCategory.css"

const DisplayCategory = ({selectedCategory, setSelectedCategory, categories}) => {
  return (
    <div className="row g-3" style={{width:'100%', margin:0}}>
      <div key="all" className="col-md-3 col-sm-6" style={{padding:'0 10px'}}>
          <Category
              categoryName = "All Items"
              // imgUrl= {assets.device}
              numberOfItems={categories.reduce((acc, cat) => acc + cat.items, 0)}
              bgColour= "#6c757d"
              isSelected={selectedCategory === ""}
              onClick={() => setSelectedCategory("")}
              
          />
      </div>
      {categories.map(category => (
        <div key={category.categoryId} className="col-md-3 col-sm-6" style={{padding:'0 10px'}}>
            <Category
              categoryName = {category.name}
              imgUrl={category.imgUrl}
              numberOfItems={category.items}
              bgColour={category.bgColour}
              isSelected={selectedCategory === category.categoryId}
              onClick={() => setSelectedCategory(categories.categoryId)}
              
            />
        </div>
      ))}
    </div>
  )
}

export default DisplayCategory
