import { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';

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
    return null;
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
      <h1><span>Expo</span> Examples</h1>
      <SearchInput onSearch={setSearchRepo} value={searchRepo} />
      <div className="cardsContainer">
        {data.filter(filterNames).map(repo => (
                        <Fade bottom>

          <Card repo={repo} />
          </Fade>
        ))}


      </div>
    </div>
  );
}

export default App;
