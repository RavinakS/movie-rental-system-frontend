import React, { useState } from "react";
import './addUser.css';
import '../../../../App.css';
import axios from "axios";
import { useNavigate } from "react-router";
import Swal2 from "sweetalert2";
// import navButtons from "../../../helper/nav";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
// const eye = <FontAwesomeIcon icon={faEye} />;

export default function Adduser(){
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    })

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleChange = event =>{
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const createUser = async () =>{
        const {name, email, role, password} = user;
        
        if(name && email && role && password){
            try{
                let res = await axios.post("/create-user", user);
                
                await Swal2.fire({
                    icon : "success",
                    title : res.data.message
                })
                
                navigate('/admin-movie-page');
            }catch(error){
                Swal2.fire({
                    icon : "error",
                    title : error.response.data.message
                })
            }
        }else{
            Swal2.fire({
                icon : "error",
                title : "Invalid Inputs"
            })
        }

    }

    return (
        <>  
            <div class="pagetitle">
                <h1>User Registration</h1>
            <nav>
                <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="/users">Users</a></li>
                <li class="breadcrumb-item active">add user</li>
                </ol>
            </nav>
            </div>
            <div align="center">
            <div className="App">
                <div className="addUser">
                    <h1>User Details</h1>
                    <input 
                        type="text" 
                        name = "name" 
                        value = {user.name} 
                        placeholder="Name" 
                        onChange = { handleChange }>
                    </input>
                    <input 
                        type="text" 
                        name = "email" 
                        value = {user.email} 
                        placeholder="Email" 
                        onChange = { handleChange }>
                    </input>
                    <input 
                        type="text" 
                        name = "role" 
                        value = {user.role} 
                        placeholder="Role" 
                        onChange = { handleChange }>
                    </input>
                    <input 
                        type={passwordShown ? "text" : "password"} 
                        name="password" 
                        placeholder="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <div class="col-6">
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        name="remember" 
                        value="true" 
                        id="rememberMe" 
                        onClick={togglePasswordVisiblity}>
                    </input>
                    View Password
                    </div>
                    <br></br>
                    <button 
                        className="button" 
                        onClick = {createUser}>
                        Submit
                    </button>
                </div>
            </div>
            </div>
        </>
        
    )
};