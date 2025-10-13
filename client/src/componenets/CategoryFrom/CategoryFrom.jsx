import { useState } from "react"
import uplode from "../assets/uplode.png"

const CategoryFrom = () => {

    const [loading, setLoding] = useState(fales);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        descripation: "",
        bgColor: "#ffffff",
    });



    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    <img src={image ? URL.createObjectURL(image) : assets.uplode} alt="" width={48} />
                                </label>
                                <input type="file" name="image" id="image" className="form-controle" hidden onChange={(e) => setImage()}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">CName</label>
                                <input type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="Category Name"
                                    onChange={onChangeHandler}
                                    value={data.name}
                                />
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
                            <div className="mb-3">
                                <label htmlFor="bgcolor" className="form-label">Background Color</label>
                                <br />
                                <input type="color"
                                    name="bgcolor"
                                    id="bgcolor"
                                    placeholder="#ffffff"
                                    onChange={onChangeHandler}
                                    value={data.bgColor}
                                />
                            </div>
                            <button type="submit" className="btn btn-warning w-100">Save</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CategoryFrom
