 
import { useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetState } from "../store/UserSlice";
import axios from "axios";

function Login({ modalRef }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const userRef = useRef();
  const adminRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    let selectedValue = null;
    if (adminRef.current.checked) {
      selectedValue = adminRef.current.value;
    } else if (userRef.current.checked) {
      selectedValue = userRef.current.value;
    }

    const obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: selectedValue,
    };

    if (!obj.email || !obj.password || !obj.role) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:1090/user/login`, obj);

      if (res.data.message === "Login successfully") {
        toast.success("Login successful!");
        dispatch(SetState(res.data.user));
        navigate("/");
        modalRef.current.close();
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error("Login Error:", error);
      }
    }
  };

  return (
    <dialog ref={modalRef} id="my_modal_3" className="modal ">
      <div className="modal-box dark:bg-slate-900  bg-gray-400 dark:text-white p-5">
        <Link
          to="/"
          onClick={() => modalRef.current.close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </Link>
        <h3 className="font-bold text-lg w-full">Login</h3>

        <form onSubmit={handleLogin} className="pt-5 space-y-2">
          <div>
            <label>Email</label>
            <br />
            <input
              ref={emailRef}
              type="email"
              required
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs mt-2 dark:text-black"
            />
          </div>

          <div className="mt-5 space-y-2">
            <label>Password</label>
            <br />
            <input
              ref={passwordRef}
              type="password"
              required
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-xs dark:text-black"
            />
          </div>

          <div className="mt-5">
            <label className="p-1" htmlFor="admin">Admin</label>
            <input
              className="mr-4"
              type="radio"
              id="admin"
              name="role"
              value="admin"
              ref={adminRef}
            />

            <label className="p-1" htmlFor="user">User</label>
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              ref={userRef}
            />
          </div>

          <div className="flex mt-5 justify-around">
            <button
              type="submit"
              className="px-3 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-700 duration-200"
            >
              Login
            </button>
            <p>
              Not registered?{" "}
              <Link
                to="/signup"
                className="underline text-blue-500 cursor-pointer"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default Login;

