import React,{useEffect, useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Posts from './Post';
import Pagination from "./Pagination";
import "./App.css";

export default function App({itemsPerPage}) {
 const [data, setData] = useState([]);
 const [error, setError] = useState({});
 const [loading, setLoading] = useState(false)
 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage] = useState(6);
 
 
 
 useEffect(() => {
  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get(`https://swapi.dev/api/planets/?page=${itemsPerPage}`);
    setData(res.data.results);
    setLoading(false);
  };

  fetchPosts();
}, []);
 
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

 return (
  <TableContainer component={Paper}>
    <Table aria-label="simple table" stickyHeader >
      <TableHead>
        <TableRow >
          <TableCell >name</TableCell>
          <TableCell align="right">Rotation period</TableCell>
          <TableCell align="right">Orbital period</TableCell>
          <TableCell align="right">Diameter</TableCell>
          <TableCell align="right">Climate</TableCell>
          <TableCell align="right">Surface water</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
        itemsPerPage={itemsPerPage}
       
      />
      </TableBody>
      
    </Table>
  </TableContainer>
);
}

