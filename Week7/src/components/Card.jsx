import { usePost } from "../context/PostContext";
import { PostCard } from "./PostCard";
import { DeleteModal } from "./modals/DeleteModal";
import { EditModal } from "./modals/EditModal";
import { AddModal } from "./modals/AddModal";

export function Card() {
  const {
    filteredPosts,
    isLoading,
    error,
    searchQuery,
    debouncedQuery,
    openModal,
    page,
    limit,
    total,
    canGoPrev,
    canGoNext,
    handlePrev,
    handleNext,
  } = usePost();

  return (
    <div>
      <div className="mx-auto 2xl:px-40 xl:px-20 px-8 py-20">

        {/* ── Toolbar: Add Post ── */}
        <div className="inline-flex">
          <div className="tooltip items-center me-4">
            <button
              type="button"
              onClick={() => openModal("add")}
              className="flex justify-center items-center w-12 h-12 text-white bg-indigo-600 rounded-full border border-indigo-900 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-colors"
              aria-label="Add new post"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        <hr className="my-10" />

        {/* ── Loading state ── */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">Loading posts...</p>
          </div>
        )}

        {/* ── Error state ── */}
        {error && !isLoading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* ── Post grid ── */}
        {!isLoading && !error && filteredPosts.length > 0 && (
          <>
            <div className="sm:grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-10">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <hr className="my-10" />

            {/* ── Pagination — hidden during active search (filtering is client-side) ── */}
            {!debouncedQuery && (
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">{limit * page + 1}</span> to{" "}
                  <span className="font-semibold text-gray-900">{Math.min(limit * (page + 1), total)}</span> of{" "}
                  <span className="font-semibold text-gray-900">{total}</span> Entries
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
            )}
          </>
        )}

        {/* ── Empty state ── */}
        {!isLoading && !error && filteredPosts.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {searchQuery
                ? `No posts found matching "${searchQuery}"`
                : "No posts found"}
            </p>
          </div>
        )}

        {/* ── Modals — each self-manages its own visibility via context ── */}
        <DeleteModal />
        <EditModal />
        <AddModal />

      </div>
    </div>
  );
}