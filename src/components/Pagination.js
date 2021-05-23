import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './Pagination.css'

function Pagination({ login }) {
    const [offset, setOffset] = useState(0);
    const [arr, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)

    const getData = async () => {
        const arr = []
        await axios.all([
            axios.get(`https://api.github.com/users/${login}/repos?page=2&per_page=100&page=1`),
            axios.get(`https://api.github.com/users/${login}/repos?page=2&per_page=100&page=2`),
            axios.get(`https://api.github.com/users/${login}/repos?page=2&per_page=100&page=3`),
        ]).then(res => res.map(item => item.data))
            .then(data => arr.push(...data.flat()))

        const sliced = arr.slice(offset, offset + perPage)
        const postData = sliced.map(pd => <div key={pd.id}>
            <p><a href={pd.html_url}>{pd.name}</a></p>
            <p>{pd.description}</p>
        </div>)
        setData(postData)
        setPageCount(Math.ceil(arr.length / perPage))
        console.log(arr)
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage)
    };
    useEffect(() => {
        if (login == null) return null;
        getData()
    }, [offset, login])
    return (
        <div className="App">
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
