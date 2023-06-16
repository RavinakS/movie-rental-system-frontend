import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal2 from "sweetalert2";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
require('dotenv').config();


const Login = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleChange = event => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = (e) => {
        let { email, password } = user;
        if (email && password) {
            axios.post('/login', user)
            .then((res)=>{
                Swal2.fire({
                    icon : "success",
                    title : "Logged in Successfully."
                })
                return res
            })
            .then((res)=>{
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("role", res.data.role);
                navigate('/');
            })
            .catch ((err)=>{
                Swal2.fire({
                    icon : "error",
                    title : err.response.data.message
                })
            }) 
        }else{
            Swal2.fire({
                icon : "error",
                title : "Invalid input"
            })
        }
    }

    const validationSchema = Yup.object().shape({

        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid')
            .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
        <>
            <div class="container">
                <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                        <div class="d-flex justify-content-center py-4">
                            <a href="http://localhost:3006" class="logo d-flex align-items-center w-auto">
                            <img src="assets/img/logo.png" alt=""/>
                            <span class="d-none d-lg-block">Movie Rental System</span>
                            </a>
                        </div>

                        <div class="card mb-3">

                            <div class="card-body">

                            <div class="pt-4 pb-2">
                                <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                <p class="text-center small">Enter your email id & password to login</p>
                            </div>

                            <form class="row g-3 needs-validation" novalidate>

                                <div class="col-12">
                                <label for="yourUsername" class="form-label">Email</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                                    <input 
                                        type="text" 
                                        name="email" 
                                        class="form-control" 
                                        placeholder="Enter your Email"
                                        {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                    <div class="invalid-feedback">Please enter a correct email id.</div>
                                </div>
                                </div>

                                <div class="col-12">
                                    <label for="yourPassword" class="form-label">Password</label>
                                    <input 
                                        type={passwordShown ? "text" : "password"} 
                                        name="password" 
                                        class="form-control" 
                                        placeholder="password"
                                        {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                    <div class="invalid-feedback">Please enter your password!</div>
                                </div>

                                <div class="col-12">
                                <div class="form-check">
                                    <input 
                                        class="form-check-input" 
                                        type="checkbox" 
                                        name="remember" 
                                        value="true" 
                                        id="rememberMe" 
                                        onClick={togglePasswordVisiblity}
                                    />View Password
                                </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-primary w-100" onClick = { handleSubmit(login) } >Login</button>
                                </div>

                                <div class="or-container">
                                    <div class="line-separator"></div>
                                    <div class="or-label text-center">or</div>
                                    <div class="line-separator"></div>
                                </div>
                                    <div class="col-12"> 
                                        <a class="btn btn-primary w-100 btn-google btn-block btn-outline" 
                                            href="http://localhost:3040/auth/google">
                                            <img src="https://img.icons8.com/color/16/000000/google-logo.png"/> 
                                        Login With Google
                                        </a> 
                                    </div>

                                <div class="col-12">
                                <p class="small mb-0">Don't have account? <a href="http://localhost:3006/create-account">Create an account</a></p>
                                </div>
                            </form>

                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                </section>

            </div>
        </>
    )
}

export default Login;