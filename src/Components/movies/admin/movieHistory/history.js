import React, {useState, useEffect} from "react";
import axios from "axios";
import './history.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import ReactPaginate from "react-paginate";
import * as moment from "moment";
import { useLocation } from 'react-router-dom';


export default function MovieHistory(){
    const navigate = useNavigate();
    const search = useLocation().search;
    const movieName = new URLSearchParams(search).get('name');

    const [movieHistoryDetails, setMovieHistoryDetails] = useState([]);
    const [cookies, setCookie] = useCookies(['token']);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    setCookie('token', cookies);

    const moviePerPage = 12;
    const pagesVisited = moviePerPage * pageNumber;
    const pageCount = Math.ceil(movieHistoryDetails.length / moviePerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const movieHistoryPage = async () =>{        
        try{

            const response = await axios.get(`/movie-history?m_name=${movieName}`, {headers: {cookie: cookies}})
            
            if(response.data === 'noHistory' || response.data === ''){
                setMovieHistoryDetails(["noHistory"]);
            }else{
                console.log("History", response.data);
                setMovieHistoryDetails(response.data);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        movieHistoryPage();
    }, []);

    const displayMovieHistory = () =>{
        return (
            movieHistoryDetails
            .filter((movie) =>{
                if(searchTerm === ""){
                    return movie;
                }else if(movie.name != undefined){
                    if(movie.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return movie;
                    }
                }
            })
            .map((movie => {
                if(movie === "noHistory"){
                    return(
                        <div class="pagetitle">
                        <h1>History</h1>
                        <nav>
                            <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li class="breadcrumb-item"><a href="/admin-movie-page">Movies</a></li>
                            <li class="breadcrumb-item active">History</li>
                            </ol>
                            <h1 className="text-center">No History</h1>
                        </nav>
                        </div>
                    )
                }else if(!movie.hasOwnProperty('returnDate')){
                    return(
                        <div className="col-md-3" key={movie._id}>
                        <div className ="card">
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="email">User: {movie.user}</p>
                                <p className ="role">Rent Date: {moment(movie.rentDate).format('DD/MM/YYYY')}</p>
                                <p className="rents">Fetch Date: {moment(movie.fetchedOn).format('DD/MM/YYYY')}</p>
                                <p className="rents">Movie Release Date: {moment(movie.releasDate).format('DD/MM/YYYY')}</p>
                                <p className="rents">Genre: {movie.genre}</p>
                            </div>
                        </div>
                    </div>
                    )
                }
                return(
                    <div className="col-md-3" key={movie._id}>
                        <div className ="card">
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="email">User: {movie.user}</p>
                                <p className ="role">Rent Date: {moment(movie.rentDate).format('DD/MM/YYYY')}</p>
                                <p className="rents">Return Date: {moment(movie.returnDate).format('DD/MM/YYYY')}</p>
                                <p className="rents">Movie Release Date: {moment(movie.releasDate).format('DD/MM/YYYY')}</p>
                                <p className="rents">Genre: {movie.genre}</p>
                            </div>
                        </div>
                    </div>
                )
            }))
        )
    } 

    if(movieHistoryDetails[0] != "noHistory" ) {
        return (
            <>
                <div class="pagetitle">
                <h1>History</h1>
                <nav>
                    <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li class="breadcrumb-item"><a href="/admin-movie-page">Movies</a></li>
                    <li class="breadcrumb-item active">History</li>
                    </ol>
                </nav>
                </div> 
                <input 
                    style={{'marginLeft': '83%'}}
                    type="text" 
                    id="search" 
                    placeholder="Search...." 
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }} 
                />
                <div className="row">
                    {displayMovieHistory()}
                    <ReactPaginate
                        previousLabel = {"<<<"}
                        nextLabel = {">>>"}
                        pageCount={pageCount}
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
    }else{
        return (
            <div class="pagetitle">
                <h1>History</h1>
                <nav>
                    <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li class="breadcrumb-item"><a href="/admin-movie-page">Movies</a></li>
                    <li class="breadcrumb-item active">History</li>
                    </ol>
                    <h1 className="text-center">No History</h1>
                </nav>
            </div>
        )
    }
}

