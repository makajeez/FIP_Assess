import React from "react";
import { useState, useEffect } from "react";

const Env = {
    apiId: '6597b9a018bdf6b554c5fdd8',
    baseUrl: "https://dummyapi.io/data/v1/"
};

function Nav() {
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
          {/* <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
          </svg> */}
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
            {/* <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
            </svg> */}
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

function Card() {
const [postData, setPostData] = useState(null);

useEffect(() => {
    fetch(`${Env.baseUrl}post?limit=10`, {
        headers: {
            'app-id': Env.apiId
        }
    })
    .then(res => {
        res.json()
        console.log(res.json())
    })
    .then(data => setPostData(data.data))
    .catch(err => console.error(err));
}, []);

  return (
  <div>
    <div className="mx-auto 2xl:px-40 xl:px-20 px-8 py-20">
      <div className="inline-flex">
          <div id="speed-dial-menu-horizontal" className="tooltip items-center me-4 space-x2 ltr:space-x-reverse">
              <button data-modal-target="addPost" data-modal-toggle="addPost" type="button" className="flex justify-center items-center w-13 h-13 text-white hover:text-gray-500 bg-gray-500 rounded-full border border-indigo-900 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                  <span className="material-symbols-outlined">add</span>
              </button>
              <span className="tooltiptext">Add Post</span>
          </div>      
      </div>

      <hr className="my-10" />

      <div className="sm:grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-10">
          {postData.map((post) => {
                return (
                <div key={post.id} className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
                  <div className="py-4 px-8">
                      <div className="inline-flex gap-1">
                          <img src={post.owner.picture} className="rounded-full h-12 w-12 mb-4 mr-1" />
                          <div className="mr-1">
                              <span className="text-sm mr-2 font-light whitespace-nowrap"><strong>Author:</strong> {post.owner.firstName} {post.owner.lastName}</span><br/>
                              <span className="text-sm mr-2 font-light"><strong>Posted:</strong> {post.publishDate }</span>
                          </div>
                          <div id="speed-dial-menu-horizontal" className="tooltip items-center me-4 space-x2 ltr:space-x-reverse">
                              <button data-modal-target="editPost" data-modal-toggle="editPost" type="button" className="tooltip relative inline-flex items-center p-1 text-sm text-center">
                                  <span className="material-symbols-outlined">
                                      edit
                                  </span>
                              </button>
                              <span className="tooltiptext">edit</span>
                          </div>
                          <div id="speed-dial-menu-horizontal" className="tooltip items-center me-4 space-x2 ltr:space-x-reverse">
                              <button data-modal-target="deletePost" data-modal-toggle="deletePost"  type="button" className="tooltip relative inline-flex items-center p-1 text-sm text-center">
                                  <span className="material-symbols-outlined">
                                      delete
                                  </span>
                                  <span className="tooltiptext">delete post</span>
                              </button>
                          </div>                    
                      </div>

                      <div style={{cursor:"pointer"}}>
                          <figure className="relative max-w-sm transition-all duration-300 filter gra hover:grayscale">
                              <img style={{width: 100+ "%", height: 240+ "px"}} className="rounded-lg" src={post.image} alt="image description" />
                              <figcaption className="absolute px-4 text-lg text-white bottom-2">
                                  <button type="button" className="relative inline-flex items-center p-1 text-lg font-bold text-center text-gray-900 bg-indigo-300 rounded-lg hover:bg-indigo-400">
                                      <span className="material-symbols-outlined">
                                          thumb_up
                                          </span>
                                      <span className="sr-only">Likes</span>
                                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-900 bg-indigo-400 border-2 border-indigo-400 rounded-full -top-4 inset-e-4 dark:border-gray-900">{ }</div>
                                      </button>
                              </figcaption>
                          </figure>
                        <div>
                          {post.tags.map((tag) => {
                            return (
                                  <span key={tag} className="bg-indigo-100 text-black text-xs font-edium me-1 px-1.5 py-0.5 rounded ">{tag}</span>
                        )})}
                        </div>
                          {/* <hr className="mt-4" />
                          <p className="mb-2 text-sm ">{post.text}</p> */}
                      </div>
                  </div>
                </div>
                )}
)}
    </div>

    {/* <hr className="my-10" /> */}
    
    {/* <div className="relative flex inset-e-0 bottom-6 group">
        <div className="flex flex-col items-center">
            
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white"></span> to <span className="font-semibold text-gray-900 dark:text-white"></span> of <span className="font-semibold text-gray-900 dark:text-white">{this.totalData}</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
            <button onClick="getPosts" className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                </svg>
                Prev
            </button>
            <button onClick={() => {}} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLineCap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
            </div>
        </div>
    </div> */}


    <div id="deletePost" tabIndex="-1" arialabelledby="deletePost" role="dialog" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" className="absolute top-3 inset-e-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="deletePost">
                    {/* <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg> */}
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                    {/* <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg> */}
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this post?</h3>
                    <button data-modal-hide="deletePost" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                        Yes, I'm sure
                    </button>
                    <button data-modal-hide="deletePost" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                </div>
            </div>
        </div>
    </div>

    <div id="editPost" tabIndex="-1" aria-labelledby="editPost" role="dialog" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Edit Post
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="editPost">
                        {/* <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg> */}
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post</label>
                            <textarea  rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Edit post"></textarea>                    
                        </div>
                        <div className="col-span-2">
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
                        </div>
                        <div className="col-span-2">
                            {/* <img src="" alt="" />                         */}
                        </div> 
                        <div className="col-span-2">
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <img  className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
                                </div>
                                
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                                </div> 
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt="" />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button data-modal-hide="editPost" type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Save
                    </button>
                </form>
            </div>
        </div>
    </div>

    <div id="addPost" tabIndex="-1" aria-labelledby="addPost" role="dialog" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Create New Post
                    </h3>
                    <button data-modal-hide="addPost" type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Text</label>
                            <textarea id="text" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type post here"></textarea>                    
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Select Image from below" required="" />
                        </div>
                    
                        <div className="col-span-2">
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
                                </div>
                                
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                                </div> 
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt="" />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button data-modal-hide="addPost" type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add new post
                    </button>
                </form>
            </div>
        </div>
    </div> 
  </div>
  </div>
  )
}



export default function App() {

  return (
    <div>
      <Nav />
      <Card />
    </div>
  )

}