import { Button, Card, Col, Divider, PageHeader, Row, Space } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { range } from '../../libs/utils';

const Post = (props) => {
	const pokemon = props.pokemon;
	const router = useRouter();
	const { product_id } = router.query;
	const idx = parseInt(product_id);

	const [currentIndex, setCurrentIndex] = useState(idx);
	const [loading, setLoading] = useState(true);

	function gotoPrevPage() {
		if (currentIndex > 1) {
			setCurrentIndex(idx - 1);
		}
	}

	function gotoNextPage() {
		setCurrentIndex(idx + 1);
	}

	useEffect(() => {
		setLoading(true);
		router.push(`/products/${currentIndex}`);
		setLoading(false);
	}, [currentIndex]);

	// console.log('Pokemon', pokemon);

	if (loading) return 'Loading';

	return (
		<>
			<Head>
				<title>{pokemon.name}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<PageHeader
				className="site-page-header"
				onBack={() => router.push('/products')}
				title={pokemon.name.toUpperCase()}
			/>

			<Card style={{ width: '100%' }}>
				<img src={pokemon.sprites.back_default} alt={pokemon.name} />
				<Divider />
				<div>
					<b>Abilities:</b>
					{pokemon.abilities.map(function (d, idx) {
						return <div key={idx}> {d.ability.name}</div>;
					})}
				</div>

				<div className="flex flex-row items-center justify-center pt-4 gap-4">
					{currentIndex !== 1 && (
						<Button onClick={gotoPrevPage} type="primary">
							Previous
						</Button>
					)}
					<Button onClick={gotoNextPage} type="primary">
						Next
					</Button>
				</div>
			</Card>
		</>
	);
};

export async function getStaticProps(context) {
	const product_id: string = context.params.product_id;
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${product_id}/`);
	const pokemon = await res.json();

	// console.log(pokemons);
	return {
		props: { pokemon }, // will be passed to the page component as props
	};
}

export async function getStaticPaths() {
	// product id between 0 and 100 ok
	// id > 100 => Error 404
	const result = range(1, 100);
	const paths = result.map((product) => {
		return {
			params: {
				product_id: `${product}`,
			},
		};
	});

	return { paths: paths, fallback: false };
}

export default Post;
