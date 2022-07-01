import { Layout, PageHeader } from 'antd';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Index</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<PageHeader
				className="site-page-header"
				onBack={() => null}
				title="Title"
				subTitle="This is a subtitle"
			/>
		</>
	);
}
