import React from "react";

export default function ErrorPage(){
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (isAuthenticated) {
    return (
      <>
        <div class="container">
          <section class="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404</h1>
            <h2>The page you are looking for doesn't exist.</h2>
            <a class="btn" href="http://localhost:3006">Back to home</a>
            <img src="assets/img/not-found.svg" class="img-fluid py-5" alt="Page Not Found"/>
          </section>
        </div>
      </>
      )
  }else{
    return (
      <>
        <div class="container">
          <section class="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h2>Movie Rental System</h2>
            {/* <h2>WellCome</h2> */}
            <h3>Please Login/ Create Account</h3>
            <a class="btn" href="http://localhost:3006/login">Login</a>
            <a class="btn" href="http://localhost:3006/create-account">Create Account</a>
            <img src="assets/img/not-found.svg" class="img-fluid py-5" alt="Page Not Found"/>
          </section>
        </div>
      </>
      )
  }
}