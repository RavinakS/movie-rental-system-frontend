export default function navButtons(){

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem('role');

    if(role != null && isAuthenticated != null){
      if(isAuthenticated && role.toLowerCase() === 'admin'){
        return(
          <div className="navbar-nav">
              <a className="nav-item nav-link active" href='/' >Home</a>
              <a className="nav-item nav-link active" href='/add-user'>Add User</a>
              <a className="nav-item nav-link active" href='/admin-movie-page'>Admin Movie Page</a>
              <a className="nav-item nav-link active" href='/user-movie-page'>User Movie Page</a>
              <a className="nav-item nav-link active" href='/profile'>Profile</a>
              <a className="nav-item nav-link active" href='/logout'>Logout</a>
          </div>
        )
      }else{
        return(
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href='/' >Home</a>
            <a className="nav-item nav-link active" href='/logout'>Logout</a>
            <a className="nav-item nav-link active" href='/profile'>Profile</a>
          </div>
        )
    }
  }
  else if(isAuthenticated){
      return(
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href='/' >Home</a>
          <a className="nav-item nav-link active" href='/logout'>Logout</a>
          <a className="nav-item nav-link active" href='/profile'>Profile</a>
        </div>
      )
    }else{
      return(
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href='/' >Home</a>
          <a className="nav-item nav-link active" href='/login'>Login</a>
          <a className="nav-item nav-link active" href='/create-account'>Signup</a>
        </div>
      )
    }
  }