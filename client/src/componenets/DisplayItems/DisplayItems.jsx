import React, { useContext, useState } from "react";
import "./DisplayItems.css";
import { AppContext } from "../../context/AppContext";
import Item from "../Item/Item";
import SearchBox from "../SearchBox/SearchBox";

const DisplayItems = ({ selectedCategory }) => {
  const { itemsData } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");

  const filteredItems = itemsData
    .filter((item) => {
      if (selectedCategory === "") return true; // Show all items
      return item.categoryId === selectedCategory;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <SearchBox onSearch={setSearchText} />
      </div>
      <div className="row">
        {filteredItems.length === 0 ? (
          <p>No items available.</p>
        ) : (
          filteredItems.map((item, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-3">
              <Item
                itemName={item.name}
                itemPrice={item.price}
                itemImage={item.imgUrl}
                itemId={item.itemId}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayItems;
