import React,{useEffect, useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "./App.css";

export default function App({itemsPerPage}) {
 const [data, setData] = useState([]);
 const [error, setError] = useState({});
 const [loading, setLoading] = useState(false)
 const [pageCount, setPageCount] = useState(0);
 const [itemOffset, setItemOffset] = useState(0);
 
 
 useEffect(() => {
  setLoading(true)
  setError({});
   axios
     .get(`https://swapi.dev/api/planets/?page=${itemsPerPage}`)
     .then((res) => {
      console.log(res)
      return res
    })
     .then((res) => {
       setData(res.data.results);
       console.log("Result:", res.data.results);
     })
     .catch((error) => {
      setError(error);
     },
     setLoading(false)
     );
 }, [itemsPerPage]);
 
 useEffect(() => {
  const endOffset = itemOffset + itemsPerPage;
  setData(data.slice(itemOffset, endOffset));
  setPageCount(Math.ceil(data.length / itemsPerPage));
}, [itemOffset, itemsPerPage]);
const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % data.length;
  setItemOffset(newOffset);
};
if(error){
  <h2>An error occured</h2>
}

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
      {
         data.map((row) => (
          <TableRow key={row.id} >
            <TableCell component="th" scope="row" >
              {row.name}
            </TableCell>
            <TableCell align="right">{row.rotation_period}</TableCell>
            <TableCell align="right">{row.orbital_period}</TableCell>
            <TableCell align="right">{row.diameter}</TableCell>
            <TableCell align="right">{row.climate}</TableCell>
            <TableCell align="right">{row.surface_water}</TableCell>
          </TableRow>
        ))}
          <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="paginate"
     />
      </TableBody>
      
    </Table>
  </TableContainer>
);
}

