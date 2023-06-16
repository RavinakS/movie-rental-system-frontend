import React, { useState } from "react";
// import './addMovie.css';
// import '../../../../App.css';
import axios from "axios";
import { useNavigate } from "react-router";
import Swal2 from "sweetalert2";
// import navButtons from "../../../helper/nav";
import Header from "./Header";

export default function Addmovie(){
    let navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];

    const [movie, setUser] = useState({
        name: "",
        genre: "",
        releasDate: "",
        avalCD: "",
        coins: ""
    })

    const handleChange = event =>{
        const {name, value} = event.target;
        setUser({
            ...movie,
            [name]: value
        })
    }

    const addingMovie = async () =>{
        const {name, genre, releasDate, avalCD, coins} = movie;
        if(name && genre && releasDate && avalCD && coins){
            if(avalCD<0 || coins <0){
                Swal2.fire({
                    icon : "error",
                    title : "rents or price must be a positive number."
                })
            }else if(releasDate > today){
                Swal2.fire({
                    icon: "error",
                    title: "Invalid Date"
                })
            }else{
                try{
                    var reg_name_lastname = /^[a-zA-Z\s]*$/;

                    if(!reg_name_lastname.test(movie.genre)){ 
                        Swal2.fire({
                            icon: "error",
                            title: "Correct Genre: only letters and spaces."
                        })
                    }else{
                        let res = await axios.post("/add-movie", movie);
                        await Swal2.fire({
                            icon : "success",
                            title : res.data.message
                        })
                        navigate('/admin-movie-page');
                    }
                }catch(error){
                    Swal2.fire({
                        icon : "error",
                        title : error.response.data.message
                    })
                }
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
            {Header()}
            <div className="App">
            <div className="addMovie">
                <h1>Movie Details</h1>
                <input 
                    type="text" 
                    name = "name" 
                    value = {movie.name} 
                    placeholder="Movie Name" 
                    onChange = { handleChange }>
                    </input>
                <input 
                    type="text" 
                    name = "genre" 
                    id="genre"
                    value = {movie.genre} 
                    placeholder="Genre" 
                    onChange = { handleChange }
                    ></input>
                <input 
                    type="date" 
                    name = "releasDate" 
                    max = {today}
                    value = {movie.releasDate} 
                    placeholder="Release Date" 
                    onChange = { handleChange }
                    ></input>
                <input 
                    type="number" 
                    name = "avalCD" 
                    value = {movie.avalCD} 
                    placeholder="rents" 
                    onChange = { handleChange }
                    ></input>
                <input 
                    type="number" 
                    name = "coins" 
                    value = {movie.coins} 
                    placeholder="price" 
                    onChange = { handleChange }
                    ></input>
                <button 
                className="button" 
                onClick = {addingMovie}
                >Add</button>
                
                <div>or</div>

                <div className="button" 
                onClick = {()=>{
                    navigate("/admin-movie-page")
                }} 
                >Back</div>
            </div>
        </div>
        </>
    )
};