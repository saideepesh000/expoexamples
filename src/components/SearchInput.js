import React from 'react';

function SearchInput({ value, onSearch }) {
	return (
		<input type="text" onChange={e => onSearch(e.target.value)} value={value} />
	);
}

export default SearchInput;
