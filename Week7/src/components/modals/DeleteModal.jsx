import { usePost } from "../../context/PostContext";

// ─────────────────────────────────────────────────────────────────────────────
// DELETE MODAL
// Conditionally rendered — returns null when modalState.delete is false
// ─────────────────────────────────────────────────────────────────────────────
export function DeleteModal() {
  const { modalState, closeModal, deletePost, selectedPost } = usePost();

  if (!modalState.delete) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <div className="relative p-4 w-full max-w-md">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-4 md:p-5 text-center">
            <span className="material-symbols-outlined text-5xl text-gray-400 dark:text-gray-200 mb-3 block">
              warning
            </span>
            <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            {/* Preview snippet of the post being deleted */}
            {selectedPost && (
              <p className="mb-5 text-sm text-gray-400 italic truncate">
                "{selectedPost.text?.slice(0, 60)}..."
              </p>
            )}
            <button
              type="button"
              onClick={deletePost}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
            >
              Yes, delete it
            </button>
            <button
              type="button"
              onClick={() => closeModal("delete")}
              className="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium px-5 py-2.5"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}