import React, { useState } from "react";
import './profile.css';
import { useNavigate } from "react-router";
import * as moment from "moment";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal2 from "sweetalert2";
import ReactPaginate from "react-paginate";

export default function TotalRents(){
    const navigate = useNavigate()
    const { data } = useLocation().state;
    // const today = new Date().toISOString().split('T')[0];

    const [searchTerm, setSearchTerm] = useState("");
    const [totalNumMovies, setTotalNumMovies] = useState(1);
    const myPageNumber = 1

    const moviesPerPage = 9;
    const pageCount = Math.ceil(totalNumMovies / moviesPerPage);
    const today = new Date().toISOString().split('T')[0];

    const changePage = ({ selected }) => {
        return (selected+1);
    }

    function confirmation() {
        let person = prompt(`Are you sure?, won't get back once returned.`, "yes");
        
        if (person === null) {
            return 'no'
        }
        else if (person.toLowerCase() === 'no') {
            return 'no'
        } else if(person.toLowerCase() === 'yes'){
            return 'yes'
        }
         else {
            return 'inValid';
        }
      }

    const returnMovie = async (movie) =>{
        
        const isConfirm = confirmation();
        if (isConfirm === 'no') {
            return false;
        }else if (isConfirm === 'inValid') {
            Swal2.fire({
                icon: "error",
                title: `please type yes/no, wrong input.`
            })
        }else{
            const re_mov_details = {
                name: movie.name,
                rentDate: movie.rentDate,
                releasDate: movie.releasDate,
                returnDate: today,
                genre: movie.genre,
                user: data[0][0].email,
                user_id: data[0][0]._id,
            }
    
            function addAmn(currentAmn, additionalAmn) {
                let user_input = (prompt(`Add amount min(${additionalAmn-currentAmn}) Rs.`, additionalAmn-currentAmn));
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
    
            try{
                const return_movie = await axios.post('/return-movie', re_mov_details);
                if(return_movie.data.message === 'addAmount'){
                    
                    let wallet_info = return_movie.data;
    
                    const amount = addAmn(wallet_info.wallet, wallet_info.additional_amount);
    
                    if (amount === 'inValid') {
                        Swal2.fire({
                            icon: "error",
                            title: `Wrong Input.`
                        })
                    }else{
                        axios.put(`/add-to-wallet?amount=${amount}&user=${data[0][0].email}`)
                        .then(()=>{
                            Swal2.fire({
                                icon: "success",
                                text: `amount added ${amount}`
                            }) 
                        })
                    }
                }else if(return_movie.data.message === "success"){
                    Swal2.fire({
                        icon: "success",
                        title: "Thank you ❤️",
                        text: `delayed fee: ${return_movie.data.deducted_amount}`
    
                    })
                    .then(()=>{
                        // navigate('/profile');
                        let findIndex = data[1].findIndex((element) => element.name == re_mov_details.name);
                        data[1].splice(findIndex, 1);
                        navigate('/total-rents', { state: { data: data } });
                    })
    
                }else if(return_movie.data.message === "failed"){
                    await Swal2.fire({
                        icon: "success",
                        title: "Thank you ❤️",
                        footer: '<a href="#">FeedBack</a>'
                    })
                    .then(()=>{
                        // navigate('/profile');
                        let findIndex = data[1].findIndex((element) => element.name == re_mov_details.name);
                        data[1].splice(findIndex, 1);
                        navigate('/total-rents', { state: { data: data } });
                    })
                }else{
                    console.log("return_movie.data", return_movie.data);
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    return (
        <>
            <div class="pagetitle">
            <h1>Total Rents</h1>
            <nav>
                <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/profile">Profile</a></li>
                <li class="breadcrumb-item active">Total Rents</li>
                </ol>
            </nav>
            </div>
            <div className="row">
            {data[1].map((movie) =>{
                console.log(movie.rentDate);
                return (
                    <div className="col-md-3" key={movie._id}>
                        <div className ="card">
                                <h5 className="card-title" style={{'marginLeft': '20px'}} >{movie.name}</h5>
                            <div className="card-body">
                                <p className="genre">Genre: {movie.genre}</p>
                                <p className ="releasDate">Releas Date: {moment(movie.releasDate).format('DD/MM/YYYY')}</p>
                                <p className="rentDate">Rent Date: {moment(movie.rentDate).format('DD/MM/YYYY')}</p>
                                <button className="btn btn-primary" onClick={()=>{returnMovie(movie)}}>Return</button>
                            </div>
                        </div>
                    </div>
                )}
            )}
            </div>

            <div className="row">
                    {/* {displayMovies} */}
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