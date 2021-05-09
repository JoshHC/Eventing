import React, { Component, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';


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
            console.log(res);
            sessionStorage.setItem('UserToken', res.data.token);
            history.push("/index");
        }
        catch (error) {
            Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'Contraseña o Usuario Incorrectos'
          })
          setemail("");
          setpassword("");
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
        <div className="container">
            <div className="row">
                <div className="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <div className="card rounded shadow shadow-sm">
                                <div className="card-header">
                                    <img src="images/LoginLogo.png" className="rounded mx-auto d-block" classwidth='100' height='100'/>
                                </div>
                                <div className="card-body">
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