import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import { useEffect } from 'react';
import { adminActions, userActions } from './store';
import UserProfile from './components/Profile/userProfile';
import Booking from './components/Bookings/Booking'
import AddMovies from './components/Movies/AddMovies';
import AdminProfile from './components/Profile/AdminProfile';



function App(){
   const dispatch = useDispatch();
   const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
   const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
   console.log("isAdminLoggedIn" , isAdminLoggedIn);
   console.log("isUserLoggedIn" , isUserLoggedIn);
   
   useEffect(()=>{
      if (localStorage.getItem("userId")){
         dispatch(userActions.login());
      }
      else if (localStorage.getItem("adminId")){
         dispatch(adminActions.login());
      }
   }, );


   return(
      <div>
       {/* Header */}
         <Header />
    <section>
    {/* Routes */}
      <Routes>

     <Route path="/" element={<HomePage/>} />
     <Route path="/movies" element={<Movies/>} />
     <Route path="/admin" element={<Admin/>} />
     <Route path="/auth" element={<Auth/>} />
     <Route path="/booking/:id" element={<Booking />}/>
     <Route path="/user" element={<UserProfile />}/>           
     <Route path="/add" element={<AddMovies/>}/>
     <Route path="/user-admin" element={<AdminProfile />} />

      </Routes>
    </section>

      </div>
   )

}


export default App;



