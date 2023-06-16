import React, { useState } from 'react'


export default function Header(){
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
                        <li>
                            <a href="/user-movie-page">
                            <i class="bi bi-circle"></i><span>User Movie Page</span>
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
      </div>
    )
  }
}
