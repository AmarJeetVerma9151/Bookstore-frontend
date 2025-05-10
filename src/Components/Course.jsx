
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function Course() {
  const [book, setBook] = useState([]);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getbook = async () => {
    try {
      const res = await axios.get("https://bookstore-backend-ru0v.onrender.com/book/paidbooks");
      console.log(res.data);
      setBook(res.data?.paidbook || []);
    } catch (error) {
      console.error("Error fetching books:", error.message);
      setBook([]);
    }
  };

  useEffect(() => {
    getbook();
  }, []);

  return (
    <div className='max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-10'>
      {/* Header Section */}
      <div className='text-center mt-16 md:mt-24'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight'>
          We're delighted to have you <span className='text-pink-500'>Here! 🙂</span>
        </h1>
        <p className='mt-6 text-red-900 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto'>
          👉 Welcome to our bookstore! From knowledge to imagination to inspiration – we've got something for every reader. Dive into the world of books and start your next great journey today!
        </p>
        <Link to="/">
          <button className='bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition duration-300 mt-6'>
            Back
          </button>
        </Link>
      </div>

      {/* Cards Section */}
      <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8'>
        {Array.isArray(book) && book.length > 0 ? (
          book.map((item, id) => (
            <Cards item={item} key={id} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-base sm:text-lg">
            No books available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default Course;

