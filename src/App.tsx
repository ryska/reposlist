import React from 'react';
import './App.css';
import TableComponent from './Components/Table/Table';
import Search from './Components/Search/Search';
import { useFetchData } from './hooks/useFetchData';

const App = () => {
  const { loading, error, repositories, handleShowMore } = useFetchData();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="App">
        <Search />
        <TableComponent />
        <button onClick={handleShowMore}>click</button>
    </div>
  );
}

export default App;
