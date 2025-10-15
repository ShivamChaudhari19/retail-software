import { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import "./Login.css"
import { toast } from "react-toastify";
import { login } from "../../service/AuthService";
import { AppContext } from "../../context/AppContext";

const Login = () => {
    const {setAuthData} = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email:"",
        password:"",
    });

    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
<<<<<<< HEAD
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
           const response = await login(data);
           if(response.status ===  200){
            toast.success("Login Sucessfull");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            setAuthData(response.data.token, response.data.role)
            navigate("./dashboard")
           }
        }catch(error) {
            console.error(error);

            toast.error("Email or password Invalid")
        }finally{
            setLoading(false);
        }
=======
        // setData((data) => )
>>>>>>> d5c1893fe1dad2d7a3fc6a8399cc431c33fdd734
    }

    
    return (
        <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background">
            <div className="card shoadow-lg w-100" style={{ maxWidth: '480px' }}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="card-title">Sign in</h1>
                        <p className="card-text text-muted">
                            Sign in before to access account
                        </p>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-muted">
                                    Email address
                                </label>
                                <input type="text" name="email" id="email" placeholder="yourname@example.com" className="form-control" onChange={onChangeHandler}value={data.email}/>
                            </div>
                            <div className="mb-4">
                                 <label htmlFor="password" className="form-label text-muted">
                                    Password
                                </label>
                                <input type="password" name="password" id="passowrd" placeholder="******" className="form-control" onChange={onChangeHandler} value={data.password}/>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>
                                    {loading ? "Loading..." : "Sign in"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
