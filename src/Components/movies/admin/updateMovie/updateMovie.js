import React, { useState, useEffect } from "react";
import './updateMovie.css';
// import '../../../../App.css';
import axios from "axios";
import { useNavigate } from "react-router";
import Swal2 from "sweetalert2";
import { useLocation } from 'react-router-dom';


export default function UpdateMovie(){
    let navigate = useNavigate();
    const search = useLocation().search;
    const m_name = new URLSearchParams(search).get('name');
    const today = new Date().toISOString().split('T')[0];

    const getMovieDetails = async (name) => {
        try{
            const m_details = await axios.get(`/get-movie/${name}`);
            setMovie(m_details.data);

        }catch(err){
            Swal2.fire({
                icon : "error",
                title : "Something went wrong, check console"
            })
            console.log(err);
        }
    }

    useEffect(()=>{
        getMovieDetails(m_name)
    }, [])
    
    const [movie, setMovie] = useState({
        name: "",
        genre: "",
        releasDate: "",
        avalCD: 0,
        coins: 0
    })

    const handleChange = event =>{
        const {name, value} = event.target;
        setMovie({
            ...movie,
            [name]: value
        })
    }

    const updatingMovie = async () =>{
        const {name, genre, releasDate, avalCD, coins} = movie;
        if(coins < 0){
            Swal2.fire({
                icon : "error",
                title : "Price can't be a negative number."
            })
        }
        else if(name && genre && releasDate && avalCD>=0 && coins){
            movie["old_name"] = m_name
            try{
                var reg_name_lastname = /^[a-zA-Z\s]*$/;

                if(!reg_name_lastname.test(movie.genre)){ 
                    Swal2.fire({
                        icon: "error",
                        title: "Correct Genre: only letters and spaces."
                    })
                }else if(movie.releasDate > today){
                    Swal2.fire({
                        icon: "error",
                        title: "Invalid Date"
                    })
                } else{
                    let res = await axios.put("/update-movie", movie);
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
                console.log(error.response.data);
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
            <h1>Edit Movie</h1>
            <nav>
                <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="/admin-movie-page">Movies</a></li>
                <li class="breadcrumb-item active">Update</li>
                </ol>
            </nav>
            </div>
            <div align="center">
            <div className="updateMovie">
                <h1>Movie Details</h1>

                <details>
                    <summary>{m_name}</summary>
                    <p>The Old Movie Name</p>
                </details>
                <input 
                    type="text" 
                    name = "name" 
                    value = {movie.name} 
                    placeholder="Movie Name" 
                    onChange = { handleChange }
                    ></input>
                <input 
                    type="text" 
                    name = "genre" 
                    value = {movie.genre} 
                    placeholder="Genre" 
                    onChange = { handleChange }
                    ></input>
                <input 
                    type="date" 
                    max = {today} 
                    name = "releasDate" 
                    value = {movie.releasDate.substring(0, 10)} 
                    placeholder="Release Date" 
                    onChange = { handleChange }
                    ></input>
                <input 
                    type="number" 
                    name = "avalCD" 
                    value = {Number(movie.avalCD)} 
                    placeholder="rents" 
                    onChange = { handleChange }
                    ></input>
                <input 
                    type="number" 
                    name = "coins" 
                    value = {Number(movie.coins)} 
                    placeholder="price" 
                    onChange = { handleChange }
                    ></input>

                <button 
                    className="button" 
                    onClick = {updatingMovie}
                    >Update
                </button>
            </div>
            </div>
        </>
    )
};