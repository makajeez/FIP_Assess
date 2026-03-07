import { useState, useEffect, useCallback } from "react";
import { Nav } from "./Nav";
import { ImageGallery } from "./ImageGallery";


const ENV = {
  apiId: "6597b9a018bdf6b554c5fdd8",
  baseUrl: "https://dummyapi.io/data/v1/",
  userID: "",
};



function PostCard({ post, onEdit, onDelete }) {

    

  return (
    <div className="hover:bg-gray-900 hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
      <div className="py-4 px-8">

        <div className="inline-flex gap-1 items-start">
          <img
            src={post.owner.picture}
            className="rounded-full h-12 w-12 mb-4 mr-1"
            alt={`${post.owner.firstName}'s avatar`}
          />
          <div className="mr-1 flex-1">
            <span className="text-sm font-light whitespace-nowrap">
              <strong>Author:</strong> {post.owner.firstName} {post.owner.lastName}
            </span>
            <br />
            <span className="text-sm font-light">
                { post.publishDate === post.updatedDate? (
                     <span>
                        <strong>Posted:</strong> {new Date(post.publishDate).toLocaleDateString()}
                    </span>
                ) : (
                    <span>
                        <strong>Updated:</strong> {new Date(post.updatedDate).toLocaleDateString()}
                    </span>
                )}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onEdit(post)}
            className="relative inline-flex items-center p-1 text-sm cursor-pointer"
            aria-label="Edit post"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>

          <button
            type="button"
            onClick={() => onDelete(post)}
            className="relative inline-flex items-center p-1 text-sm cursor-pointer"
            aria-label="Delete post"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>

        <figure className="relative transition-all duration-300 hover:grayscale">
          <img
            className="w-full h-60 object-cover rounded-lg" 
            src={post.image}
            alt="Post cover"
          />
          <figcaption className="absolute px-4 text-lg text-white bottom-2">
            <button
              type="button"
              className="relative inline-flex items-center p-1 text-lg font-bold text-gray-900 bg-indigo-300 rounded-lg hover:bg-indigo-400"
            >
              <span className="material-symbols-outlined">thumb_up</span>
              <span className="sr-only">Likes</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-gray-900 bg-indigo-400 border-2 border-indigo-400 rounded-full -top-4 inset-e-4">
               {post.likes}
              </div>
            </button>
          </figcaption>
        </figure>

        <div className="mt-2">
          {post.tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="bg-indigo-100 text-black text-xs me-1 px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
          <hr />
          <div>
            {post.text}
          </div>
      </div>
    </div>
  );
}

function Card() {
  const [postData, setPostData]     = useState([]);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(0);
  const [limit]                     = useState(20);   // limit is fixed; no setter needed
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState(null);
  const [selectedPost, setSelectedPost] = useState(null); // tracks which post is being edited/deleted
  const [selectedImage, setSelectedImage] = useState(""); // tracks image chosen in modals
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
  });
    const openModal  = (type, post = null) => {
        setSelectedPost(post);
        setModalState((prev) => ({ ...prev, [type]: true }));
    };

    const closeModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
    setSelectedPost(null);
    };

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${ENV.baseUrl}post?limit=${limit}&page=${page}`,
        { headers: { "app-id": ENV.apiId } }
      );

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      setPostData(data.data);
      
      setTotal(data.total);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("Failed to load posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [limit, page]); 



  const editPost = useCallback(async (postId, updatedData) => {
    // setIsLoading(true);
    // setError(null);
    try {
      const response = await fetch(`${ENV.baseUrl}post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "app-id": ENV.apiId
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      setPostData((prev) =>
        prev.map((post) => (post.id === postId ? data : post))
      );
    //   setIsLoading(false);
    //   setError(null);
    } catch (err) {
      console.error("Failed to edit post:", err);
      setError("Failed to edit post. Please try again.");
    }
  }, []);

  const addPost = useCallback(async (newPostData) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await fetch(`${ENV.baseUrl}post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "app-id": ENV.apiId
        },
        body: JSON.stringify({...newPostData, owner: ENV.userID, likes: 10, tags: ['soft', 'lift', 'bench']})
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      setPostData((prev) => [...prev, data]);
    } catch (err) {
      console.error("Failed to add post:", err);
      setError("Failed to add post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePost = async () => {
    try {
      await fetch(`${ENV.baseUrl}post/${selectedPost.id}`, {
        method: "DELETE",
        headers: { "app-id": ENV.apiId },
      });
      fetchPosts();
      closeModal("delete");
    } catch (err) {
      setError("Failed to delete post.", err);
    }
  };
  

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const totalPages = Math.ceil(total / limit);
  const canGoPrev  = page > 0;
  const canGoNext  = page < totalPages - 1;

  const handlePrev = () => { if (canGoPrev) setPage((p) => p - 1); };
  const handleNext = () => { if (canGoNext) setPage((p) => p + 1); };

  return (
    <div>
      <div className="mx-auto 2xl:px-40 xl:px-20 px-8 py-20">

        <div className="inline-flex">
          <div className="tooltip items-center me-4">
            <button
              type="button"
              onClick={() => openModal("add")}
              className="flex justify-center items-center w-13 h-13 text-white bg-gray-500 rounded-full border border-indigo-900 hover:bg-gray-50 hover:text-gray-500 focus:ring-4 focus:ring-gray-300 focus:outline-none"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
            <span className="tooltiptext">Add Post</span>
          </div>
        </div>

        <hr className="my-10" />

        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm text-gray-500 animate-pulse">Loading posts...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {!isLoading && !error && postData.length > 0 ? (
          <>
            <div className="sm:grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-10">
              {postData.map((post) => (
                <PostCard
                key={post.id}
                post={post}
                onEdit={() => openModal("edit", post)}
                onDelete={() => openModal("delete", post)}
                />
              ))}
            </div>

            <hr className="my-10" />

            {/* Pagination */}
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold">{limit * page + 1}</span> to{" "}
                <span className="font-semibold">{Math.min(limit * (page + 1), total)}</span> of{" "}
                <span className="font-semibold">{total}</span> Entries
              </span>
              <div className="inline-flex mt-2">
                <button
                  onClick={handlePrev}
                  disabled={!canGoPrev}
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                  </svg>
                  Prev
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-s border-gray-700 rounded-e hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <svg className="w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          !isLoading && !error && (
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-700">No posts found</p>
            </div>
          )
        )}


        {modalState.delete && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
            <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete{" "}
                    <strong>{selectedPost?.text?.slice(0, 30)}...</strong>?
                </h3>
                <button
                    type="button"
                    onClick={() => {
                    deletePost();
                    closeModal("delete");
                    }}
                    className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                >
                    Yes, I'm sure
                </button>
                <button
                    type="button"
                    onClick={() => closeModal("delete")}
                    className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
                >
                    No, cancel
                </button>
                </div>
            </div>
            </div>
        </div>
        )}

        {modalState.edit && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
            <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Post</h3>
                </div>
                <form key={selectedPost?.id} className="p-4 md:p-5" onSubmit={(e) => {
                e.preventDefault(); 
                const formElement = e.target;
                const editTextValue = formElement.querySelector('#editText').value;
                editPost(selectedPost?.id, { 
                    text: editTextValue, 
                    image: selectedImage
                });
                // fetchPosts();
                closeModal("edit");
                }}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                    <label htmlFor="editText" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post</label>
                    <textarea
                        id="editText"
                        rows="4"
                        defaultValue={selectedPost?.text || ""}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-600 dark:text-white"
                        placeholder="Edit post"
                    />
                    </div>
                    <div className="col-span-2">
                    <ImageGallery onSelect={setSelectedImage} selectedImage={selectedImage} />
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                    Save
                </button>
                <button
                    type="button"
                    onClick={() => closeModal("edit")}
                    className="text-gray-700 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mx-2"
                >
                    Cancel
                </button>
                </form>
            </div>
            </div>
        </div>
        )}

        {modalState.add && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
            <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Post</h3>
                <button
                    type="button"
                    onClick={() => closeModal("add")}
                    className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                >
                    <span className="sr-only">Close modal</span>
                </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={(e) => {
                e.preventDefault();
                addPost({
                    text: e.target.addText.value,
                    image: selectedImage
                });
                closeModal("add");
                }}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                    <label htmlFor="addText" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Text</label>
                    <textarea
                        id="addText"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-600 dark:text-white"
                        placeholder="Type post here"
                    />
                    </div>
                    <div className="col-span-2">
                    <input
                        type="text"
                        value={selectedImage}
                        onChange={(e) => setSelectedImage(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                        placeholder="Select image from below"
                        required
                    />
                    </div>
                    <div className="col-span-2">
                    <ImageGallery onSelect={setSelectedImage} selectedImage={selectedImage} />
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                    Add new post
                </button>
                </form>
            </div>
            </div>
        </div>
        )}

      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Nav />
      <Card />
    </div>
  );
}