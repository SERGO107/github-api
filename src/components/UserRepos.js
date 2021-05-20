
import React, { useState, useEffect } from "react";
import axios from 'axios';

function UserRepos({ login }) {
    const [data, setData] = useState([]);
    // const [query, setQuery] = useState('');

    useEffect(() => {
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
            <ul>
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
            </ul>
        </>
    );
}

export default UserRepos