import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { searchValueVar } from "../../utils/variables";

const Search = () => {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    searchValueVar(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        m: 4,
      }}
    >
      <TextField
        data-testid="searchInput"
        id="outlined-basic"
        placeholder="user:facebook"
        label="Search"
        variant="outlined"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        sx={{ width: 1, maxWidth: 300, mr: 2 }}
      />
      <Button data-testid="searchButton" type="button" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default Search;
