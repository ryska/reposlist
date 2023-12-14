import React from 'react';
import './App.css';
import TableComponent from './Components/Table/Table';
import Search from './Components/Search/Search';
import { useFetchData } from './hooks/useFetchData';

const App = () => {
  const { loading, error } = useFetchData();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong! Error: {error.message}</p>;
  }
  return (
    <div className="App">
        <Search />
        <TableComponent />
    </div>
  );
}

export default App;
