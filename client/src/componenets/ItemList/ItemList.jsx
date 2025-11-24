import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { deleteItem } from "../../service/ItemService"
import './ItemList.css'

const ItemList = () => {

  const { itemsData, setItemsData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = itemsData.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  })

  const removeItem = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
        const updatedItems = itemsData.filter(item => item.itemId !== itemId);
        toast.success("item deleted");
        setItemsData(updatedItems);
    } catch (err) {
      console.error(err)
      toast.error("Unable to delete item")
    }
  }

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
  {filteredItems.map((item, index) => (
    <div className="col-12" key={index}>
      <div className="card p-3 bg-dark">
        <div className="d-flex align-items-center">
          <div style={{ marginRight: "15px" }}>
            <img
              src={item.imgUrl}
              alt={item.name}
              className="item-image"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
              }}
            />
          </div>

          <div className="flex-grow-1">
            <h6 className="mb-1 text-white">{item.name}</h6>
            <p className="mb-0 text-white">Category: {item.categoryName}</p>
            <span className="badge rounded-pill text-bg-warning">
              ₹{item.price}
            </span>
          </div>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => removeItem(item.itemId)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default ItemList
