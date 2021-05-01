import React, { Component, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";


function LoginContainer() {

    const history = useHistory();

    const [email, setemail] = useState('');

    const [password, setpassword] = useState('');

    const headers = {
        'Content-Type': 'text/json'
    }

    const login = async () => {
        const params = {
            username: email, 
            password
        }
        try {
            const res = await axios.post(process.env.REACT_APP_LOGIN, params, headers)
            sessionStorage.setItem('UserToken', res.data.token);
            history.push("/index");
        }
        catch (error) {
            console.log(error);
        }

    }

    const handleChangeemail = e => {
        const email = e.target.value;
        setemail(email);
    }

    const handleChangepassword = e => {
        const password = e.target.value;
        setpassword(password);
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 mx-auto">
                            <div class="card rounded shadow shadow-sm">
                                <div class="card-header">
                                    <h3 class="mb-0">Login</h3>
                                </div>
                                <div class="card-body">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" placeholder="Enter email"
                                            value={email}
                                            onChange={handleChangeemail} />
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password"
                                            value={password}
                                            onChange={handleChangepassword} />
                                    </div>

                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-success btn-lg btn-block" onClick={() => login()}>Sign in</button>
                                    <p className="forgot-password text-center">
                                        <a href="#">Forgot password?</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginContainer;