import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react'
import UserCard from './components/UserCard'
import UserRepos from './components/UserRepos'
import './App.css';
import Pagination from './components/Pagination'


function App() {
  const [name, setName] = useState('pupilo');
  const [userName, setUsername] = useState();
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('https://hsto.org/getpro/habr/post_images/ed8/a02/65d/ed8a0265d9c3767b08d8cb162a218939.jpg');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    function getFetchUrl() {
      return `https://api.github.com/users/${name}`;
    }
    async function fetchData() {
      const result = await axios(getFetchUrl());
      setData(result.data);
      // console.log(result.data.map(item => (item.description)))
    }
    fetchData();
  }, [])

  const setData = ({ name, login, followers, following, public_repos, avatar_url }) => {
    setName(name)
    setUsername(login)
    setFollowers(followers)
    setFollowing(following)
    setRepos(public_repos)
    setAvatar(avatar_url)
  }
  const handleSearch = (e) => {
    setUserInput(e.target.value)
  }
  // useEffect(() => {}, [])

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
  }

  return (
    <div >
      <div className="navbar">
        Github Search
      <div className="input">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Input
                placeholder=''
                name='name'
                onChange={handleSearch}
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
      />
      {/* <UserRepos
        login={userName}
      /> */}
      <Pagination
        login={userName}
        repos={repos}
      />
     
    </div>
  );
}

export default App;
