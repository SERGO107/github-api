import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List } from 'semantic-ui-react'
import ReactPaginate from 'react-paginate';
import './Pagination.css'

function Pagination({ login, error, repos }) {
    const [offset, setOffset] = useState(0);
    const [arr, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)

    const arl = []
    const pages = Math.ceil(repos / 100)
    console.log(pages)
    for (let i = 1; i <= pages; i++) {
        arl.push(axios.get(`https://api.github.com/users/${login}/repos?page=2&per_page=100&page=${i}`))
    }
    const getData = async () => {
        const arr = []
        await axios.all([
            ...arl
        ]).then(res => res.map(item => item.data))
            .then(data => arr.push(...data.flat()))

        const sliced = arr.slice(offset, offset + perPage)
        const postData = sliced.map(pd =>
            <div id="wrap">
                <List.Item key={pd.id}>
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a' target="_blank" href={pd.html_url}>{pd.name}</List.Header>
                        <List.Description >{pd.description}</List.Description>
                    </List.Content>
                </List.Item>
            </div>
        )

        setData(postData)
        setPageCount(Math.ceil(arr.length / perPage))
        console.log(arl)
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage)
    };
    useEffect(() => {
        if (login == null) return null;
        getData()


    }, [offset, login, repos])

    if (error) {
        return (
            <div>

            </div>
        )
    }
    if (login === null) {
        return (<div>

        </div>)
    }
    if (repos === 0) {
        return (
            <div className='reposNotFound'>
                <img src='https://cdn2.iconfinder.com/data/icons/documents-and-files-v-2/100/doc-03-256.png' />
            </div>
        )
    }
    return (
        <div id="Ap">
            {arr}
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        </div>
    );
}
export default Pagination;
