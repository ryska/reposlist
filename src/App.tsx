import './App.scss';
import RepositoryTable from './Components/Table/RepositoryTable';
import Search from './Components/Search/Search';
import { Typography } from '@mui/material';

const App = () => {
  return (
    <div className="App">
      <Typography variant="h5" sx={{ m: 2 }}>
        Hi! Here you can search for most popular repositories 👀
      </Typography>
      <Search />
      <RepositoryTable />
    </div>
  );
};

export default App;
