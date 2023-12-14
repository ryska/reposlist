import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Repository } from '../../utils/types';
import { useFetchData } from '../../hooks/useFetchData';


const TableComponent = () => {
    const { loading, error, repositories, handleShowMore } = useFetchData();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">🌟 Stars</TableCell>
                        <TableCell align="right">🍴 Forks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {repositories.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <a href={row.url} target='_blank'>
                                    {row.name}
                                </a>
                            </TableCell>
                            <TableCell align="right">{row.stargazerCount}</TableCell>
                            <TableCell align="right">{row.forkCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent;