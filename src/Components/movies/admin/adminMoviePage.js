import React, {useState, useEffect} from "react";
import axios from "axios";
import * as moment from "moment";
import './adminMoviePage.css';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Swal2 from "sweetalert2";

export default function AdminMoviepage(){
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [state, setState] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [totalNumMovies, setTotalNumMovies] = useState(0);
    const myPageNumber = 1

    const [dates, setDates] = useState({
        fromDate: "",
        toDate: ""
    });

    const moviesPerPage = 6;
    const pageCount = Math.ceil(totalNumMovies / moviesPerPage);
    const today = new Date().toISOString().split('T')[0];


    const changePage = ({ selected }) => {
        moviePage(selected+1);
    }

    const handleDate = (e) =>{
        const {name, value} = e.target;
        setDates({
            ...dates,
            [name]: value
        })
    };

    const moviePage = (myPageNumber=1) =>{
        axios.get(`/movie-page?_pageNum=${myPageNumber}&_limit=${moviesPerPage}&_toDate=${dates.toDate}&_fromDate=${dates.fromDate}&_search=${searchTerm}`)   
        .then((response) => {
            setTotalNumMovies(response.data.total_movies)
            return setMovies(response.data.movies);
        })
        .catch((err)=>{
            console.log(err);
            alert(err.response)
        })
    }

    useEffect(()=>{
        moviePage();
        return () =>{
            return setState({});
        }
    }, []);

    const sortByReleasDate = () =>{
        const { toDate, fromDate } = dates;
        if(toDate && fromDate){
            axios.get(`/movie-page?_pageNum=${myPageNumber}&_limit=${moviesPerPage}&_toDate=${toDate}&_fromDate=${fromDate}&_search=${searchTerm}`)
            .then((response) =>{
                setTotalNumMovies(response.data.total_movies)
                return setMovies(response.data.movies);
            })
            .catch((err) =>{ 
                Swal2.fire({
                    icon : "error",
                    title : err.response.data
                })
            })
        }else{
            Swal2.fire({
                icon : "error",
                title : "Please ensure you pick two dates"
            })
        }
    }

    const searchMovie = (value) =>{
        axios.get(`/movie-page?_pageNum=${myPageNumber}&_limit=${moviesPerPage}&_toDate=${dates.toDate}&_fromDate=${dates.fromDate}&_search=${value}`)
        .then((response) =>{
            console.log(response.data.movies)
            setTotalNumMovies(response.data.total_movies)
            return setMovies(response.data.movies);
        })
        .catch((err) =>{ 
            Swal2.fire({
                icon : "error",
                title : err.response.data
            })
        })
    }

    const displayMovies = movies
        .map((movie => {
            if (movie.image) {
                var image = "http://localhost:3040/"+movie.image;
            }else{
                var image = "assets/img/card.jpg"
            }
            return(
                <div className="col-md-4" key={movie._id}>
                    <div className ="card">
                        <h5 className="card-title" style={{'marginLeft': '20px'}} >{movie.name}</h5>
                        <img src={image} class="card-img-top" alt="..."/>
                        <div className="card-body">
                            <p className="release-date">Release date: {moment(movie.releasDate).format('DD/MM/YYYY')}</p>
                            <p className="genre">Genre: {movie.genre}</p>
                            <p className ="Available rents">Available rents: {movie.avalCD}</p>
                            <p className ="coins">Price: ₹ {movie.coins}</p>
                            <Link to={{pathname: `${'/movies-update-movie'}?name=${movie.name}`}}>
                                <button className="btn btn-primary" style={{'marginRight': '20px'}}>Update</button>
                            </Link>
                            <button className="btn btn-primary" onClick={() => {handleClick(movie.name)}} style={{'marginRight': '20px'}} >Delete</button>

                            <Link to={{pathname: `${'/rent-details'}?name=${movie.name}`}}>
                                <button className="btn btn-primary" style={{'marginRight': '20px'}}>Rent Details</button>
                            </Link>
                            <Link to={{pathname: `${'/history'}?name=${movie.name}`}}>
                                <button className="btn btn-primary" style={{'marginRight': '20px'}}>History</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }));

    
    function confirmation() {
        let person = prompt(`Are you sure?, you want to delete this movie?`, "yes");
        
        if (person === null) {
            return 'no'
        }
        else if (person.toLowerCase() === 'no') {
            return 'no'
        }else if(person.toLowerCase() === 'yes'){
            return 'yes'
        }
        else{
            return 'inValid';
        }
    }

    const handleClick = (m_name) => {

        const isConfirm = confirmation();

        if (isConfirm === 'no') {
            return false;
        }else if (isConfirm === 'inValid') {
            Swal2.fire({
                icon: "error",
                title: `please type yes/no, wrong input.`
            })
        }else{
            axios.delete(`/delete-movie/${m_name}`)
            .then((res)=>{
                if(res.data === "token_not_found"){
                    navigate('/login');
                }else if(res.status === 205 || res.status === 202){
                    Swal2.fire({
                        icon : "error",
                        title : "Movie is being used."
                    })
                    .then(()=>{
                        return moviePage();
                    })
                }
                else{
                    Swal2.fire({
                        icon : "success",
                        title : "Successfully Deleted"
                    })
                    .then(()=>{
                        return moviePage();
                    })
                }
            })
            .catch((err) =>{
                if(err === "token_not_found"){
                    navigate('/login')
                }
                else{
                    console.log(err)
                }
            })
        }
    }

    return (
        <>  
            <div class="pagetitle">
            <h1>Movies</h1>
            <nav>
                <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item active">Movies</li>
                </ol>
            </nav>
            </div>
            <input 
                type="date" 
                date = "fromDate" 
                name="fromDate"
                max = {today}
                value = {dates.fromDate} 
                placeholder="To Date" 
                onChange = { handleDate }
            ></input>
            <input 
                type="date" 
                name="toDate"
                max = {today}
                value = {dates.toDate} 
                placeholder="From Date" 
                style={{'marginRight': '5px'}}
                onChange = { handleDate }
            ></input>
            <button 
                className="btn btn-primary" 
                id="sortByReleasDate" 
                style={{'marginRight': '65px'}} 
                onClick={() => {sortByReleasDate()}}
                >Filter
            </button>
            <input 
                type="text" 
                id="search" 
                style={{'marginLeft': '52%'}} 
                placeholder="Search...."
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                    searchMovie(event.target.value);
                }} 
            /> 

                <div className="row">
                    {displayMovies}
                    <ReactPaginate
                        previousLabel = {"<<"}
                        nextLabel = {">>"}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        marginPagesDisplayed={4}
                        pageRangeDisplayed={4}
                        onPageChange={changePage}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
        </>
    )
}

