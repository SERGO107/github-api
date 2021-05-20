import React from 'react';
import {Card, Image, Icon } from 'semantic-ui-react'
import './UserCard.css';

const UserCard = ({error,name,userName,following,avatar, repos, followers}) => {
  return (
    <div>
      
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false}  />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{userName}</Card.Header>
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
        </div>)
    </div>
  
  )}
export default UserCard