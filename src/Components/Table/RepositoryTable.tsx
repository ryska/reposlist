import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { repositoriesVar } from '../../utils/variables';
import { useReactiveVar } from '@apollo/client';
import Button from '@mui/material/Button';
import { useFetchData } from '../../hooks/useFetchData';
import './RepositoryTable.scss';
import { Box } from '@mui/material';

const RepositoryTable = () => {
  const repositories = useReactiveVar(repositoriesVar);
  const { handleLoadMore } = useFetchData();
  const { loading, error } = useFetchData();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong! Error: {error.message}</p>;
  }

  return (
    <div>
      <TableContainer data-testid="repoTableComponent" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                🌟 Stars
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                🍴 Forks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              repositories.search.edges.map(({node}, i: number) => (
                <TableRow
                  key={i}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    typography: 'subtitle2',
                  }}
                >
                  <TableCell component="th" scope="row">
                    <a
                      href={node.url}
                      target="_blank"
                      className="tableLink"
                    >
                      {node.name}
                    </a>
                  </TableCell>
                  <TableCell align="right">
                    {node.stargazerCount}
                  </TableCell>
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
};

export default RepositoryTable;
