import { useContext, useEffect, useState } from "react"
import Uplode from "../../assets/uplode.png"
import { toast } from 'react-toastify';
import { AppContext } from "../../context/AppContext"
import { addCategory } from "../../service/CategaryService";
  
const CategoryFrom = () => {

    const {setCategories, categories} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColour: "#2c2c2c",
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true);
        if (!image){
            toast.error("Select image for category");
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append("categoryRequest", JSON.stringify(data));
        formData.append("file", image);
        console.log("Form Data:", formData.get("categoryRequest"), formData.get("file"));
        try{
            const response = await addCategory(formData);
            if(response.status === 201 || response.status === 200){
               setCategories([...categories, response.data]);
               toast.success("Category Added");
               setData({
                name: "",
                descripation: "",
                bgColor:"#2c2c2c",
               });
               setImage(false);
            } else {
               toast.error("Failed to add category");
            }
        }catch(error){
            console.error(error);
            toast.error("Error adding category")
        }finally{
            setLoading(false)
        }
    }   

    return (
        <div className="mx-2 mt-2" style={{height:'100vh', overflowY:'auto', overflowX:'hidden' }}>
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
                                    placeholder="Category Name"
                                    onChange={onChangeHandler}
                                    value={data.name}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    rows="5"
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    placeholder="Write context here..."
                                    onChange={onChangeHandler}
                                    value={data.description}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgcolor" className="form-label">Background Color</label>
                                <br />
                                <input type="color"
                                    name="bgColor"
                                    id="bgColor"
                                    placeholder="#ffffff"
                                    onChange={onChangeHandler}
                                    value={data.bgColour}
                                    
                                />
                            </div>
                            <button type="submit" 
                                    disabled={loading}
                                    className="btn btn-warning w-100">{loading ? "Loading.." : "Submit"}</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CategoryFrom
