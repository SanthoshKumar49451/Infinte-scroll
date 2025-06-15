
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Circles } from "react-loader-spinner";


const PAGE_SIZE = 20;

const InfinteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${PAGE_SIZE}`
      );

      const newPosts = response.data;
      console.log(newPosts)
      setPosts((prev) => [...prev, ...newPosts]);


      if (newPosts.length < PAGE_SIZE) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = searchTerm
    ? posts.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : posts;

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Infinite Scroll with Search
      </h2>

      <input
        type="text"
        placeholder="Search comments..."
        className="w-full mb-8 p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-6">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>

        }
        endMessage={
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            <b>No more comments!</b>
          </p>
        }
      >
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <img
              src="https://www.svgrepo.com/show/327408/no-data.svg"
              alt="No data"
              className="w-40 h-40 mx-auto mb-4 opacity-70 dark:invert"
            />
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No comments found.
            </p>
            <button
              onClick={handleClearSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out animate-fade-in hover:cursor-pointer"
              >
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {item.name}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                  {item.email}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default InfinteScroll;


