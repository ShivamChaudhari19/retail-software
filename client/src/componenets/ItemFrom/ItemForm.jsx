import {useContext, useState } from 'react'
import Uplode from "../../assets/uplode.png"
import {AppContext} from "../../context/AppContext"
import {toast} from "react-toastify"


const ItemForm = () => {

    const {categories, setItemsData, itemsData} = useContext(AppContext);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name:"",
        categoryId:"",
        price:"",
        descripation:"",     
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data)=> ({...data, [name]:value}));
    }


    //gpt
    const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        if (!image) {
            toast.error("Select image");
            return;
        }

        const formData = new FormData();
        formData.append("item", JSON.stringify(data));
        formData.append("file", image);

        const response = await addItem(formData);

        if (response.status === 201) {
            toast.success("Item added");
            setItemsData([...itemsData, response.data]);
            setData({
                name: "",
                descripation: "",
                price: "",
                categoryId: "",
            });
        } else {
            toast.error("Unable to add item");
        }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
    } finally {
        setLoading(false);
    }
};


  return (
<div className='item-form-container' style={{height:'100vh', overflowY:'auto', overflowX:'hidden' }}>
    <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-8 form-container">
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label"> 
                                <img src={image ? URL.createObjectURL(image): Uplode} alt="" width={48} />
                            </label>
                            <input type="file" name="image" id="image" className="form-controle" hidden onChange={(e) => setImage(e.target.files[0])}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">item Name</label>
                            <input type="text"
                            name="name"
                            id="name"
                            className="form-control" 
                            placeholder="Item Name"
                            onChange={onChangeHandler}
                            value={data.name}
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label' htmlFor='category'>
                                Category
                            </label>
                            <select name="categroyId" id="category" className="form-control" onChange={onChangeHandler} value={data.categoryId}>
                                <option value="">--SELECT CATEGORY--</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.categoryId}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label' htmlFor='price'>Price</label>
                            <input type='number' name='price' id='price' className='form-control' placeholder='&#8377;200.00' onChange={onChangeHandler} value={data.price}/>
                            
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Descripation" className="form-label">Descripation</label>
                            <textarea 
                            rows="5"
                            name="Descripatione"
                            id="Descripation"
                            className="form-control" 
                            placeholder="Write context here..."
                            onChange={onChangeHandler}
                            value={data.descripation}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading ? "Loading..." : "Save"}</button>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
</div>
  )
}

export default ItemForm
