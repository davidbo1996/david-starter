import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout, PageHeader } from 'antd';
import 'antd/dist/antd.css';
import LayoutDefault from '../components/LayoutDefault';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
const { Content } = Layout;

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page);
	return getLayout(
		<LayoutDefault>
			<Content className="site-layout" style={{ padding: '0 100px', marginTop: 80 }}>
				<Component {...pageProps} />
			</Content>
		</LayoutDefault>
	);
}

export default MyApp;
