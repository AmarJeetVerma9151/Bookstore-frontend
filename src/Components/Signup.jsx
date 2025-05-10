import React, { useRef } from 'react'
import Login from './Login'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
import { SetState } from '../store/UserSlice'
import { useDispatch } from 'react-redux'



function Signup() {
  let userRef=useRef(null)
  let adminRef=useRef(null)
  let nameRef = useRef()
  let emailRef = useRef()
  let passwordRef = useRef()
  let dispatch=useDispatch()
  let navigate=useNavigate()


  const handleSingup = async (e) => {
    e.preventDefault()
    let selectedValue = null;
    if (adminRef.current.checked) {
      selectedValue = adminRef.current.value;
    } else if (userRef.current.checked) {
      selectedValue = userRef.current.value;
    }
    // console.log(selectedValue)




    let obj = {
      fullname: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role:selectedValue
    }
console.log(obj)

    if (!obj.fullname || !obj.email || !obj.password ||!obj.role) {
      alert("all filds are requrided")
      return
    };
    
    const res = await axios.post("https://bookstore-backend-ru0v.onrender.com/user/singup", obj)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          toast.success("Singup successfully")
        }
        dispatch(SetState(res.data.createUser))
        
      
      })
      .catch((error) => {
        if (error.response) {
          toast.success(error.response.data.message)
        }
      })

  }
  return (
    <>
      <div className='flex  justify-center items-center  h-screen dark:bg-slate-400'>

        <div id="my-modal-3" className=" bg-lime-500 border-[2px] border-shadow-2xl dark:bg-slate-700 dark:text-white  px-16 py-8 rounded-md">
          <div className="">
            <Link to={'/'} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}

            </form>
            <h3 className="font-bold text-red-500 text-2xl ">Signup</h3>


            <div className='mt-5 space-y-2'>
              <span>Name</span><br />
              <input ref={nameRef} type="text" placeholder='Enter your fullname..' required className="input   input-bordered w-full max-w-xs dark:text-black" />
            </div>

            <div className='mt-5 space-y-2'>
              <span>Email</span><br />
              <input required ref={emailRef} type="email" placeholder='Enter the email..' className="input   input-bordered w-full max-w-xs dark:text-black" />
            </div>

            <div className='pt-5 space-y-2'>
              <span >Password</span>
              <br />
              <input ref={passwordRef} type="password" required placeholder='Enter the password..' className="input  border-rounded  input-bordered w-full max-w-xs  dark:text-black " />
            </div>
            <div>
        <label className="p-1" htmlFor="admin">admin</label>
        <input
          className="mr-4"
          type="radio"
          id="admin"
          name="admin"
          value="admin"
          ref={adminRef}
        />

        <label className="p-1" htmlFor="user">user</label>
        <input
          type="radio"
          id="user"
          name="admin"
          value="user"
          ref={userRef}
        />
      </div>

            <div className='flex mt-5 justify-around'>
              <button onClick={handleSingup} className="px-3 py-1   bg-pink-500 text-white rounded-md hover:bg-pink-700 duration-200 ">Singup</button>

              <p>Have account? <button className='underline text-blue-500 cursor-pointer' onClick={() => document.getElementById("my_modal_3").showModal()}>Login</button>
               <Login />
              </p>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Signup