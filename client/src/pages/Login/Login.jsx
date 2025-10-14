import { useState } from "react";
import "./Login.css"

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email:"",
        password:"",
    });

    const onChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        // setData((data) => )
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
                                <button type="submit" className="btn btn-dark btn-lg">
                                    Sign in
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
