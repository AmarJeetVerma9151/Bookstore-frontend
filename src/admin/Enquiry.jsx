import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';

function Enquiry() {
  const [getcontact, setgetcontact] = useState([]);
 

   const getallenquiry  = async()=>{
    var res = await axios.get("https://bookstore-backend-ru0v.onrender.com/contact/getcontact")
  
    var allenquiry  = res.data.contact;
    setgetcontact(allenquiry)

   }
   
   
  
useEffect(()=>{
  getallenquiry()
},[1])





  return (
    
   <div className="  max-w-4xl mx-auto p-4">
      <div className='mt-14'><Navbar/></div>
      <h1 className="text-2xl font-bold mb-4 text-center">User Messages</h1>
      <table className="w-full bg-gray-400 table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border">Name</th>
            <th className="p-3 border ">Email</th>
            <th className="p-3 border">Message</th>
          </tr>
        </thead>
        <tbody>
          {getcontact?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-3 border">{item?.Name}</td>
              <td className="p-3 border">
                <div className="max-h-24  overflow-y-auto">{item?.
                Email}</div>
              </td>
              <td className="p-3 border">{item?.Message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Enquiry