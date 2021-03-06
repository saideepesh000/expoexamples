import { Box, Text } from '@chakra-ui/react';

import './card.styles.css';

function Card({ repo }) {
	return (
		<div className="card">
			<p>{repo.sanitizedName}</p>
		</div>
	);
}

export default Card;
