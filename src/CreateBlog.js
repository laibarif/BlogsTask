import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('coverImage', coverImage);

    const response = await fetch('https://your-glitch-project-url.glitch.me/api/blogs', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setTitle('');
      setContent('');
      setCoverImage(null);
      alert('Blog created successfully!');
    } else {
      alert('Failed to create blog');
    }
  };

  return (
    <div className="container">
      <h2>Create Blog</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
      />
      <ReactQuill 
        value={content} 
        onChange={setContent} 
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateBlog;
