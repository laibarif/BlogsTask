import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('https://your-glitch-project-url.glitch.me/api/blogs');
      const data = await response.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <h2>View Blogs</h2>
      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id}>
              {blog.coverImage && <img src={blog.coverImage} alt={blog.title} style={{ width: '100px', height: '100px' }} />}
              <h3>{blog.title}</h3>
              <Link to={`/blog/${blog.id}`}>Read More</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewBlogs;
