import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`https://your-glitch-project-url.glitch.me/api/blogs/${id}`);
      const data = await response.json();
      setBlog(data);
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <div className="container blog-details">
      {blog.coverImage && <img src={blog.coverImage} alt={blog.title} style={{ width: '100%' }} />}
      <h2>{blog.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogDetails;
