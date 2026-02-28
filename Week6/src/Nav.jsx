import React from "react";
import { useState } from "react";

export function Nav() {
  const [authd, setAuthd] = useState(false);
  const [user, setUser] = useState('');

  return (
    <nav className="mx-auto flex max-w-12xl items-center justify-between p-6 lg:px-8 bg-linear-to-r from-indigo-300 via-pink-200 to-pink-300 fixed w-full z-50 max-h-2" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">React Blog</span>
          <img className="h-8 w-auto" src="./vite.svg" alt="React" />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-dark-700">
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
          </svg>
        </button>
      </div>
      <div className="hidden xl:flex lg:gap-x-12">
        <a href="#" className=" text-lg font-semibold leading-6 text-gray-900">Home</a>
        <a href="#" className="text-lg font-semibold leading-6 text-gray-900">Blog Post</a>
        <a href="#" className="text-lg font-semibold leading-6 text-gray-900">Company</a>

      </div>    
      
      <form className="ml-10 flex items-center lg:flex lg:flex-1 lg:justify-end">   
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="w-full">
            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-1 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search post by title, user..." required="" />
        </div>
        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
            </svg>
            <span className="sr-only">Search</span>
        </button>
      </form>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {!authd ?
        <a href="#" className="text-lg font-semibold leading-6 text-gray-900" onClick={() => { setAuthd(true); setUser("User"); }}>Log in <span aria-hidden="true">→</span></a>
       :
        <a href="#" className="text-lg font-semibold leading-6 text-gray-900">Welcome {user}</a>
        }
      </div>
    </nav>
  );
}
