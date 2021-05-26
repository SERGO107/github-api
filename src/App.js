import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react'
import UserCard from './components/UserCard'
import './App.css';
import Pagination from './components/Pagination'


function App() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [userName, setUsername] = useState(null);
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('https://hsto.org/getpro/habr/post_images/ed8/a02/65d/ed8a0265d9c3767b08d8cb162a218939.jpg');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  const [mes, setMes] = useState('');

  useEffect(() => {
    function getFetchUrl() {
      return `https://api.github.com/users/${name}`;
    }
    async function fetchData() {
      const result = await axios(getFetchUrl());
      setData(result.data);
    }
    fetchData();
  }, [])

  const setData = ({ name, login, followers, following, public_repos, avatar_url, html_url }) => {
    setName(name)
    setUsername(login)
    setFollowers(followers)
    setFollowing(following)
    setRepos(public_repos)
    setAvatar(avatar_url)
    setUrl(html_url)
  }
  const handleSearch = (e) => {
    setUserInput(e.target.value)
    let m = e.currentTarget.value
    setMes(m)
  }
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message)
        } else {
          setData(data)
          setError(null)
        }
      })
    setMes("")
  }
  return (
    <div >
      <div className="navbar">
        <div className="input">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <div className="gthbicn">
                <i class="github large icon"  ></i>
              </div>

              <Form.Input
                placeholder=''
                name='name'
                onChange={handleSearch}
                value={mes}
              />
            </Form.Group>
          </Form>
        </div>
      </div>

      <UserCard
        name={name}
        userName={userName}
        following={following}
        followers={followers}
        avatar={avatar}
        repos={repos}
        url={url}
        error={error}
      />

      <Pagination
        error={error}
        login={userName}
        repos={repos}
      />
    </div>
  );
}

export default App;
