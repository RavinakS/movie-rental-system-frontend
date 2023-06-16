import React, {useState, useEffect} from "react";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './userMoviePage.css';
import axios from "axios";
import * as moment from "moment";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import Swal2 from "sweetalert2";
import ReactPaginate from "react-paginate";

export default function UserMoviepage(){
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];

    const [movies, setMovies] = useState([]);
    const [state, setState] = useState({});
    const [cookies, setCookie] = useCookies(['token']);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalNumMovies, setTotalNumMovies] = useState(0);

    setCookie('token', cookies);

    const moviesPerPage = 6;
    const pageCount = Math.ceil(totalNumMovies / moviesPerPage);

    const changePage = ({ selected }) => {
        moviePage(selected+1);
    }

    let moviePage = (myPageNumber=1) =>{
        axios.get(`/movie-page?_pageNum=${myPageNumber}&_limit=${moviesPerPage}`)
        .then((response) => {
            setTotalNumMovies(response.data.total_movies)
            return setMovies(response.data.movies);
        })
        .catch(err => alert(err.response))
    }

    useEffect(()=>{
        moviePage()
        return () =>{
            return setState({});
        }
     }, []);

     function addAmn(currentAmn, additionalAmn) {
        let user_input = (prompt(`Add amount min(${additionalAmn}) Rs.`, additionalAmn));

        if (user_input === null) {
            return 'inValid'
        }

        let person = parseInt(user_input);

        if (isNaN(person)) {
            return 'inValid'
        } else if(person<0){
            return 'inValid'
        }
         else {
             return person;
        }
      }

    let buyMovie = (m_name) => {
        axios.post(`/rent-movie?m_name=${m_name}&rent_date=${today}`, {headers: {cookie: cookies}})
        .then((res)=>{
            if (res.data.message === 'addAmount') {
                let wallet_info = res.data;

                const amount = addAmn(wallet_info.wallet, wallet_info.additional_amount);
                console.log("amount", amount);

                if (amount === 'inValid') {
                    Swal2.fire({
                        icon: "error",
                        title: `Wrong Input.`
                    })
                }else{
                    axios.put(`/add-to-wallet?amount=${amount}&user=${wallet_info.user}`)
                    .then(()=>{
                        Swal2.fire({
                            icon: "success",
                            text: `amount added ${amount}`
                        }) 
                    })
                    .catch((err)=>{
                        Swal2.fire({
                            icon: "error",
                            text: `Something Went Wrong.`
                        })
                        .then(()=>{
                            console.log(err);
                        })
                    })
                }
            }else{
                return Swal2.fire({
                    icon : "success",
                    title : "Congratulations!! Enjoy your movie :)"
                })
            }
        })
        .then(()=>{
            return moviePage();
        })
        .catch((err) =>{
            if(err.response.status === 404){
                navigate('/login')
            }else if(err.response.status === 403){
                Swal2.fire({
                    icon : "error",
                    title : "You already have the movie. please check your profile."
                })
                .then(()=>{
                    moviePage();
                })
            }else if(err.response.status === 503){
                Swal2.fire({
                    icon : "error",
                    title : "This Movie is now not available for rent."
                })
                .then(()=>{
                    moviePage();
                    console.log(err)
                })
            }else if(err.response.status === 408){
                Swal2.fire({
                    icon : "error",
                    title : "Out of Stock."
                })
                .then(()=>{
                    moviePage();
                    console.log(err)
                })
            }else{
                Swal2.fire({
                    icon : "error",
                    title : "Something Went Wrong."
                })
                .then(()=>{
                    moviePage();
                    console.log(err)
                })
            }
        })
    }

    const sortByReleasDate = () =>{
        axios.get('/sort-movies')
        .then((response) =>{
            if(response.data === '' || response.data === 'noMovies'){
                return setMovies(["noMovies"]);
            }
            setMovies(response.data.slice(0, response.data.length));
        })
        .catch((err) =>{ 
            Swal2.fire({
                icon : "error",
                title : err.response.data
            })
        })
    }

    const displayMovies = movies
        .filter((movie) =>{
            if(movie){
                if(searchTerm === ""){
                    return movie;
                }else if(movie.name != undefined){
                    if(movie.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return movie;
                    }
                }
            }
        })
        .map((movie => {
            if(movie === 'noMovies'){
                return (
                    <h5 className="text-center text-secondary">work in Progress/ currently we are working on this page.</h5>
                )
            }
            if (movie.image) {
                var image = "http://localhost:3040/"+movie.image;
            }else{
                var image = "assets/img/card.jpg"
            }
            return(
                <div className="col-md-4" key={movie._id}>
                    <div className ="card">
                        <div className="card-header text-center card-header-color" >
                            <h5 className="movie-title" >{movie.name}</h5>
                        </div>
                        <img src={image} class="card-img-top" alt="..."/>
                        <div className="card-body">
                            <p className="release-date">Release date: {moment(movie.releasDate).format('DD/MM/YYYY')}</p>
                            <p className="genre">Genre: {movie.genre}</p>
                            <p className ="Available rents">Available rents: {movie.avalCD}</p>
                            <p className ="coins">Price: ₹ {movie.coins}</p>
                            <button className="btn btn-primary" onClick={() => {buyMovie(movie.name)}}>Rent</button>
                        </div>
                    </div>
                </div>
            )
        }));

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
            <button 
                className="btn btn-primary" 
                id="sortByReleasDate" 
                style={{'marginBottom':'-38px'}} 
                onClick={() => {sortByReleasDate()}}
                >Sort
            </button>
            <input 
                type="text" 
                id="search" 
                style={{'marginLeft': '83%', 'marginBottom':'5px'}}
                placeholder="Search...." 
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }} 
            /> 
            <div className="row">
                {displayMovies}
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
}

