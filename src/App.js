import { useState, useEffect } from 'react';
import { Box, UnorderedList, ListItem, Input } from '@chakra-ui/react';

import SearchInput from './components/SearchInput';

function App() {
  const [data, setData] = useState([]);
  const [searchRepo, setSearchRepo] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      let res = await fetch(
        'https://api.github.com/repos/expo/examples/contents?master',
        {
          headers: {
            authorization: `token ${process.env.REACT_APP_GITHUB_API_KEY}`,
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
    <Box>
      <SearchInput onSearch={setSearchRepo} value={searchRepo} />
      <UnorderedList>
        {arrayOfSanitizedNameObjects.filter(filterNames).map(repo => (
          <ListItem>{repo.sanitizedName}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}

export default App;
