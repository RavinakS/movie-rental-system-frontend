import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie";
import * as moment from "moment";
import Swal2 from "sweetalert2";

export default function UserRentsForAdmin(){
    const navigate = useNavigate()
    const { email, id } = useLocation().state;

    let [rents, setRents] = useState([]);
    const [cookies, setCookie] = useCookies(['token']);
    setCookie('token', cookies);

    const userTotalRents = () => {
        axios.get(`/user-rent?email=${email}`, {headers: {cookie: cookies}})
        .then((response) => {
            if(response.data.rents != 0){
                setRents(response.data.rents);
            }else{
                setRents(["No Rents"]);
            }
        })
        .catch((err) =>{
            try{
                console.log(err);
                if(!err.response.data.rents){
                    setRents(["No Rents"]);
                }
            }catch(err){
                console.log(err);
            }
        })
    }

    useEffect(()=>{
        userTotalRents()
    }, [])

    const fetchMovie = async (movie) =>{
        const today = new Date().toISOString().split('T')[0];
        console.log("I am inside.");

        const fetch_mov_details = {
            name: movie.name,
            rentDate: movie.rentDate,
            releasDate: movie.releasDate,
            fetchedOn: today,
            genre: movie.genre,
            user: email,
            user_id: id,
        }

        try{
            const fetch_movie = await axios.post('/fetch-movie', fetch_mov_details);

            if(fetch_movie.data.message != "success"){
                Swal2.fire({
                    icon: "error",
                    title: "Something went wrong.",
                })
                .then(()=>{
                    userTotalRents();
                })
            }else{
                Swal2.fire({
                    icon: "success",
                    title: "Successfully Done",
                })
                .then(()=>{
                    userTotalRents();
                })
            }
        }catch(err){
            console.log("err", err);
        }
    }

    return (
        <>
            <div class="pagetitle">
            <h1>Rents</h1>
                <nav>
                    <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li class="breadcrumb-item"><a href="/users">all users</a></li>
                    <li class="breadcrumb-item active">rents</li>
                    </ol>
                </nav>
            </div>
                <div className="row">
                {rents.map((movie) =>{
                    if(movie === "No Rents"){
                        return (
                            <p className="text-center text-danger">No Rents</p>
                        )
                    }else{
                        return(
                            <div className="col-md-3" key={ movie._id }>
                                <div className ="card">
                                    <div className="card-header text-center card-header-color" >
                                        <h5 className="movie-title" >{ movie.name }</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="genre">Genre: { movie.genre }</p>
                                        <p className ="releasDate">Release date: {moment(movie.releasDate).format('DD/MM/YYYY')}</p>
                                        <button type="button" className ="btn btn-primary" onClick={()=>{fetchMovie(movie)}}>Fetch</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }})}
            </div>
        </>
    )
}