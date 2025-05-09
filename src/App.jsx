
import Courses from "./courses/Courses";
import Home from "./home/Home";
import Signup from "./Components/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
import Contact from "./Components/Contact";
import Enquiry from "./admin/Enquiry";
import Admin from "./admin/Admin";






export default function App() {

  const userData = useSelector((state)=> state.user)
  // console.log(userData)

  let login = userData.login
  console.log(login)
   
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
      
        <Routes>
          
         <Route path="/" element={<Home />} />
          <Route path="/course" element={login===true? <Courses /> : <Navigate to ={'/'}/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/admin/enquiry" element={<Enquiry/>}/>

          </Routes>

          <Toaster />
          </div>

    </>
  )
}