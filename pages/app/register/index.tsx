import { Button, message, Steps, Layout } from 'antd';
import { useState } from 'react';
import Head from 'next/head';
import FormLayout from '../../../components/FormLayout';

const { Step } = Steps;
const { Content } = Layout;
const steps = [
	{
		title: 'First',
		content: <FormLayout />,
	},
	{
		title: 'Second',
		content: <FormLayout />,
	},
	{
		title: 'Last',
		content: 'Last-content',
	},
];

const App = () => {
	const [current, setCurrent] = useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	return (
		<>
			<Head>
				<title>Register</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Steps current={current}>
				{steps.map((item) => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>
			<div className="steps-content">{steps[current].content}</div>
			<div className="steps-action">
				{current < steps.length - 1 && (
					<Button type="primary" onClick={() => next()}>
						Next
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type="primary" onClick={() => message.success('Processing complete!')}>
						Done
					</Button>
				)}
				{current > 0 && (
					<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
						Previous
					</Button>
				)}
			</div>
		</>
	);
};

export default App;
