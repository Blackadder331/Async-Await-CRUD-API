import React, { useState, useEffect } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // GET with fetch API
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=4'
      );
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    fetchPost();
  }, []);

  // Delete with fetchAPI
  const deletePost = async (id) => {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
          method: 'DELETE',
      }
    );
    if (response.status === 200) {
      setPosts(
          posts.filter((post) => {
            return post.id !== id;
          })
      );
    } else {
      return;
    }
  };

  // Post with fetchAPI
  const addPosts = async (title, body) => {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
          title: title,
          body: body,
          userId: Math.random().toString(36).slice(2),
      }),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
    });
    let data = await response.json();
    setPosts((posts) => [data, ...posts]);
    setTitle('');
    setBody('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts(title, body);
  };
 
 return (
    <div className="app">
    <div className="add-post-container">
      <br />
      <form onSubmit={handleSubmit}>
          <input type="text" className="form-control" value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br /><br />
          <textarea name="" className="form-control" id="" cols="25" rows="10" 
            value={body} onChange={(e) => setBody(e.target.value)} 
          ></textarea>
          <br /><br />
          <button type="submit">Add Post</button>
      </form>
    </div>
    <div className="posts-container">
          {posts.map((post) => {
              return (
                <div className="post-card" key={post.id}>
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-body">{post.body}</p>
                    <div className="button">
                      <div className="button">
                        <div className="delete-btn" onClick={() => deletePost(post.id)}>
                          Delete
                        </div>
                      </div>    
                    </div>  
                </div>
              );
          })}
        </div>
    </div>
    );
};

export default App;