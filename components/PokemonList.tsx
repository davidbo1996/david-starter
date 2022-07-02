import { Card } from 'antd';
import { capitalizeFirstLetter } from '../libs/utils';

const PokemonList = ({ pokemon }) => {
	// console.log(pokemon);
	return (
		<>
			<div className="grid grid-cols-3 grid-rows-4 gap-2">
				{pokemon.map((p, idx) => (
					<Card key={p}>
						<div className="text-sm flex justify-center items-center">
							{capitalizeFirstLetter(p)}
						</div>
						<div className="font-semibold text-xs flex justify-center ">
							<a href={`/courses/${idx + 1}`}>More</a>
						</div>
					</Card>
				))}
			</div>
		</>
	);
};

export default PokemonList;
