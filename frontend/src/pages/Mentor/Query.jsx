import React, { useState } from "react";
import History from "./History";

const Query = () => {
  const [username, setUsername] = useState("");
  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState(true);

  const handleAskQuery = () => {
    // Implement the logic to handle the query submission
    console.log(`Username: ${username}, Query: ${query}`);
  };

  const handleViewHistory = () => {
    // Implement the logic to view query history
    console.log("Viewing query history");
  };

  return (
    <>
      {toggle ? (
        <div className="max-w-md mx-auto mt-11 p-4 border rounded-md relative">
          <button
            className="fixed top-5 right-5 mt-2 mr-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            onClick={() => setToggle(false)}
          >
            History
          </button>

          <h1 className="text-2xl font-bold mb-4">Ask a Query</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Your Query
            </label>
            <textarea
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Ask your query here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleAskQuery}
          >
            Ask Query
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto mt-11">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Chat History</h1>
            <History />
          </div>
          <button
            className="fixed top-5 right-5 mt-2 mr-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            onClick={() => setToggle(true)}
          >
            Ask Query
          </button>
        </div>
      )}
    </>
  );
};

export default Query;
