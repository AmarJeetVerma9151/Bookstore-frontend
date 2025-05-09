import React from 'react'
// import { Link } from 'react-router-dom'
import booksImage from "../../public/booksImage.jpg"

function FrontPage() {
  return (
   <>
  <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10'>
  <div className='w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32'>
  <div className='space-y-12'> 
   <h1 className='  font-bold text-4xl '>Hello, welcomes here to learn something <span className='text-pink-500'>new everyday!!!</span></h1>
  <p className='text-xl'>Books
  Sometimes you don't have time to go to the library and borrow a book, so we decided to bring together the best of the written word to provide a valuable service to our friends, teachers, and parents.</p>
   </div>
   <label className=" mt-7 input validator w-full">
  <svg className="h-[1em] opacity-50 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
  <input type="email" placeholder="mail@site.com" required/>
</label>
<div className="validator-hint hidden">Enter valid email address</div>
<button className=" mt-7 btn btn-secondary">Secondary</button>
  </div>
  <div className='order-1 w-full md:w-1/2 rounded-3xl overflow-hidden'>
  <img src={booksImage} alt="" />
  </div>
  </div>
   </>
  )
}

export default FrontPage