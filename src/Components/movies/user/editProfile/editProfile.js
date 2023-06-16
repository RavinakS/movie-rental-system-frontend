import React, { useState } from "react";
import './editProfile.css';
import '../../../../App.css';
import axios from "axios";
import { useNavigate } from "react-router";
import Swal2 from "sweetalert2";


export default function EditProfile(props){
    let navigate = useNavigate();
    
    const [user, setUser] = useState(props.UserData.data)


    const handleChange = event =>{
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const updatingUser = () =>{
        const {name, email, role, coins} = user;
        if(name && email && role && coins>0){
            user["id"] = props.UserData.data._id;
            try{
                var reg_name_lastname = /^[a-zA-Z\s]*$/;

                if(!reg_name_lastname.test(name)){ 
                    Swal2.fire({
                        icon: "error",
                        title: "Correct Genre: only letters and spaces."
                    })
                }else{
                    axios.put(`/edit-profie?id=${props.UserData.data._id}`, user)
                    .then((res)=>{
                        Swal2.fire({
                            icon : "success",
                            title : res.data
                        })
                        return res;
                    })
                    .then(()=>{
                        navigate('/profile');
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                }
            }catch(error){
                Swal2.fire({
                    icon : "error",
                    title : error.response.data.message
                })
                console.log(error.response.data);
            }
        }else{
            if(coins <= 0){
                Swal2.fire({
                    icon : "error",
                    title : "Valet can't be zero or less then zero."
                })
                .then(()=>{
                    handleChange()
                })
            }else{
                Swal2.fire({
                    icon : "error",
                    title : "Invalid Inputs"
                })
            }
        }

    }

    return (
        <>
            <form>
                <div class="row mb-3">
                <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                <div class="col-md-8 col-lg-9">
                    <img src="assets/img/profile-img.jpg" alt="Profile"/>
                    <div class="pt-2">
                    <a href="#" class="btn btn-primary btn-sm" title="Upload new profile image"><i class="bi bi-upload"></i></a>
                    <a href="#" class="btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></a>
                    </div>
                </div>
                </div>

                <div class="row mb-3">
                <label htmlFor="name" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
                <div class="col-md-8 col-lg-9">
                    <input 
                        type="text" 
                        class="form-control" 
                        id="fullName" 
                        placeholder="Name" 
                        name="name" 
                        value= {user.name} 
                        onChange = { handleChange }
                        >
                    </input>
                </div>
                </div>

                <div class="row mb-3">
                <label htmlFor="Country" class="col-md-4 col-lg-3 col-form-label">Role</label>
                <div class="col-md-8 col-lg-9">
                    <input 
                        type="text" 
                        class="form-control" 
                        id="Country" 
                        name="role" 
                        value={user.role} 
                        disabled 
                        onChange = { handleChange }
                    />
                </div>
                </div>


                <div class="row mb-3">
                <label htmlFor="Email" class="col-md-4 col-lg-3 col-form-label">Email</label>
                <div class="col-md-8 col-lg-9">
                    <input 
                        type="email" 
                        class="form-control" 
                        id="Email" 
                        name="email" 
                        value={user.email} 
                        onChange = { handleChange }
                    />
                </div>
                </div>

                <div class="row mb-3">
                <label htmlFor="coins" class="col-md-4 col-lg-3 col-form-label">Wallet(Rs)</label>
                <div class="col-md-8 col-lg-9">
                    <input 
                        type="number" 
                        class="form-control" 
                        id="coins" 
                        name="coins" 
                        value={Number(user.coins)} 
                        onChange = { handleChange }
                    />
                </div>
                </div>
                
                <div class="text-center">
                <button 
                    type="submit" 
                    class="btn btn-primary" 
                    onClick = {()=>{updatingUser()}}
                    >Save Changes
                </button>
                </div>
            </form> 
            
        </>
    )
};
