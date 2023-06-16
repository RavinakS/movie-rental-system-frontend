import React, { useState } from "react";

const Homepage = () =>{
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
            <header id="header" class="header fixed-top d-flex align-items-center">
      
              <div class="d-flex align-items-center justify-content-between">
                <a href="" class="logo d-flex align-items-center">
                  <img src="assets/img/logo.png" alt=""/>
                  <span class="d-none d-lg-block">Movie Rental</span>
                </a>
                  <i class="bi bi-list toggle-sidebar-btn" onClick={showSidebar}>
                  </i>
              </div>
              {/* <!-- End Logo --> */}
      
              <div class="search-bar">
                <form class="search-form d-flex align-items-center" method="POST" action="#">
                  <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                  <button type="submit" title="Search"><i class="bi bi-search"></i></button>
                </form>
              </div>
              {/* <!-- End Search Bar --> */}
      
              <nav class="header-nav ms-auto">
                <ul class="d-flex align-items-center">
      
                  <li class="nav-item d-block d-lg-none">
                    <a class="nav-link nav-icon search-bar-toggle " href="#">
                      <i class="bi bi-search"></i>
                    </a>
                  </li>
                  {/* <!-- End Search Icon--> */}
      
                  <li class="nav-item dropdown pe-3">
      
                    <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                      <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"/>
                      <span class="d-none d-md-block dropdown-toggle ps-2">Profile</span>
                    </a>
                    {/* <!-- End Profile Iamge Icon --> */}
      
                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                      <li>
                        <a class="dropdown-item d-flex align-items-center" href="http://localhost:3006/logout">
                          <i class="bi bi-box-arrow-right"></i>
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
            <aside id="sidebar" class="sidebar">
      
              <ul class="sidebar-nav" id="sidebar-nav">
      
                  <li class="nav-item">
                      <a class="nav-link " href="/">
                      <i class="bi bi-grid"></i>
                      <span>Dashboard</span>
                      </a>
                  </li>
                  {/* <!-- End Dashboard Nav --> */}
      
                  <li class="nav-item">
                      <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                      <i class="bi bi-menu-button-wide"></i><span>Movies</span><i class="bi bi-chevron-down ms-auto"></i>
                      </a>
                      <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                          <li>
                              <a href="/admin-movie-page">
                              <i class="bi bi-circle"></i><span>Movies</span>
                              </a>
                          </li>
                          <li>
                              <a href="/movies-add-movie">
                              <i class="bi bi-circle"></i><span>Add Movie</span>
                              </a>
                          </li>
                      </ul>
                  </li>
                  {/* <!-- End Movies Nav --> */}
      
                  <li class="nav-item">
                      <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                      <i class="bi bi-journal-text"></i><span>Users</span><i class="bi bi-chevron-down ms-auto"></i>
                      </a>
                      <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                          <li>
                              <a href="/users">
                              <i class="bi bi-circle"></i><span>All User</span>
                              </a>
                          </li>
                          <li>
                              <a href="/add-user">
                              <i class="bi bi-circle"></i><span>Add User</span>
                              </a>
                          </li>
                      </ul>
                  </li>
                  {/* <!-- End Users Nav --> */}
      
                  <li class="nav-heading">Pages</li>
      
                  <li class="nav-item">
                      <a class="nav-link collapsed" href="/profile">
                      <i class="bi bi-person"></i>
                      <span>Profile</span>
                      </a>
                  </li>
                  {/* <!-- End Profile Page Nav --> */}
      
                  {/* <li class="nav-item">
                      <a class="nav-link collapsed" href="/create-account">
                      <i class="bi bi-card-list"></i>
                      <span>Register</span>
                      </a>
                  </li> */}
                  {/* <!-- End Register Page Nav --> */}
      
                  {/* <li class="nav-item">
                      <a class="nav-link collapsed" href="/login">
                      <i class="bi bi-box-arrow-in-right"></i>
                      <span>Login</span>
                      </a>
                  </li> */}
                  {/* <!-- End Login Page Nav --> */}
      
              </ul>
      
            </aside>
            {/* <!-- End Sidebar--> */}

            <div class="pagetitle">
            <h1>Dashboard</h1>
            </div>
            <main id="main" class="main">

            <section class="section dashboard">
            <div class="row">

                {/* <!-- Left side columns --> */}
                <div class="col-lg-8">
                <div class="row">

                    {/* <!-- Sales Card --> */}
                    <div class="col-xxl-4 col-md-6">
                    <div class="card info-card sales-card">

                        <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div class="card-body">
                        <h5 class="card-title">Sales <span>| Today</span></h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-cart"></i>
                            </div>
                            <div class="ps-3">
                            <h6>145</h6>
                            <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Sales Card --> */}

                    {/* <!-- Revenue Card --> */}
                    <div class="col-xxl-4 col-md-6">
                    <div class="card info-card revenue-card">

                        <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div class="card-body">
                        <h5 class="card-title">Revenue <span>| This Month</span></h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-currency-dollar"></i>
                            </div>
                            <div class="ps-3">
                            <h6>$3,264</h6>
                            <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Revenue Card --> */}

                    {/* <!-- Customers Card --> */}
                    <div class="col-xxl-4 col-xl-12">

                    <div class="card info-card customers-card">

                        <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div class="card-body">
                        <h5 class="card-title">Customers <span>| This Year</span></h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-people"></i>
                            </div>
                            <div class="ps-3">
                            <h6>1244</h6>
                            <span class="text-danger small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">decrease</span>

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
            </main>

            <footer id="footer" class="footer">
                <div class="copyright">
                    &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
                </div>
                <div class="credits">
                    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
            </footer>
            {/* <!-- End Footer --> */}
          </div>
        )
      }else{
        return(
          <div>
            {/* <!-- ======= Header ======= --> */}
            <header id="header" class="header fixed-top d-flex align-items-center">
      
              <div class="d-flex align-items-center justify-content-between">
                <a href="" class="logo d-flex align-items-center">
                  <img src="assets/img/logo.png" alt=""/>
                  <span class="d-none d-lg-block">Movie Rental</span>
                </a>
                  <i class="bi bi-list toggle-sidebar-btn" onClick={showSidebar}>
                  </i>
              </div>
              {/* <!-- End Logo --> */}
      
              <div class="search-bar">
                <form class="search-form d-flex align-items-center" method="POST" action="#">
                  <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                  <button type="submit" title="Search"><i class="bi bi-search"></i></button>
                </form>
              </div>
              {/* <!-- End Search Bar --> */}
      
              <nav class="header-nav ms-auto">
                <ul class="d-flex align-items-center">
      
                  <li class="nav-item d-block d-lg-none">
                    <a class="nav-link nav-icon search-bar-toggle " href="#">
                      <i class="bi bi-search"></i>
                    </a>
                  </li>
                  {/* <!-- End Search Icon--> */}
      
                  <li class="nav-item dropdown pe-3">
      
                    <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                      <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"/>
                      <span class="d-none d-md-block dropdown-toggle ps-2">Profile</span>
                    </a>
                    {/* <!-- End Profile Iamge Icon --> */}
      
                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                      <li>
                        <a class="dropdown-item d-flex align-items-center" href="http://localhost:3006/logout">
                          <i class="bi bi-box-arrow-right"></i>
                          <span>Log Out</span>
                        </a>
                      </li>
      
                    </ul>
                  </li>
                </ul>
              </nav>
      
            </header>
            
            {/* <!-- ======= Sidebar ======= --> */}
            <aside id="sidebar" class="sidebar">
      
              <ul class="sidebar-nav" id="sidebar-nav">
      
                  <li class="nav-item">
                      <a class="nav-link " href="/">
                      <i class="bi bi-grid"></i>
                      <span>Dashboard</span>
                      </a>
                  </li>
                  {/* <!-- End Dashboard Nav --> */}
      
                  <li class="nav-item">
                      <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                      <i class="bi bi-menu-button-wide"></i><span>Movies</span><i class="bi bi-chevron-down ms-auto"></i>
                      </a>
                      <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                          <li>
                              <a href="/user-movie-page">
                              <i class="bi bi-circle"></i><span>Movies</span>
                              </a>
                          </li>
                      </ul>
                  </li>
                  {/* <!-- End Movies Nav --> */}
      
                  <li class="nav-heading">Pages</li>
      
                  <li class="nav-item">
                      <a class="nav-link collapsed" href="/profile">
                      <i class="bi bi-person"></i>
                      <span>Profile</span>
                      </a>
                  </li>
              </ul>
      
            </aside>

            <div class="pagetitle">
            <h1>Dashboard</h1>
            </div>
            <main id="main" class="main">

            <section class="section dashboard">
            <div class="row">

                {/* <!-- Left side columns --> */}
                <div class="col-lg-8">
                <div class="row">

                    {/* <!-- Sales Card --> */}
                    <div class="col-xxl-4 col-md-6">
                    <div class="card info-card sales-card">

                        <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div class="card-body">
                        <h5 class="card-title">Sales <span>| Today</span></h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-cart"></i>
                            </div>
                            <div class="ps-3">
                            <h6>145</h6>
                            <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Sales Card --> */}

                    {/* <!-- Revenue Card --> */}
                    <div class="col-xxl-4 col-md-6">
                    <div class="card info-card revenue-card">

                        <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div class="card-body">
                        <h5 class="card-title">Revenue <span>| This Month</span></h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-currency-dollar"></i>
                            </div>
                            <div class="ps-3">
                            <h6>$3,264</h6>
                            <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Revenue Card --> */}

                    {/* <!-- Customers Card --> */}
                    <div class="col-xxl-4 col-xl-12">

                    <div class="card info-card customers-card">

                        <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div class="card-body">
                        <h5 class="card-title">Customers <span>| This Year</span></h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-people"></i>
                            </div>
                            <div class="ps-3">
                            <h6>1244</h6>
                            <span class="text-danger small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">decrease</span>

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
            </main>

            <footer id="footer" class="footer">
                <div class="copyright">
                    &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
                </div>
                <div class="credits">
                    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
            </footer>
            {/* <!-- End Footer --> */}
          </div>
        )
      }
    }else{
      return(
        <div>
          {/* <!-- ======= Header ======= --> */}
          <header id="header" class="header fixed-top d-flex align-items-center">
    
            <div class="d-flex align-items-center justify-content-between">
              <a href="" class="logo d-flex align-items-center">
                <img src="assets/img/logo.png" alt=""/>
                <span class="d-none d-lg-block">Movie Rental</span>
              </a>
                <i class="bi bi-list toggle-sidebar-btn" onClick={showSidebar}>
                </i>
            </div>
            {/* <!-- End Logo --> */}
    
            <div class="search-bar">
              <form class="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                <button type="submit" title="Search"><i class="bi bi-search"></i></button>
              </form>
            </div>
            {/* <!-- End Search Bar --> */}
    
            <nav class="header-nav ms-auto">
              <ul class="d-flex align-items-center">
    
                <li class="nav-item d-block d-lg-none">
                  <a class="nav-link nav-icon search-bar-toggle " href="#">
                    <i class="bi bi-search"></i>
                  </a>
                </li>
                {/* <!-- End Search Icon--> */}
    
                <li class="nav-item dropdown pe-3">
    
                  <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"/>
                    <span class="d-none d-md-block dropdown-toggle ps-2">Profile</span>
                  </a>
                  {/* <!-- End Profile Iamge Icon --> */}
    
                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li>
                      <a class="dropdown-item d-flex align-items-center" href="http://localhost:3006/login">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Login</span>
                      </a>
                    </li>
    
                  </ul>
                </li>
              </ul>
            </nav>
    
          </header>
          
          {/* <!-- ======= Sidebar ======= --> */}
          <aside id="sidebar" class="sidebar">
    
            <ul class="sidebar-nav" id="sidebar-nav">
    
                <li class="nav-item">
                    <a class="nav-link " href="/">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                    </a>
                </li>
                {/* <!-- End Dashboard Nav --> */}
    
                <li class="nav-item">
                    <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Movies</span><i class="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="/user-movie-page">
                            <i class="bi bi-circle"></i><span>Movies</span>
                            </a>
                        </li>
                    </ul>
                </li>
                {/* <!-- End Movies Nav --> */}
    
                <li class="nav-heading">Pages</li>
    
                <li class="nav-item">
                    <a class="nav-link collapsed" href="/profile">
                    <i class="bi bi-person"></i>
                    <span>Profile</span>
                    </a>
                </li>
            </ul>
    
          </aside>

            <div class="pagetitle">
            <h1>Dashboard</h1>
            </div>
            <main id="main" class="main">

            <section class="section dashboard">
            <div class="row">

                {/* <!-- Left side columns --> */}
                <div class="col-lg-8">
                <div class="row">

                    {/* <!-- Sales Card --> */}
                    <div class="col-xxl-4 col-md-6">
                    <div class="card info-card sales-card">

                        <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div class="card-body">
                        <h5 class="card-title">Sales <span>| Today</span></h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-cart"></i>
                            </div>
                            <div class="ps-3">
                            <h6>145</h6>
                            <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Sales Card --> */}

                    {/* <!-- Revenue Card --> */}
                    <div class="col-xxl-4 col-md-6">
                    <div class="card info-card revenue-card">

                        <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div class="card-body">
                        <h5 class="card-title">Revenue <span>| This Month</span></h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-currency-dollar"></i>
                            </div>
                            <div class="ps-3">
                            <h6>$3,264</h6>
                            <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                    {/* <!-- End Revenue Card --> */}

                    {/* <!-- Customers Card --> */}
                    <div class="col-xxl-4 col-xl-12">

                    <div class="card info-card customers-card">

                        <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                            <h6>Filter</h6>
                            </li>

                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                        </div>

                        <div class="card-body">
                        <h5 class="card-title">Customers <span>| This Year</span></h5>

                        <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-people"></i>
                            </div>
                            <div class="ps-3">
                            <h6>1244</h6>
                            <span class="text-danger small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">decrease</span>

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
            </main>

          <footer id="footer" class="footer">
                <div class="copyright">
                    &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
                </div>
                <div class="credits">
                    Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
            </footer>
            {/* <!-- End Footer --> */}
        </div>
      )
    }
    
}

export default Homepage;





// import React, {useState, useEffect} from "react";
// import { useNavigate } from "react-router";

// const Homepage = () =>{
//     let navigate = useNavigate();

//     return (
//         <>
//           <div className="App">
//               <div className="homepage">
//                   <h1 className="text-center text-warning" > ** You're Well Come To Home-Page **</h1>
//                   <button className="button" onClick={() => navigate('/admin-movie-page')} >Admin Movie Page</button>
//                   <button className="button" onClick={() => navigate('/user-movie-page')} >User Movie Page</button>
//               </div>
//           </div>
//         </>
//     )
// }

// export default Homepage;