import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { repositories } from '../../utils/variables';
import { useReactiveVar } from '@apollo/client';
import Button from '@mui/material/Button';
import { useFetchData } from '../../hooks/useFetchData';

const TableComponent = () => {
    const repositoryList = useReactiveVar(repositories);
    const { currentPage, handlePrevPage, handleNextPage } = useFetchData();

    return (
        <div>
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
                        {repositoryList.map((row, i: number) => (
                            <TableRow
                                key={i}
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
            <div>
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
                <Button onClick={handleNextPage}>Next</Button>
            </div>
        </div>
    );
}

export default TableComponent;