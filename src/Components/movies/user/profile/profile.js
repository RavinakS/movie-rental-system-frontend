import React, {useState, useEffect} from "react";
import axios from "axios";
import './profile.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import Swal2 from "sweetalert2";
import EditProfile from '../editProfile/editProfile';

let check = false;
export default function UserProfile(){
    const navigate = useNavigate()

    let [userDetails, setUserDetails] = useState([]);
    let [cookies, setCookie] = useCookies(['token']);
    const [state, setState] = useState({});
    setCookie('token', cookies);

    const profileDetails = () => {
        axios.get('/view-profile', {headers: {cookie: cookies}})
        .then((response) => {
            if(Object.keys(response.data).length === 0){
                setUserDetails(["no_user"]);
            }else if(response.data.length === 1){
                setUserDetails(response.data);
            }else{
                setUserDetails(response.data.view_profile);
            }
        })
        .catch((err) =>{
            try{
                if(err.response.data.message === "No Rents"){
                    setUserDetails(["no_user"]);
                }
            }catch(err){
                console.log(err);
            }
        })
    }

    useEffect(()=>{
        profileDetails();
        return () =>{
            return setState({});
        }
    }, [])

    const total_rents = (rents) =>{
        if(rents>0){
            navigate('/total-rents', { state: { data: userDetails } });
            return;
        }
        Swal2.fire({
            icon: "error",
            title: "No Rents Available."
        })
        .then(()=>{
            profileDetails();
        })
    }

    return (
        <>
            <div class="pagetitle">
            <h1>Your Profile</h1>
            <nav>
                <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item active">Profile</li>
                </ol>
            </nav>
            </div>
            {userDetails.map((data, key) =>{
                if(data === "no_user"){
                    return (
                    <div class="row">
                        <div className ="card border-warning">
                            <div className="card-body">
                                <p className="text-center text-danger">You are not logged in.</p>
                            </div>
                        </div>
                    </div>
                    )
                }else if(userDetails.length === 1){
                    return (
                        <div className="user" key={data._id}>
                            <div class="row">
                                <div class="col-xl-4">
                                <div class="card">
                                    <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
            
                                    <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"/>
                                    <h2>{data.name}</h2>
                                    <h3>{data.role}</h3>
                                    <div class="social-links mt-2">
                                        <a href="/profile" class="twitter"><i class="bi bi-twitter"></i></a>
                                        <a href="/profile" class="facebook"><i class="bi bi-facebook"></i></a>
                                        <a href="/profile" class="instagram"><i class="bi bi-instagram"></i></a>
                                        <a href="/profile" class="linkedin"><i class="bi bi-linkedin"></i></a>
                                    </div>
                                    </div>
                                </div>
                                </div>
            
                                <div class="col-xl-8">
                                    <div class="card">
                                        <div class="card-body pt-3">
                                        {/* <!-- Bordered Tabs --> */}
                                            <ul class="nav nav-tabs nav-tabs-bordered">
            
                                                <li class="nav-item">
                                                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                                </li>
            
                                                <li class="nav-item">
                                                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                                </li>
            
                                            </ul>
                                        
                                            <div class="tab-content pt-2">
            
                                                <div class="tab-pane fade show active profile-overview" id="profile-overview">
                                                <h5 class="card-title">About</h5>
                                                <p class="small fst-italic">You have not yet updated your Bio</p>
            
                                                <h5 class="card-title">Profile Details</h5>
            
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label ">Full Name</div>
                                                    <div class="col-lg-9 col-md-8">{data.name}</div>
                                                </div>
            
            
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Country</div>
                                                    <div class="col-lg-9 col-md-8">India</div>
                                                </div>
            
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Email</div>
                                                    <div class="col-lg-9 col-md-8">{data.email}</div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Wallet(Rs)</div>
                                                    <div class="col-lg-9 col-md-8">{data.coins} Rs.</div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Total Rents</div>
                                                    <div class="col-lg-9 col-md-8">{data.rent}</div>
                                                </div>
                                                {/* <div class="text-center"> */}
                                                <button 
                                                    id="rents" 
                                                    type="submit" 
                                                    class="btn btn-primary"
                                                    onClick={()=>{
                                                        total_rents(data.rent)
                                                    }}
                                                    >View Total Rents
                                                </button>
                                                {/* </div> */}
            
                                                </div>
            
                                                <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
            
                                                {/* <!-- Profile Edit Form --> */}
                                                    < EditProfile UserData = {{data: data}} />
                                                {/* <!-- End Profile Edit Form --> */}
            
                                                </div>
            
                                            </div>
                                            {/* <!-- End Bordered Tabs --> */}
            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                }else{
                    if(!check){
                        check = true
                        return (
                        <div className="user" key={data[0]._id}>
                            <div class="row">
                                <div class="col-xl-4">
                                <div class="card">
                                    <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
            
                                    <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"/>
                                    <h2>{data[0].name}</h2>
                                    <h3>{data[0].role}</h3>
                                    <div class="social-links mt-2">
                                        <a href="/profile" class="twitter"><i class="bi bi-twitter"></i></a>
                                        <a href="/profile" class="facebook"><i class="bi bi-facebook"></i></a>
                                        <a href="/profile" class="instagram"><i class="bi bi-instagram"></i></a>
                                        <a href="/profile" class="linkedin"><i class="bi bi-linkedin"></i></a>
                                    </div>
                                    </div>
                                </div>
                                </div>
            
                                <div class="col-xl-8">
                                    <div class="card">
                                        <div class="card-body pt-3">
                                        {/* <!-- Bordered Tabs --> */}
                                            <ul class="nav nav-tabs nav-tabs-bordered">
            
                                                <li class="nav-item">
                                                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                                </li>
            
                                                <li class="nav-item">
                                                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                                </li>
            
                                            </ul>
                                        
                                            <div class="tab-content pt-2">
            
                                                <div class="tab-pane fade show active profile-overview" id="profile-overview">
                                                <h5 class="card-title">About</h5>
                                                <p class="small fst-italic">You have not yet updated your Bio</p>
            
                                                <h5 class="card-title">Profile Details</h5>
            
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label ">Full Name</div>
                                                    <div class="col-lg-9 col-md-8">{data[0].name}</div>
                                                </div>
            
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Country</div>
                                                    <div class="col-lg-9 col-md-8">India</div>
                                                </div>
            
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Email</div>
                                                    <div class="col-lg-9 col-md-8">{data[0].email}</div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Wallet(Rs)</div>
                                                    <div class="col-lg-9 col-md-8">{data[0].coins} Rs.</div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-4 label">Total Rents</div>
                                                    <div class="col-lg-9 col-md-8">{userDetails[1].length}</div>
                                                </div>
                                                {/* <div class="text-center"> */}
                                                <button 
                                                    id="rents" 
                                                    type="submit" 
                                                    class="btn btn-primary"
                                                    onClick={()=>{
                                                        total_rents(userDetails[1].length)
                                                    }}
                                                    >View Total Rents
                                                </button>
                                                {/* </div> */}
            
                                                </div>
            
                                                <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
            
                                                {/* <!-- Profile Edit Form --> */}
                                                < EditProfile UserData = {{data: data[0]}} />
                                                {/* <!-- End Profile Edit Form --> */}
            
                                                </div>
            
                                            </div>
                                            {/* <!-- End Bordered Tabs --> */}
            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                }
            })}
        </>
    )
}