import React, { useState, useEffect } from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react'
import UserCard from './components/UserCard'
import UserRepos from './components/UserRepos'
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://api.github.com/users/${name}`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        
      })
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
                placeholder='GIT user'
                name='name'
                onChange={handleSearch}
              />
            </Form.Group>
          </Form>
        </div>
      </div>

      <UserCard
        name={name}
        login={userName}
        following={following}
        followers={followers}
        avatar={avatar}
        repos={repos} 
             
      />
      <UserRepos 
      login={userName}
      />
    </div>
  );
}

export default App;
