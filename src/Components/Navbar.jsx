import React, { useEffect, useState, useRef } from 'react';
import Login from './Login';
import { useSelector } from 'react-redux';
import { logoutState } from '../store/UserSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


function Navbar() {
    let dispatch = useDispatch()
    let useData = useSelector((state) => state.user)
    // console.log(useData.user.role)
    // let user = useData.user;
    let user = useData.user?.role;
    
    let login = useData.login
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isSticky, setIsSticky] = useState(false);
    const modalRef = useRef(null); // Ref for modal control

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    const navItems = (
        <>

           {user =="admin" && <li>
                <Link to="/admin">Admin</Link>
            </li>}
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <Link to="/course">Course</Link>
            </li>
            <li>
                <a href="/contact">Contact</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>


        </>

    );

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal(); // Open modal using ref
        }
    };

    return (
        <div className={`max-w-screen-2xl z-10 dark:bg-slate-900 dark:text-white container mx-auto md:px-20 px-4 fixed dark:border top-0 right-0 ${isSticky ? "sticky-navbar dark:bg-slate-600 dark:text-white shadow-md bg-base-300 duration-300 transition-all ease-in-out" : ""}`}>
            <div className="navbar shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <a className="text-2xl font-bold cursor-pointer">Bookstore</a>
                </div>
                <div className='navbar-end space-x-2'>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItems}
                        </ul>
                        <div className='hidden md:block'>
                            <label className="input items-center px-3 py-2 rounded-md flex gap-2">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input type="search" className="grow dark:text-black" placeholder="Search" />
                            </label>
                        </div>
                        <div>
                            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="swap swap-rotate items-center">
                                {theme === "light" ? (
                                    <span className="text-xl">🌞</span>
                                ) : (
                                    <span className="text-xl">🌙</span>
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        {/* Open modal using function */}
                        {login === true ? <button onClick={() => dispatch(logoutState())} className="bg-black text-white cursor-pointer  p-2 rounded-md w-[65px] text-center hover:bg-slate-800">Logout</button> :
                            <button className="bg-black text-white cursor-pointer  p-2 rounded-md w-[60px] text-center hover:bg-slate-800" onClick={openModal}>Login</button>}
                        {/* Pass the modalRef to Login component */}
                        <Login modalRef={modalRef} />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
