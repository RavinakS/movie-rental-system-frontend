import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';

import Login from './Components/users/login/login';
import Signup from './Components/users/signup/signup';
import ErrorPage from './Components/users/homepage/errorPage';
import IsAuthenticated from './Auth';
import GoogleLogin from './Components/users/login/googleLogin';
import Layout from './Components/Layout/Layout';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import Homepage from './Components/users/homepage/homepage';

export default function App() {

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (isAuthenticated) {
    return (
      <>
        <Router>
          <Header />
          <main id="main" className="main">
            <Routes>
            </Routes>
            <Layout />
          </main>
          <Footer />
        </Router>
    </>
    )
  }else{
    return (
     <>
        <Router>
          <Routes>
            <Route path = '/' element = {< Homepage />} />

            <Route path='/login' element={<IsAuthenticated/>}>
              <Route path='/login' element={<Login />} />
            </Route>
            <Route path='/create-account' element={<IsAuthenticated/>}>
              <Route path='/create-account' element={ <Signup />} />
            </Route>
            <Route path='/google-auth-login' element={<GoogleLogin/>}/>
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Router>
      </>
    );
  }
}
