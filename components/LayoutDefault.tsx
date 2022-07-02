import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout } from 'antd';
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
				<Header className="site-layout-background flex justify-end items-center gap-4">
					{/* <Button type="primary">Log in</Button>
					<Button>Sign up</Button> */}
					{/* <Avatar size="large" icon={<UserOutlined />} /> */}
					<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}></Avatar>
				</Header>
				<main>
					<section style={{ width: '100%', height: '80vh' }}>{children}</section>
				</main>
			</Layout>
		</Layout>
	);
};

export default LayoutDefault;
