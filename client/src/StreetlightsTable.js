// src/StreetlightsTable.js

import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RoomIcon from '@mui/icons-material/Room';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'id', label: 'Streetlight ID', minWidth: 20 },
    { id: 'coordinates', label: 'Coordinates', minWidth: 50 },
    { id: 'status', label: 'Status', minWidth: 50 }
]


function StreetlightsTable({ records, onEdit, refreshRecords, handleDelete }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ width: '45%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader aria-label="sticky table" size='small'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key='actions' style={{minWidth: 10}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={record.id}>
                      {columns.map((column) => {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {record[column.id]}
                            {/* {column.id == 'coordinates' && <IconButton aria-label='view'><RoomIcon/></IconButton>} */}
                          </TableCell>
                        );
                      })}
                        <TableCell key='actions' style={{minWidth: 10}}>
                            <Tooltip title='View in Map'>
                                <IconButton aria-label='view'>
                                    <RoomIcon/>
                                </IconButton>
                            </Tooltip>
                            
                            <Tooltip title='Update'>
                                <IconButton
                                aria-label="update"
                                onClick={() => onEdit(record)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Delete'>
                                <IconButton
                                aria-label="delete"
                                onClick={() => handleDelete(record.id)}
                                color='error'>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={records.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
}

export default StreetlightsTable;
