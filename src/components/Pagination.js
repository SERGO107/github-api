import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './Pagination.css'

function Pagination({ login }) {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)


    const getData = async () => {
        const res = await axios.get(`https://api.github.com/users/${login}/repos?page=2&per_page=100&page=1`)
        const data = res.data;
        const slice = data.slice(offset, offset + perPage)
        const postData = slice.map(pd => <div key={pd.id}>
            <p><a href={pd.html_url}>{pd.name}</a></p>
            <p>{pd.description}</p>
        </div>)
        setData(postData)
        setPageCount(Math.ceil(data.length / perPage))
    }
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    useEffect(() => {
        if (login == null) return null;
        getData()
    }, [offset, login])

    return (
        <div className="App">
            {data}
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
