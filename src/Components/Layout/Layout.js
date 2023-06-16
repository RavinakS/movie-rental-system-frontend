import React from 'react'
import { Route, Routes } from 'react-router-dom';

import AdminMoviepage from '../movies/admin/adminMoviePage';
import UserMoviepage from '../movies/user/userMoviePage';
import Logout from '../users/logout/logout';
import Addmovie from '../movies/admin/addMovie/addMovie';
import UpdateMovie from '../movies/admin/updateMovie/updateMovie';
import MovieRentsDetails from '../movies/admin/rents/rents';
import UserProfile from '../movies/user/profile/profile';
import Protected from '../../Protected';
import AllUsers from '../movies/admin/allUsers/allUsers';
import TotalRents from '../movies/user/profile/totalRents';
import MovieHistory from '../movies/admin/movieHistory/history';
import Adduser from '../movies/admin/addUser/addUser';
import UserRentsForAdmin from '../movies/admin/userRents/userRents';
import EditProfile from '../movies/user/editProfile/editProfile';
import Dashboard from './Dashboard';
import ErrorPage from '../users/homepage/errorPage';

export default function Layout() {
    return (
        <>
            <Routes>
                <Route path='/' element={< Dashboard />} />

                <Route path='/profile' element={<UserProfile />} />

                <Route path='/logout' element={<Logout />} />

                <Route path='/total-rents' element={<TotalRents />} />

                <Route path='/user-movie-page' element={<UserMoviepage />} />

                <Route path='/admin-movie-page' element={<Protected />}>
                    <Route path='/admin-movie-page' element={<AdminMoviepage />} />
                </Route>

                <Route path='/movies-add-movie' element={<Protected />}>
                    <Route path='/movies-add-movie' element={<Addmovie />} />
                </Route>

                <Route path='/movies-update-movie' element={<Protected />}>
                    <Route path='/movies-update-movie' element={<UpdateMovie />} />
                </Route>

                <Route path='/rent-details' element={<Protected />}>
                    <Route path='/rent-details' element={<MovieRentsDetails />} />
                </Route>

                <Route path='/users' element={<Protected />}>
                    <Route path='/users' element={<AllUsers />} />
                </Route>

                <Route path='/add-user' element={<Protected />}>
                    <Route path='/add-user' element={<Adduser />} />
                </Route>

                <Route path='/user-rents-for-admin' element={<Protected />}>
                    <Route path='/user-rents-for-admin' element={<UserRentsForAdmin />} />
                </Route>

                <Route path='/history' element={<Protected />}>
                    <Route path='/history' element={<MovieHistory />} />
                </Route>

                <Route path='/edit-profile' element={<EditProfile />} />

                <Route path='*' element={<ErrorPage />} />

            </Routes>
        </>
    )
}