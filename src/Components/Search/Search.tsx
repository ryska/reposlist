import TextField from "@mui/material/TextField"
import { useFetchData } from "../../hooks/useFetchData";
import { Button } from "@mui/material";
import { useState } from "react";


const Search = () => {
    const { setSearchValue } = useFetchData();
    const [value, setValue] = useState('');
  
    const handleSearch = () => {
      setSearchValue(value);
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