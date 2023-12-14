import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { pageVar, repositoriesVar } from '../../utils/variables';
import { useReactiveVar } from '@apollo/client';
import Button from '@mui/material/Button';
import { useFetchData } from '../../hooks/useFetchData';

const TableComponent = () => {
    const repositories = useReactiveVar(repositoriesVar);
    const { handleNextPage, handlePrevPage } = useFetchData();

    const currentPage = useReactiveVar(pageVar);
    useEffect(() => {
        console.log(currentPage);
    }, [currentPage])

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
                        {repositories.search.nodes.map((row, i: number) => (
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
                <Button disabled={!repositories.search.pageInfo.hasPreviousPage} onClick={() => handlePrevPage()}>Previous</Button>
                <Button disabled={!repositories.search.pageInfo.hasNextPage} onClick={() => handleNextPage()}>Next</Button>
            </div>
        </div>
    );
}

export default TableComponent;