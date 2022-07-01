import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './_components/Pagination';
import PokemonList from './_components/PokemonList';

const Products = (props) => {
	const [pokemon, setPokemon] = useState([]);
	const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
	const [nextPageUrl, setNextPageUrl] = useState('');
	const [prevPageUrl, setPrevPageUrl] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios.get(currentPageUrl).then((res) => {
			setLoading(false);
			setNextPageUrl(res.data.next);
			setPrevPageUrl(res.data.previous);
			setPokemon(res.data.results.map((p) => p.name));
		});
	}, [currentPageUrl]);

	function gotoPrevPage() {
		setCurrentPageUrl(prevPageUrl);
	}

	function gotoNextPage() {
		setCurrentPageUrl(nextPageUrl);
	}

	if (loading) return 'Loading';

	return (
		<>
			<PokemonList pokemon={pokemon} />
			<Pagination
				gotoNextPage={nextPageUrl ? gotoNextPage : null}
				gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
			/>
		</>
	);
};

export default Products;
