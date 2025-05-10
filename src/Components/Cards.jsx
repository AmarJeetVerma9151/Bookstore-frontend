import React from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function Cards({ item }) {
  const handleDelete = async (Id) => {

    const useData=useSelector((state) => state.user)
       const user = useData?.user?.role;
       console.log(user)
        
    try {
      const res = await axios.delete(`https://bookstore-backend-ru0v.onrender.com/book/deletebook/${Id}`);
      const data = res.data;
      if (data) {
        toast.success("Book deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="p-4" style={{ width: "350px", height: "400px" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 h-full w-full"
      >
        {/* IMAGE SECTION */}
        <div style={{ height: "60%", width: "100%" }} className="overflow-hidden">
          <img
            src={item.Image}
            alt="Book"
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* CARD BODY */}
        <div className="p-4 flex flex-col justify-between flex-grow" style={{ height: "50%" }}>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1 flex justify-between items-center">
              {item.Name}
              <span className="bg-pink-200 text-pink-800 text-xs px-2 py-1 rounded-full">
                {item.category}
              </span>
            </h2>
            <p className="text-sm text-gray-600 line-clamp-2">{item.title}</p>
          </div>

          <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
            <span className="text-base font-bold text-gray-700">₹{item.price}</span>
            <div className="flex gap-2">
              <button className="px-4 py-1 text-sm text-white bg-pink-500 rounded-full hover:bg-pink-400 transition">
                Buy Now
              </button>
              {role=="admin"&&<button
                onClick={() => handleDelete(item._id)}
                className="px-4 py-1 text-sm text-white bg-red-600 rounded-full hover:bg-red-400 transition"
              >
                Delete
              </button>            }</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Cards;
