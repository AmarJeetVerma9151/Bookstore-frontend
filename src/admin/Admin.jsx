import React, { useRef, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Admin() {
  const [Name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const imageUrlRef = useRef('');

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Book Store');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dlxa04857/image/upload', formData);
      const data = res.data;
      if (data.secure_url) {
        imageUrlRef.current = data.secure_url;
        toast.success('Image uploaded successfully', {
          position: 'top-right',
          theme: 'dark',
        });
      }
    } catch (error) {
      toast.error('Image upload failed', {
        position: 'top-right',
        theme: 'dark',
      });
      console.error('Cloudinary Error:', error);
    }
  };

  const submitBooks = async (e) => {
    e.preventDefault();
    const Image = imageUrlRef.current;
    const data = { Name, title, price, category, Image };

    try {
      const response = await axios.post('http://localhost:1090/book/addbook', data);
      toast.success('Book added successfully', {
        position: 'top-right',
        theme: 'dark',
      });
      console.log(response.data);

      // Clear form inputs
      setName('');
      setTitle('');
      setPrice('');
      setCategory('');
      imageUrlRef.current = '';

      // Close modal
      document.getElementById('my_modal_6').checked = false;
    } catch (error) {
      toast.error('Failed to add book', {
        position: 'top-right',
        theme: 'dark',
      });
      console.error('Submit Error:', error);
    }
  };

  return (
    <div>
      <div className="mt-12">
        <Navbar />
      </div>

      <label htmlFor="my_modal_6" className="btn btn-primary mt-5 ml-5">
        Add Book
      </label>
      <Link to="/admin/enquiry"  className="btn bg-red-400 mt-5 ml-10">
        <button>Enquiry</button>
      </Link>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />

      <div className="modal" role="dialog">
        <div className="modal-box py-3 mt-16 bg-slate-500">
          <h3 className="text-lg font-bold text-white">Add Book Details</h3>

          <form className="bg-slate-600 text-white px-4 py-4 rounded space-y-4" onSubmit={submitBooks}>
            <div>
              <label className="block mb-1">Name</label>
              <input
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="border px-3 w-full py-2 text-black rounded"
                type="text"
                placeholder="Enter the book name..."
                required
              />
            </div>

            <div>
              <label className="block mb-1">Title</label>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border px-3 w-full py-2 text-black rounded"
                placeholder="Enter the book title..."
                required
              ></textarea>
            </div>

            <div>
              <label className="block mb-1">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border px-3 w-full py-2 text-black rounded"
                type="number"
                placeholder="Enter the book price..."
                required
              />
            </div>

            <div>
              <label className="block mb-1">Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border px-3 w-full py-2 text-black rounded"
                type="text"
                placeholder="Enter the book category..."
                required
              />
            </div>

            <div>
              <label
                className="block mb-2 py-2 px-4 bg-amber-800 text-white rounded-md hover:bg-amber-700 text-center"
                htmlFor="file"
              >
                Upload Image
              </label>
              <input
                id="file"
                className="file-input hidden file-input-bordered w-full max-w-xs"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            {imageUrlRef.current && (
              <img
                src={imageUrlRef.current}
                alt="Uploaded Preview"
                className="w-32 h-32 mt-2 rounded border"
              />
            )}

            <button
              type="submit"
              className="bg-green-300 h-10 w-full rounded-lg hover:bg-green-400 mt-4"
            >
              Book Submit
            </button>
          </form>

          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-neutral">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
``