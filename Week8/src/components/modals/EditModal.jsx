import { usePost } from "../../context/PostContext";
import { ImageGallery } from "../ImageGallery";



export function EditModal() {
  const {
    modalState,
    closeModal,
    editPost,
    selectedPost,
    selectedImage,
    setSelectedImage,
  } = usePost();

  if (!modalState.edit) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    editPost({
      text:  formData.get("text"),
      image: selectedImage,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 overflow-y-auto py-8">
      <div className="relative p-4 w-full max-w-md">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Post</h3>
            <button
              type="button"
              onClick={() => closeModal("edit")}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>

          <form key={selectedPost?.id} className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4">

              <div>
                <label htmlFor="editText" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Post Text
                </label>
                <textarea
                  id="editText"
                  name="text"
                  rows="4"
                  defaultValue={selectedPost?.text || ""}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white outline-none"
                  placeholder="Edit post text"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Selected Image
                </label>
                {/* Read-only field shows the currently selected image URL */}
                <input
                  type="text"
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white outline-none mb-3"
                  placeholder="Image URL"
                  readOnly
                />
                <ImageGallery onSelect={setSelectedImage} selectedImage={selectedImage} />
              </div>

            </div>

            <button
              type="submit"
              className="text-white inline-flex items-center bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              <span className="material-symbols-outlined text-base me-2">save</span>
              Save Changes
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}