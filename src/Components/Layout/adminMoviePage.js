import React, {useState, useEffect} from "react";
import axios from "axios";
import * as moment from "moment";
// import './adminMoviePage.css';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Swal2 from "sweetalert2";
// import navButtons from "../../helper/nav";
// import Footer from "../../helper/footer";

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
            return(
                <div className="col-md-4" key={movie._id}>
                    <div className ="card">
                        <div className="card-header text-center" >
                            <h5 className="movie-title" >{movie.name}</h5>
                        </div>
                        <img src="assets/img/card.jpg" class="card-img-top" alt="..."/>
                        <div className="card-body">
                            <p className="release-date">Release date: {moment(movie.releasDate).format('DD/MM/YYYY')}</p>
                            <p className="genre">Genre: {movie.genre}</p>
                            <p className ="Available rents">Available rents: {movie.avalCD}</p>
                            <p className ="coins">Price: ${movie.coins}</p>
                            {/* <Link to={{pathname: `${'/movies/update-movie'}?name=${movie.name}`}}>
                                <button className="btn btn-primary" style={{'marginRight': '28px'}}>Update</button>
                            </Link>
                            <button className="btn btn-primary" style={{'marginRight': '28px'}} onClick={() => {handleClick(movie.name)}} >Delete</button>
                            <Link to={{pathname: `${'/rent-details'}?name=${movie.name}`}}>
                                <button className="btn btn-primary" style={{'marginRight': '28px'}}>Rent Details</button>
                            </Link>
                            <Link to={{pathname: `${'/history'}?name=${movie.name}`}}>
                                <button className="btn btn-primary">History</button>
                            </Link> */}
                        </div>
                    </div>
                </div>
            )
        }));


    const handleClick = (m_name) => {
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
            }if(err.response.status === 404){

            }
            else{
                console.log(err)
            }
        })
    }

    return (
        <>
            {/* <nav className="navbar navbar-expand-lg navbar-light">
                <div className="collapse navbar-collapse">
                    {navButtons()} 
                </div>
            </nav> */}
            {/* <header>
                <h1 className="text-center text-success my-15">Movies</h1>
                <div className="container">
                    <button 
                        className="btn btn-primary" 
                        id="admin" 
                        style={{'marginRight': '5px'}} 
                        onClick={() => {navigate('/users')}}
                        >Users
                    </button>
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
                        style={{'marginLeft': '24%'}} 
                        placeholder="Search...."
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                            searchMovie(event.target.value);
                        }} 
                    /> 
                    <button 
                        className="btn btn-primary" 
                        id="admin" 
                        style={{'marginLeft': '2%'}} 
                        onClick={() => {navigate('/movies/add-movie')}}>
                        Add Movie
                    </button>
                </div>
            </header> */}
            {/* <div className="container"> */}
                <div className="row">
                    {displayMovies}
                </div>
                <div>
                    <ReactPaginate
                        previousLabel = {"<<<"}
                        nextLabel = {">>>"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            {/* </div> */}
            {/* <div className="container">
                <div className="button text-center" onClick = {()=>{
                    navigate("/user-movie-page")
                }}>Movies</div>
            </div> */}
            {/* <footer className= "page-footer font-small blue" >
                {Footer()}
            </footer> */}
        </>
    )
}

