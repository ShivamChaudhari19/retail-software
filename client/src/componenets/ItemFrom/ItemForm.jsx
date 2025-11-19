import { useContext, useState } from 'react'
import Uplode from "../../assets/uplode.png"
import { AppContext } from "../../context/AppContext"
import { toast } from "react-toastify"
import {addItems } from '../../service/ItemService'

const ItemForm = () => {

    const { categories, setItemsData, itemsData, setCategories } = useContext(AppContext);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: "",
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({ ...data, [name]: value }));
    }

    //rohan
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("itemRequest", JSON.stringify(data));
        formData.append("file", image);
        try {
            if (!image) {
                toast.error("Select image");
                return;
            }
            // const response = await addItem(formData);
            console.log("Form Data:", formData.get("itemRequest"), formData.get("file"));
            const response=await addItems(formData)
            if (response.status === 201) {
                setItemsData([...itemsData, response.data]);
                setCategories((prevCategories) =>
                    prevCategories.map((category) => category.categoryId === data.categoryId ? { ...category, items: category.items + 1 } : category))
                toast.success("item added")
                setData({
                    name: "",
                    descripation: "",
                    price: "",
                    categoryId: "",
                })
                setImage(false);
            } else {
                toast.error("Unable to add item");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unable to add item");
        } finally {
            setLoading(false);
        }
    }


    // //gpt
    // const onSubmitHandler = async (e) => {
    // e.preventDefault();
    // setLoading(true);

    // try {
    //     if (!image) {
    //         toast.error("Select image");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("item", JSON.stringify(data));
    //     formData.append("file", image);

    //     const response = await addItem(formData);

    //     if (response.status === 201) {
    //         toast.success("Item added");
    //         setItemsData([...itemsData, response.data]);
    //         setData({
    //             name: "",
    //             descripation: "",
    //             price: "",
    //             categoryId: "",
    //         });
    //     } else {
    //         toast.error("Unable to add item");
    //     }
    // } catch (error) {
    //     console.error(error);
    //     toast.error("Something went wrong");
    // } finally {
    //     setLoading(false);
    // }
    // };


    return (
        <div className='item-form-container' style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-11 form-container">
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        <img src={image ? URL.createObjectURL(image) : Uplode} alt="" width={48} />
                                    </label>
                                    <input type="file" name="image" id="image" className="form-controle" hidden onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        placeholder="Item Name"
                                        onChange={onChangeHandler}
                                        value={data.name}
                                        required
                                    />
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label' htmlFor='category'>
                                        Category
                                    </label>
                                    <select name="categoryId" id="category" className="form-control" onChange={onChangeHandler} value={data.categoryId} required>
                                        <option value="">--SELECT CATEGORY--</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.categoryId}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label' htmlFor='price'>Price</label>
                                    <input type='number' name='price' id='price' className='form-control' placeholder='&#8377;200.00' onChange={onChangeHandler} value={data.price} required />

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        rows="5"
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder="Write content here..."
                                        value={data.description}
                                        onChange={onChangeHandler}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-warning w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Loading..." : "Save"}
                                </button>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ItemForm
