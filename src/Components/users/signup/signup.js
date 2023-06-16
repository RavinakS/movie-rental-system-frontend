import React, { useState } from "react";
import './signup.css';
import '../../../App.css';
import axios from "axios";
import { useNavigate } from "react-router";
import Swal2 from "sweetalert2";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Signup(){
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [passwordShown, setPasswordShown] = useState(false);

    const handleChange = event =>{
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const signUp = (e) =>{
        // e.preventDefault();
        const {name, email, password} = user;
        if(name && email && password){
            axios.post("/create-account", user)
            .then((res)=>{
                Swal2.fire({
                    icon : "success",
                    title : res.data.message
                })
                return res
            })
            .then((res)=>{
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("role", "User");
            })
            .then(()=>{
                navigate('/');
            })
            .catch((error)=>{
                Swal2.fire({
                    icon : "error",
                    title : error.response.data.message
                })
            })
        }else{
            Swal2.fire({
                icon : "error",
                title : "Invalid Inputs"
            })
        }

    }

    const validationSchema = Yup.object().shape({

        name: Yup.string()
            .required('Name is required'),
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
                                <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                                <p class="text-center small">Enter your personal details to create account</p>
                                </div>

                                <form class="row g-3 needs-validation" novalidate>
                                <div class="col-12">
                                    <label for="yourName" class="form-label">Your Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        class="form-control" 
                                        id="yourName" 
                                        {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        value = {user.name}
                                        onChange = { handleChange }
                                    />
                                    <div class="invalid-feedback">Please, enter your name!</div>
                                </div>

                                <div class="col-12">
                                    <label for="yourEmail" class="form-label">Your Email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        class="form-control" 
                                        id="yourEmail" 
                                        {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value = {user.email}
                                        onChange = { handleChange }
                                    />
                                    <div class="invalid-feedback">Please enter a valid Email adddress!</div>
                                </div>

                                <div class="col-12">
                                    <label for="yourPassword" class="form-label">Password</label>
                                    <input 
                                        type={passwordShown ? "text" : "password"}
                                        name="password" 
                                        class="form-control" 
                                        id="yourPassword" 
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
                                        name="terms" 
                                        type="checkbox" 
                                        value="" 
                                        id="acceptTerms" 
                                        onClick={togglePasswordVisiblity} 
                                        required
                                    />View Password
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-primary w-100"  onClick ={handleSubmit(signUp)} type="submit">Create Account</button> 
                                </div>
                                <div class="col-12">
                                    <p class="small mb-0">Already have an account? <a href="http://localhost:3006/login">Log in</a></p>
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
};