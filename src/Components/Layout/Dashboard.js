import React, { useState } from "react";

const Dashboard = () =>{
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () =>{
        setSidebar(!sidebar);
        if(!sidebar){
        document.getElementById("myBody").classList.add("toggle-sidebar");
        }else{
        document.getElementById("myBody").classList.remove("toggle-sidebar");
        }
    }

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem('role');
  
    if(role != null && isAuthenticated != null){
      if (isAuthenticated && role.toLowerCase() === 'admin') {
        return(
          <div>
            {/* <!-- ======= Header ======= --> */}
            <header id="header" className="header fixed-top d-flex align-items-center">
      
              <div className="d-flex align-items-center justify-content-between">
                <a href="" className="logo d-flex align-items-center">
                  <img src="assets/img/logo.png" alt=""/>
                  <span className="d-none d-lg-block">Movie Rental</span>
                </a>
                  <i className="bi bi-list toggle-sidebar-btn" onClick={showSidebar}>
                  </i>
              </div>
              {/* <!-- End Logo --> */}
      
              <div className="search-bar">
                <form className="search-form d-flex align-items-center" method="POST" action="#">
                  <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                  <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                </form>
              </div>
              {/* <!-- End Search Bar --> */}
      
              <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
      
                  <li className="nav-item d-block d-lg-none">
                    <a className="nav-link nav-icon search-bar-toggle " href="#">
                      <i className="bi bi-search"></i>
                    </a>
                  </li>
                  {/* <!-- End Search Icon--> */}
      
                  <li className="nav-item dropdown pe-3">
      
                    <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                      <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
                      <span className="d-none d-md-block dropdown-toggle ps-2">Profile</span>
                    </a>
                    {/* <!-- End Profile Iamge Icon --> */}
      
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                      <li>
                        <a className="dropdown-item d-flex align-items-center" href="http://localhost:3006/logout">
                          <i className="bi bi-box-arrow-right"></i>
                          <span>Sign Out</span>
                        </a>
                      </li>
      
                    </ul>
                    {/* <!-- End Profile Dropdown Items --> */}
                  </li>
                  {/* <!-- End Profile Nav --> */}
      
                </ul>
              </nav>
              {/* <!-- End Icons Navigation --> */}
      
            </header>
            {/* <!-- End Header --> */}
            
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
                              <a href="/movies-add-movie">
                              <i className="bi bi-circle"></i><span>Add Movie</span>
                              </a>
                          </li>
                          <li>
                              <a href="/user-movie-page">
                              <i className="bi bi-circle"></i><span>User Movie Page</span>
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
                              <a href="/users">
                              <i className="bi bi-circle"></i><span>All User</span>
                              </a>
                          </li>
                          <li>
                              <a href="/add-user">
                              <i className="bi bi-circle"></i><span>Add User</span>
                              </a>
                          </li>
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
      
                  {/* <li className="nav-item">
                      <a className="nav-link collapsed" href="/create-account">
                      <i className="bi bi-card-list"></i>
                      <span>Register</span>
                      </a>
                  </li> */}
                  {/* <!-- End Register Page Nav --> */}
      
                  {/* <li className="nav-item">
                      <a className="nav-link collapsed" href="/login">
                      <i className="bi bi-box-arrow-in-right"></i>
                      <span>Login</span>
                      </a>
                  </li> */}
                  {/* <!-- End Login Page Nav --> */}
      
              </ul>
      
            </aside>
            {/* <!-- End Sidebar--> */}

            <div className="pagetitle">
            <h1>Dashboard</h1>
            </div>
            {/* <main id="main" className="main"> */}

            <section className="section dashboard">
            <div className="row">

                {/* <!-- Left side columns --> */}
                <div className="col-lg-8">
                <div className="row">

                    {/* <!-- Sales Card --> */}
                    <div className="col-xxl-4 col-md-6">
                    <div className="card info-card sales-card">

                        <div className="filter">
                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">This Month</a></li>
                            <li><a className="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div className="card-body">
                        <h5 className="card-title">Sales <span>| Today</span></h5>

                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-cart"></i>
                            </div>
                            <div className="ps-3">
                            <h6>145</h6>
                            <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Sales Card --> */}

                    {/* <!-- Revenue Card --> */}
                    <div className="col-xxl-4 col-md-6">
                    <div className="card info-card revenue-card">

                        <div className="filter">
                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">This Month</a></li>
                            <li><a className="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div className="card-body">
                        <h5 className="card-title">Revenue <span>| This Month</span></h5>

                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-currency-dollar"></i>
                            </div>
                            <div className="ps-3">
                            <h6>$3,264</h6>
                            <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Revenue Card --> */}

                    {/* <!-- Customers Card --> */}
                    <div className="col-xxl-4 col-xl-12">

                    <div className="card info-card customers-card">

                        <div className="filter">
                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">This Month</a></li>
                            <li><a className="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div className="card-body">
                        <h5 className="card-title">Customers <span>| This Year</span></h5>

                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-people"></i>
                            </div>
                            <div className="ps-3">
                            <h6>1244</h6>
                            <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>

                            </div>
                        </div>

                        </div>
                    </div>

                    </div>
                    {/* <!-- End Customers Card --> */}

                </div>
                </div>
                {/* <!-- End Left side columns --> */}
            </div>
            </section>
          </div>
        )
      }else{
        return(
          <div>
            {/* <!-- ======= Header ======= --> */}
            <header id="header" className="header fixed-top d-flex align-items-center">
      
              <div className="d-flex align-items-center justify-content-between">
                <a href="" className="logo d-flex align-items-center">
                  <img src="assets/img/logo.png" alt=""/>
                  <span className="d-none d-lg-block">Movie Rental</span>
                </a>
                  <i className="bi bi-list toggle-sidebar-btn" onClick={showSidebar}>
                  </i>
              </div>
              {/* <!-- End Logo --> */}
      
              <div className="search-bar">
                <form className="search-form d-flex align-items-center" method="POST" action="#">
                  <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                  <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                </form>
              </div>
              {/* <!-- End Search Bar --> */}
      
              <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
      
                  <li className="nav-item d-block d-lg-none">
                    <a className="nav-link nav-icon search-bar-toggle " href="#">
                      <i className="bi bi-search"></i>
                    </a>
                  </li>
                  {/* <!-- End Search Icon--> */}
      
                  <li className="nav-item dropdown pe-3">
      
                    <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                      <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
                      <span className="d-none d-md-block dropdown-toggle ps-2">Profile</span>
                    </a>
                    {/* <!-- End Profile Iamge Icon --> */}
      
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                      <li>
                        <a className="dropdown-item d-flex align-items-center" href="http://localhost:3006/logout">
                          <i className="bi bi-box-arrow-right"></i>
                          <span>Log Out</span>
                        </a>
                      </li>
      
                    </ul>
                  </li>
                </ul>
              </nav>
      
            </header>
            
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
                              <a href="/user-movie-page">
                              <i className="bi bi-circle"></i><span>Movies</span>
                              </a>
                          </li>
                      </ul>
                  </li>
                  {/* <!-- End Movies Nav --> */}
      
                  <li className="nav-heading">Pages</li>
      
                  <li className="nav-item">
                      <a className="nav-link collapsed" href="/profile">
                      <i className="bi bi-person"></i>
                      <span>Profile</span>
                      </a>
                  </li>
              </ul>
      
            </aside>

            <div className="pagetitle">
            <h1>Dashboard</h1>
            </div>
            {/* <main id="main" className="main"> */}

            <section className="section dashboard">
            <div className="row">

                {/* <!-- Left side columns --> */}
                <div className="col-lg-8">
                <div className="row">

                    {/* <!-- Sales Card --> */}
                    <div className="col-xxl-4 col-md-6">
                    <div className="card info-card sales-card">

                        <div className="filter">
                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">This Month</a></li>
                            <li><a className="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div className="card-body">
                        <h5 className="card-title">Sales <span>| Today</span></h5>

                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-cart"></i>
                            </div>
                            <div className="ps-3">
                            <h6>145</h6>
                            <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Sales Card --> */}

                    {/* <!-- Revenue Card --> */}
                    <div className="col-xxl-4 col-md-6">
                    <div className="card info-card revenue-card">

                        <div className="filter">
                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">This Month</a></li>
                            <li><a className="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div className="card-body">
                        <h5 className="card-title">Revenue <span>| This Month</span></h5>

                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-currency-dollar"></i>
                            </div>
                            <div className="ps-3">
                            <h6>$3,264</h6>
                            <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Revenue Card --> */}

                    {/* <!-- Customers Card --> */}
                    <div className="col-xxl-4 col-xl-12">

                    <div className="card info-card customers-card">

                        <div className="filter">
                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">This Month</a></li>
                            <li><a className="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div className="card-body">
                        <h5 className="card-title">Customers <span>| This Year</span></h5>

                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-people"></i>
                            </div>
                            <div className="ps-3">
                            <h6>1244</h6>
                            <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>

                            </div>
                        </div>

                        </div>
                    </div>

                    </div>
                    {/* <!-- End Customers Card --> */}

                </div>
                </div>
                {/* <!-- End Left side columns --> */}
            </div>
            </section>
          </div>
        )
      }
    }else{
      return(
        <div>
          {/* <!-- ======= Header ======= --> */}
          <header id="header" className="header fixed-top d-flex align-items-center">
    
            <div className="d-flex align-items-center justify-content-between">
              <a href="" className="logo d-flex align-items-center">
                <img src="assets/img/logo.png" alt=""/>
                <span className="d-none d-lg-block">Movie Rental</span>
              </a>
                <i className="bi bi-list toggle-sidebar-btn" onClick={showSidebar}>
                </i>
            </div>
            {/* <!-- End Logo --> */}
    
            <div className="search-bar">
              <form className="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
              </form>
            </div>
            {/* <!-- End Search Bar --> */}
    
            <nav className="header-nav ms-auto">
              <ul className="d-flex align-items-center">
    
                <li className="nav-item d-block d-lg-none">
                  <a className="nav-link nav-icon search-bar-toggle " href="#">
                    <i className="bi bi-search"></i>
                  </a>
                </li>
                {/* <!-- End Search Icon--> */}
    
                <li className="nav-item dropdown pe-3">
    
                  <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
                    <span className="d-none d-md-block dropdown-toggle ps-2">Profile</span>
                  </a>
                  {/* <!-- End Profile Iamge Icon --> */}
    
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li>
                      <a className="dropdown-item d-flex align-items-center" href="http://localhost:3006/login">
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Login</span>
                      </a>
                    </li>
    
                  </ul>
                </li>
              </ul>
            </nav>
    
          </header>
          
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
                            <a href="/user-movie-page">
                            <i className="bi bi-circle"></i><span>Movies</span>
                            </a>
                        </li>
                    </ul>
                </li>
                {/* <!-- End Movies Nav --> */}
    
                <li className="nav-heading">Pages</li>
    
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/profile">
                    <i className="bi bi-person"></i>
                    <span>Profile</span>
                    </a>
                </li>
            </ul>
    
          </aside>

            <div className="pagetitle">
            <h1>Dashboard</h1>
            </div>
            {/* <main id="main" className="main"> */}

            <section className="section dashboard">
            <div className="row">

                {/* <!-- Left side columns --> */}
                <div className="col-lg-8">
                <div className="row">

                    {/* <!-- Sales Card --> */}
                    <div className="col-xxl-4 col-md-6">
                    <div className="card info-card sales-card">

                        <div className="filter">
                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">This Month</a></li>
                            <li><a className="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div className="card-body">
                        <h5 className="card-title">Sales <span>| Today</span></h5>

                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-cart"></i>
                            </div>
                            <div className="ps-3">
                            <h6>145</h6>
                            <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Sales Card --> */}

                    {/* <!-- Revenue Card --> */}
                    <div className="col-xxl-4 col-md-6">
                    <div className="card info-card revenue-card">

                        <div className="filter">
                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">This Month</a></li>
                            <li><a className="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div className="card-body">
                        <h5 className="card-title">Revenue <span>| This Month</span></h5>

                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-currency-dollar"></i>
                            </div>
                            <div className="ps-3">
                            <h6>$3,264</h6>
                            <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Revenue Card --> */}

                    {/* <!-- Customers Card --> */}
                    <div className="col-xxl-4 col-xl-12">

                    <div className="card info-card customers-card">

                        <div className="filter">
                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">This Month</a></li>
                            <li><a className="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div className="card-body">
                        <h5 className="card-title">Customers <span>| This Year</span></h5>

                        <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-people"></i>
                            </div>
                            <div className="ps-3">
                            <h6>1244</h6>
                            <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>

                            </div>
                        </div>

                        </div>
                    </div>

                    </div>
                    {/* <!-- End Customers Card --> */}

                </div>
                </div>
                {/* <!-- End Left side columns --> */}
            </div>
            </section>
        </div>
      )
    }
    
}

export default Dashboard;