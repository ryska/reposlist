import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { searchValueVar } from '../../utils/variables';
import { useFetchData } from '../../hooks/useFetchData';

const Search = () => {
  const [value, setValue] = useState('');
  const { loading } = useFetchData();

  const handleSearch = () => {
    searchValueVar(value);
  };

  return (
    <Box
      data-testid="searchComponent"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        m: 4,
      }}
    >
      <TextField
        data-testid="searchInput"
        placeholder="user:facebook"
        variant="outlined"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        sx={{ width: 1, maxWidth: 300, mr: 2 }}
      />
      <Button data-testid="searchButton" type="button" onClick={handleSearch} disabled={loading}>
        Search
      </Button>
    </Box>
  );
};

export default Search;
