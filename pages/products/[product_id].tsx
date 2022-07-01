import { Button, Card, Col, Divider, PageHeader, Row, Space } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { range } from '../../libs/utils';

const Post = (props) => {
	const pokemon = props.pokemon;
	const router = useRouter();
	const { product_id } = router.query;

	console.log('Pokemon', pokemon);

	return (
		<>
			<Head>
				<title>{pokemon.name}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<PageHeader
				className="site-page-header"
				onBack={() => router.push('/')}
				title={pokemon.name.toUpperCase()}
			/>

			<Card style={{ width: '100%' }}>
				<img src={pokemon.sprites.back_default} alt={pokemon.name} />
				<Divider />
				<p>
					<b>Abilities:</b>
					{pokemon.abilities.map(function (d, idx) {
						return <div key={idx}> {d.ability.name}</div>;
					})}
				</p>
			</Card>
			<div className="flex flex-row items-center justify-center pt-4 gap-4">
				<Button type="primary">Previous</Button>
				<Button type="primary">Next</Button>
			</div>
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
	const result = range(0, 100);
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
