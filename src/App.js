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
        'https://api.github.com/repos/expo/examples/contents?master',
        {
          headers: {
            authorization: 'token',
          },
        }
      );
      res = await res.json();
      res.splice(0, 5);
      res = res.filter(repo => repo.type !== 'file');
      console.log(res);
      setData(res);
    };
    fetchApi();
  }, []);

  let arrayOfSanitizedNameObjects = data.map(repo => {
    repo.sanitizedName = repo.name;

    if (/^with-/.test(repo.sanitizedName)) {
      repo.sanitizedName = repo.sanitizedName.replace('with-', '');
    }

    return {
      sanitizedName: repo.sanitizedName,
    };
  });

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
