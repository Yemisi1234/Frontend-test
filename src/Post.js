import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <div class="loader"></div>
  }

  return (
    <>
 {
         posts.map((row) => (
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
    </>
  );
};

export default Posts;


