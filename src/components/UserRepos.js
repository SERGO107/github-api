
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { List } from 'semantic-ui-react'

function UserRepos({ login }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (login == null) return null;
        function getFetchUrl() {
            return `https://api.github.com/users/${login}/repos?page=2&per_page=100&page=1`;
        }

        async function fetchData() {
            const result = await axios(getFetchUrl());
            setData(result.data);
            console.log(result.data.map(item => (item.description)))
        }

        fetchData();
    }, [login]);

    return (
        <>
            {/* <ul>
                {data.map(item => (
                    <div key={item.id}>
                        <li >
                            <a href={item.html_url}>{item.name}</a>
                        </li>
                        <li >
                            {item.description}
                        </li>
                    </div >
                ))}
            </ul> */}

            <List>
                {data.map(item => (
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>
                            <List.Header as='a' href={item.html_url}>{item.name}</List.Header>
                            <List.Description>
                                {item.description}
                            </List.Description>
                        </List.Content>
                    </List.Item>

                ))}



            </List>
        </>
    );
}

export default UserRepos