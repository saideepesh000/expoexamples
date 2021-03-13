import { useState, useEffect } from 'react';

import SearchInput from './components/SearchInput';
import Card from './components/Card';

import './styles.css';

function App() {
  const [data, setData] = useState([]);
  const [searchRepo, setSearchRepo] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      let res = await fetch(
        'https://api.github.com/repos/expo/examples/contents?master'
      );
      res = await res.json();
      res.splice(0, 5);
      res = res.filter(repo => repo.type !== 'file');
      setData(res);
    };
    fetchApi();
  }, []);

   data.map(repo => {
    repo.sanitizedName = repo.name;

    if (/^with-/.test(repo.sanitizedName)) {
      repo.sanitizedName = repo.sanitizedName.replace('with-', '');
    }
  });

  data?.sort((a, b) =>
    a.sanitizedName > b.sanitizedName
      ? 1
      : b.sanitizedName > a.sanitizedName
      ? -1
      : 0
  );

  const filterNames = ({ sanitizedName }) => {
    return sanitizedName.toLowerCase().indexOf(searchRepo.toLowerCase()) !== -1;
  };


  return (
    <div className="container">
      <SearchInput onSearch={setSearchRepo} value={searchRepo} />
      <div className="cardsContainer">
        {data.filter(filterNames).map(repo => (
          <Card repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default App;
