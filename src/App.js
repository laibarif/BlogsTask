import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateBlog from './CreateBlog';
import ViewBlogs from './ViewBlogs';
import BlogDetails from './BlogDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Create Blog</Link>
            </li>
            <li>
              <Link to="/blogs">View Blogs</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<CreateBlog />} />
            <Route path="/blogs" element={<ViewBlogs />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
