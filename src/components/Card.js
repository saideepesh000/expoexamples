import { useEffect } from 'react';
import useModal from '../useModal';

import Modal from './Modal';

import './card.styles.css';

function Card({ repo }) {
	const { isShowing, toggle } = useModal();

	useEffect(() => {
		const fetchReadme = async () => {
			const rawReadmeMd = await fetch(
				`https://raw.githubusercontent.com/expo/examples/master/${repo.name}/README.md`
			);

			if (rawReadmeMd.status === 200) {
				const readmeMd = await rawReadmeMd.text();

				// run some regex to fix external links
				const content = readmeMd
					?.replace(
						/\]\(\./g,
						`](https://github.com/expo/examples/tree/master/${repo.name}`
					)
					?.replace(/\]\(\//g, `](https://github.com/expo/examples/tree/master`)
					?.replace(
						/src=".\//g,
						`src="https://raw.githubusercontent.com/expo/examples/master/${repo.name}/`
					);
				repo.content = content;
			}
		};
		fetchReadme();
		console.log(repo);
	});

	return (
		<div onClick={toggle}>
			<div className="card">
				<p>{repo.sanitizedName}</p>
			</div>
			<Modal repo={repo} isShowing={isShowing} hide={toggle} />
		</div>
	);
}

export default Card;
