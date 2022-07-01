import {
	AppstoreOutlined,
	FileOutlined,
	HomeFilled,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PauseCircleFilled,
	SettingOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import router, { useRouter } from 'next/router';

import React from 'react';
import { useState } from 'react';
const { Header, Sider } = Layout;

export let collapsed: boolean;

const HeaderDefault = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [current, setCurrent] = useState('mail');

	const items: MenuProps['items'] = [
		{
			label: <div onClick={() => router.push('/')}>Home</div>,
			key: 'home',
			icon: <MailOutlined />,
		},
		{
			label: <div onClick={() => router.push('/app/signin')}>Signin</div>,
			key: 'signin',
			icon: <AppstoreOutlined />,
		},
		{
			label: <div onClick={() => router.push('/app/profil')}>Profil</div>,
			key: 'profil',
			icon: <SettingOutlined />,
		},
		{
			label: <div onClick={() => router.push('/app/register')}>Sign up</div>,
			key: 'register',
			icon: <AppstoreOutlined />,
		},

		{
			label: <div onClick={() => router.push('/app/admin')}>Admin</div>,
			key: 'admin',
			icon: <AppstoreOutlined />,
		},
	];

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};

	return (
		<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
			<Menu
				onClick={onClick}
				theme="dark"
				selectedKeys={[current]}
				mode="inline"
				items={items}
			/>
		</Sider>
	);
};

export default HeaderDefault;
