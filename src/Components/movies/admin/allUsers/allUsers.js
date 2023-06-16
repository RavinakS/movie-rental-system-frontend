import React, {useState, useEffect} from "react";
import axios from "axios";
import './allUsers.css';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import ReactPaginate from "react-paginate";

export default function AllUsers(){
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [cookies, setCookie] = useCookies(['token']);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalNumUsers, setTotalNumUsers] = useState(0);

    setCookie('token', cookies);

    const usersPerPage = 15;
    const pageCount = Math.ceil(totalNumUsers / usersPerPage);

    const changePage = ({ selected }) => {
        usersPage( selected+1 );
    }

    const usersPage = (myPageNumber = 1) =>{
        axios.get(`/users-page?_pageNum=${myPageNumber}&_limit=${usersPerPage}`, {headers: {cookie: cookies}})
        .then((response) => {
            setTotalNumUsers(response.data.total_users)
            return setUsers(response.data.users);
        })
        .catch(err => alert(err.response.error_messages))
    }

    const oneUserRents = (user_email, user_id) =>{
        navigate('/user-rents-for-admin', { state: { email: user_email, id:  user_id} });
    }

    var count = 0
    const displayUsers = users
        .filter((user) =>{
            if(user){
                if(searchTerm === ""){
                    return user;
                }else if(user.name != undefined){
                    if(user.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return user;
                    }
                }
            }
        })
        .map((user => {
            return(
                <tr>
                    <th scope="row">{count = count + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>{user.coins}</td>
                    <td><button className="rents btn-primary" onClick={ () =>{oneUserRents(user.email, user._id)}} >Rents: {user.rent}</button></td>
                </tr>
            )
        }));

    useEffect(()=>{
        usersPage();
    }, []);

    return (
        <>
            <div class="pagetitle">
            <h1>All Users</h1>
            <nav>
                <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item active">All Users</li>
                </ol>
            </nav>
            </div>

            <input 
                type="text" 
                style={{'marginLeft': '82.50%'}}
                id="search" 
                placeholder="Search...." 
                onChange={(event) => {
                    setSearchTerm(event.target.value)
                }}>
            </input> 
            <div className="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">Users</h5>

                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Role</th>
                                <th scope="col">Email</th>
                                <th scope="col">Wallet(Rs)</th>
                                <th scope="Col">Rents</th>
                            </tr>
                            </thead>
                            <tbody>
                                {displayUsers}
                            </tbody>
                        </table>

                        </div>
                    </div>
                </div>
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

