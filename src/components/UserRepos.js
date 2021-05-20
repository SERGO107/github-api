import React, { useState, useEffect } from 'react'

const UserRepos = ({ login }) => {

    const [posts, setPosts] = useState([])
    // const [setrepos, setUserRepos] = useState([])
    useEffect(() => {
        fetch(`https://api.github.com/users/${login}/repos?page=2&per_page=100&page=1`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPosts(data);
            })
    }, [login])
    return (
        <ul >
            {posts.map(post => (
                <div>
                    <a>
                        <li key={post.id} >
                            {post.name}
                        </li>
                    </a>
                    <li key={post.node_id} >
                        {post.description}
                    </li>
                </div>
            ))}
        </ul>
    )
}
export default UserRepos
