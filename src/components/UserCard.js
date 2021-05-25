import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react'
import './UserCard.css';

const UserCard = ({ error, name, userName, following, avatar, repos, followers, url }) => {
  if (error) {
    return (<div className='userNotFound'>
      <img src="https://shorelinewebmarketing.com/wp-content/uploads/2018/02/404-error-page.jpg" />
    </div>)
  }

  if (userName === null) {
    return (<div className='empty'>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/111px-Vector_search_icon.svg.png" />
    </div>)
  }


  return (
    <div >
      <div className="card">
        <Card>
          <Image src={avatar} wrapped ui={true} circular />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Header><a target="_blank" href={url}>{userName}</a></Card.Header>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {followers} followers
      </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {repos} repos
      </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {following} following
      </a>
          </Card.Content>
        </Card>
      </div>
    </div>

  )
}
export default UserCard