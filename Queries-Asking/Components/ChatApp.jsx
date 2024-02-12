// ChatApp.jsx
import React, { useState } from 'react';
import './ChatApp.css'
// ChatApp.jsx

function QueryBox({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') { // Check if query is not empty
      onSubmit(query);
      setQuery('');
    }
  };

  return (
    <div className="query-box">
      <button onClick={handleSubmit}>Ask Query</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query here..."
        />
        <button type="submit">Post Query</button>
      </form>
    </div>
  );
}


function Query({ query, onReply }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [reply, setReply] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply(query.id, reply);
    setReply('');
  };

  return (
    <div className="query">
      <p>{query.text}</p>
      <button onClick={() => setShowReplyInput(!showReplyInput)}>
        {showReplyInput ? 'Hide Reply' : 'Reply'}
      </button>
      {showReplyInput && (
        <form onSubmit={handleReplySubmit}>
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write your reply here..."
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <ul>
        {query.replies.map((reply, index) => (
          <li key={index}>{reply}</li>
        ))}
      </ul>
    </div>
  );
}

function ChatApp() {
  const [queries, setQueries] = useState([]);

  const handleQuerySubmit = (queryText) => {
    const newQueryObj = {
      id: queries.length,
      text: queryText,
      replies: [],
    };
    setQueries([...queries, newQueryObj]);
  };

  const handleReplySubmit = (queryId, replyText) => {
    if (replyText.trim() !== '') {
      const updatedQueries = queries.map((query) => {
        if (query.id === queryId) {
          return {
            ...query,
            replies: [...query.replies, replyText],
          };
        }
        return query;
      });
      setQueries(updatedQueries);
    }
  };

  return (
    <div>
      <h1>Query and Reply System</h1>
      <QueryBox onSubmit={handleQuerySubmit} />
      <hr />
      {queries.map((query) => (
        <Query key={query.id} query={query} onReply={handleReplySubmit} />
      ))}
    </div>
  );
}

export default ChatApp;
