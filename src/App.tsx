import './App.scss';
import TableComponent from './Components/Table/Table';
import Search from './Components/Search/Search';
import { Typography } from '@mui/material';

const App = () => {
  return (
    <div className="App">
      <Typography variant="h5" sx={{ m: 2 }}>
        Hi! Here you can search for most popular repositories 👀
      </Typography>
      <Search />
      <TableComponent />
    </div>
  );
};

export default App;
