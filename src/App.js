import React, { useEffect, useState } from "react";
import "./App.css";

// Render each post
function renderPost(post) {
  const {
    data: { title, url, author, id },
  } = post;
  const authorUrl = `https://www.reddit.com/u/${author}`;

  return (
    <div className="reddit_widget__post" key={id}>
      <div className="reddit_widget__posted_by">
        posted by{" "}
        <a
          href={authorUrl}
          className="reddit_widget__posted_by"
          target="_blank"
          rel="noopener noreferrer"
        >
          u/{author}
        </a>
      </div>
      <a
        href={url}
        className="reddit_widget__title"
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
    </div>
  );
}

// Filter, since reddit always returns stickied posts up top
function nonStickiedOnly(post) {
  return !post.data.stickied;
}

function App({ domElement }) {
  const subreddit = domElement.getAttribute("data-subreddit");
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://catfact.ninja/fact`);
        const data = await response.json();
        setLoading(false);
        setData(data.fact);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("error fetching from reddit");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="reddit_widget__app">
      <h1 className="reddit_widget__header">
        Latest posts in{" "}
        <a href={`https://reddit.com/r/${subreddit}`} rel="noopener noreferrer">
          /r/{subreddit}
        </a>
      </h1>
      <div className="reddit_widget__inner">
        {loading && "Loading..."}
        {error && error}
        {data}
        {/* {!!data.length && data.filter(nonStickiedOnly).map(renderPost)} */}
      </div>
    </div>
  );
}

export default App;
