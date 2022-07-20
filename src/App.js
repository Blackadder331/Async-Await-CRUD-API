import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

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
    <Container>
    <br></br>
    <h1>The Social Network</h1>
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
          <Button className='btn-success' type="submit">Add Post</Button>
      </form>
    </div>
    <div className="posts-container">
          {posts.map((post) => {
              return (

                <Card className="post-card" key={post.id}>
                    <Card.Header>
                    <br></br>
                    <h2 className="post-title">{post.title}</h2>
                    <br></br>
                    </Card.Header>
                    <br></br>
                    <Card.Body className="post-body">{post.body}</Card.Body>
                    <Button className='btn-dark btn-sm post-btn' type='button'>
                      <div className="button">
                        <div className="delete-btn " onClick={() => deletePost(post.id)}>
                          Delete
                        </div>
                      </div>    
                    </Button> 
                    <br></br> 
                </Card>

              );
          })}
        </div>
    </div>
    </Container>
    );
};

export default App;