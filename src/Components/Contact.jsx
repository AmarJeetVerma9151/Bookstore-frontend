
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function Contact() {
  const [isOpen, setIsOpen] = useState(true); // for open/close the contact form
  if (!isOpen) return null; // If not open, return nothing


  const EmailRef = useRef()
  const NameRef = useRef()
  const MessageRef = useRef()


  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      Name: NameRef.current.value,
      Email: EmailRef.current.value,
      Message: MessageRef.current.value
    }

    const res = await axios.post("https://bookstore-backend-ru0v.onrender.com/contact/usercontact", obj)
    try {
      const data = res.data
      console.log(data)
      if (data.success == true) {
        toast.success("message send successfully", {
          position: "top-right",
          theme: 'dark'
        })
      }
      else{
        toast.error("message not send", {
          position: "top-right",
          theme: 'dark'
        })
      }
    } catch (error) {
      toast.error("error in creating message")

    }

    // console.log(data)

    // 🧹 Clear form fields after submit
    NameRef.current.value = '';
    EmailRef.current.value = '';
    MessageRef.current.value = ''
  
}


  return (
    <div className="max-w-screen-md mx-auto p-6 mt-10 bg-slate-100 shadow-md rounded-lg relative">
      {/* Close Button */}
      <Link to="/"
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-pink-600 text-2xl font-bold"
      >
        &times;
      </Link>

      <h1 className="text-3xl font-bold mb-4 text-center text-pink-600">Contact Us</h1>
      <p className="text-gray-600 text-center mb-8">
        We'd love to hear from you! Fill out the form below or reach us at our contact details.
      </p>

      {/* Contact Form */}
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input ref={NameRef}
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Your Email</label>
          <input ref={EmailRef}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea ref={MessageRef}
            rows="4"
            placeholder="Write your message..."
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>
        </div>

        <button onClick={handleSubmit}
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-500 transition duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="mt-10 text-center text-gray-700">
        <h2 className="text-xl font-semibold mb-2">📍 Our Office</h2>
        <h1 className="text-xl">
          Book Store managed By 👉{" "}
          <span className="text-red-400">
            Er Amarjeet Verma{" "}
            <span className="text-green-500">
              ( B.Tech )
            </span>
          </span>
        </h1>
        <p>New BookStore, Noida, Uttar Pradesh - 201301</p>
        <p>📱 +91 9000000001</p>
        <p>📧 admin@onlinebookstore.com</p>
        <p>🕒 Open: Monday - Saturday | 9:00 AM to 6:00 PM</p>
      </div>
    </div>
  );
}

export default Contact;

// import React, { useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import  toast  from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Contact() {
//   const [isOpen, setIsOpen] = useState(true); // For opening/closing the contact form
//   if (!isOpen) return null; // Don't show if closed

//   const emailRef = useRef();
//   const nameRef = useRef();
//   const messageRef = useRef();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const name = nameRef.current.value.trim();
//     const email = emailRef.current.value.trim();
//     const message = messageRef.current.value.trim();

//     if (!name || !email || !message) {
//       toast.error("❌ Please fill all the fields!");
//       return;
//     }

//     const obj = {
//       Name: name,
//       Email: email,
//       Message: message
//     };

//     try {
//       const res = await axios.post("http://localhost:1090/contact/usercontact", obj);
//       const data = res.data;

//       if (data.success === true) {
//         toast.success("✅ Message sent successfully!");
//       } else {
//         toast.error("❌ Message not sent. Please try again.");
//       }
//     } catch (error) {
//       toast.error("❌ Something went wrong!");
//     }

//     // Clear the form
//     nameRef.current.value = '';
//     emailRef.current.value = '';
//     messageRef.current.value = '';
//   };

//   return (
//     <div className="max-w-screen-md mx-auto p-6 mt-10 bg-white shadow-md rounded-lg relative">
//       {/* Close Button */}
//       <Link to="/"
//         onClick={() => setIsOpen(false)}
//         className="absolute top-4 right-4 text-gray-500 hover:text-pink-600 text-2xl font-bold"
//       >
//         &times;
//       </Link>

//       <h1 className="text-3xl font-bold mb-4 text-center text-pink-600">Contact Us</h1>
//       <p className="text-gray-600 text-center mb-8">
//         We'd love to hear from you! Fill out the form below or reach us at our contact details.
//       </p>

//       {/* Contact Form */}
//       <form className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Your Name</label>
//           <input
//             ref={nameRef}
//             type="text"
//             placeholder="Enter your name"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Your Email</label>
//           <input
//             ref={emailRef}
//             type="email"
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Message</label>
//           <textarea
//             ref={messageRef}
//             rows="4"
//             placeholder="Write your message..."
//             className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
//           ></textarea>
//         </div>

//         <button
//           onClick={handleSubmit}
//           type="submit"
//           className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-500 transition duration-300"
//         >
//           Send Message
//         </button>
//       </form>

//       {/* Contact Info */}
//       <div className="mt-10 text-center text-gray-700">
//         <h2 className="text-xl font-semibold mb-2">📍 Our Office</h2>
//         <h1 className="text-xl">
//           Book Store managed By 👉{" "}
//           <span className="text-red-400">
//             Er Amarjeet Verma{" "}
//             <span className="text-green-500">( B.Tech )</span>
//           </span>
//         </h1>
//         <p>New BookStore, Noida, Uttar Pradesh - 201301</p>
//         <p>📱 +91 9000000001</p>
//         <p>📧 admin@onlinebookstore.com</p>
//         <p>🕒 Open: Monday - Saturday | 9:00 AM to 6:00 PM</p>
//       </div>

//       {/* Toast Notification Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default Contact;


