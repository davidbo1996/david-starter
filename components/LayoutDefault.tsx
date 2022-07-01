import { Layout } from 'antd';
import React from 'react';

import HeaderDefault from './HeaderDefault';
const { Header, Sider } = Layout;

const LayoutDefault = ({ children }) => {
	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}
		>
			<HeaderDefault />
			<Layout className="site-layout">
				<Header className="site-layout-background flex justify-end items-end">
					@David BO
				</Header>
				<main>
					<section style={{ width: '100%', height: '80vh' }}>{children}</section>
				</main>
			</Layout>
		</Layout>
	);
};

export default LayoutDefault;
