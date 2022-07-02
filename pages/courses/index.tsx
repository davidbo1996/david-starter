import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import PokemonList from '../../components/PokemonList';
import Head from 'next/head';
import { Footer } from 'antd/lib/layout/layout';
import { Card, Checkbox, Rate } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Image from 'next/image';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const Products = (props) => {
	const courses = props.courses.Items;
	console.log(courses);
	const [value, setValue] = useState(3);
	const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

	return (
		<>
			<Head>
				<title>Courses</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="flex flex-col gap-2 items-end">
				{courses.map((e, idx) => {
					return (
						<Card
							key={idx}
							style={{ width: 450 }}
							actions={[<EllipsisOutlined key="ellipsis" />]}
						>
							<h1>{e.title}</h1>
							<div className="font-light text-xs">{e.description}</div>
							<div className="font-light text-xs">
								<span>
									<Rate tooltips={desc} onChange={setValue} value={e.rating} />
									{value ? (
										<span className="ant-rate-text">{desc[value - 1]}</span>
									) : (
										''
									)}
								</span>
								{e.rating}
							</div>
							<div className="flex flex-row text-xs font-extralight">
								{e.hours} total hours - {e.instructor_student_count} lectures
							</div>
						</Card>
					);
				})}
			</div>
		</>
	);
};

export async function getServerSideProps(context) {
	const api = await fetch('https://pn3cs9mkb1.execute-api.eu-west-1.amazonaws.com/course');

	const res = await api.json();

	return {
		props: { courses: res }, // will be passed to the page component as props
	};
}

export default Products;
