import './searchInput.styles.css';

function SearchInput({ value, onSearch }) {
	return (
		<input
			className="searchInput"
			type="text"
			placeholder="Search"
			onChange={e => onSearch(e.target.value)}
			value={value}
		/>
	);
}

export default SearchInput;
