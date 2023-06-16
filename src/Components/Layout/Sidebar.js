import React from 'react';

export default function Sidebar(){
    return (
        <div>
            {/* <!-- ======= Sidebar ======= --> */}
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <a className="nav-link " href="/">
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                        </a>
                    </li>
                    {/* <!-- End Dashboard Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i><span>Movies</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="/admin-movie-page">
                                <i className="bi bi-circle"></i><span>Movies</span>
                                </a>
                            </li>
                            <li>
                                <a href="/admin-movie-page/movies/add-movie">
                                    <i className="bi bi-circle"></i><span>Add Movie</span>
                                </a>
                                <Outlet/>
                            </li>
                            <li>
                                <a href="/movies/update-movie">
                                <i className="bi bi-circle"></i><span>Update Movie</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                <i className="bi bi-circle"></i><span>Total Rents</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                <i className="bi bi-circle"></i><span>History</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* <!-- End Movies Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i><span>Users</span><i className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="">
                                <i className="bi bi-circle"></i><span>All User</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                <i className="bi bi-circle"></i><span>Add User</span>
                                </a>
                            </li>
                            {/* <li>
                                <a href="">
                                <i className="bi bi-circle"></i><span>Rents</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                <i className="bi bi-circle"></i><span>History</span>
                                </a>
                            </li> */}
                        </ul>
                    </li>
                    {/* <!-- End Users Nav --> */}

                    <li className="nav-heading">Pages</li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/profile">
                        <i className="bi bi-person"></i>
                        <span>Profile</span>
                        </a>
                    </li>
                    {/* <!-- End Profile Page Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/create-account">
                        <i className="bi bi-card-list"></i>
                        <span>Register</span>
                        </a>
                    </li>
                    {/* <!-- End Register Page Nav --> */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/login">
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Login</span>
                        </a>
                    </li>
                    {/* <!-- End Login Page Nav --> */}

                </ul>

            </aside>
            {/* <!-- End Sidebar--> */}
        </div>
    )
}