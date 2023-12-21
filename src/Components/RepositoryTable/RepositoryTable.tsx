import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { repositoriesVar } from '../../utils/variables';
import { useFetchData } from '../../hooks/useFetchData';
import { useReactiveVar } from '@apollo/client';
import './RepositoryTable.scss';

const RepositoryTable = React.memo(() => {
  const repositories = useReactiveVar(repositoriesVar);
  const { handleLoadMore, loading, error } = useFetchData();
  if (loading) {
    return <p data-testid="tableMessageLoading">Loading...</p>;
  }

  if (error) {
    return (
      <p data-testid="tableMessageError">
        Something went wrong! Error: {error.message}
      </p>
    );
  }

  return (
    <div>
      <TableContainer
        data-testid="repoTableComponent"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                🌟 Stars
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                🍴 Forks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repositories.search.edges.map(({ node }, i: number) => (
              <TableRow
                key={i}
                data-testid="repoTableRow"
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  typography: 'subtitle2',
                }}
              >
                <TableCell component="th" scope="row" data-testid="repoTableRowName">
                  <a
                    href={node.url}
                    target="_blank"
                    rel="noreferrer"
                    className="tableLink"
                  >
                    {node.name}
                  </a>
                </TableCell>
                <TableCell align="right">{node.stargazerCount}</TableCell>
                <TableCell align="right">{node.forkCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ m: 4 }}>
        <Button
          data-testid="buttonLoadMore"
          sx={{ mr: 2 }}
          variant="contained"
          disabled={!repositories.search.pageInfo.hasNextPage}
          onClick={() => handleLoadMore()}
        >
          Load more
        </Button>
      </Box>
    </div>
  );
});

export default RepositoryTable;
