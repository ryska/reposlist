import TextField from "@mui/material/TextField"
import { Button } from "@mui/material";
import { useState } from "react";
import { searchValueVar } from "../../utils/variables";


const Search = () => {
    const [value, setValue] = useState('');
  
    const handleSearch = () => {
        searchValueVar(value);
    };
  
    return (
      <>
        <TextField
          id="outlined-basic"
          placeholder="user: facebook"
          label="Search"
          variant="outlined"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <Button type="button" onClick={handleSearch}>
          Search
        </Button>
      </>
    );
  };
  
  export default Search;