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
			label: <div onClick={() => router.push('/')}>Accueil</div>,
			key: 'mail',
			icon: <MailOutlined />,
		},
		{
			label: <div onClick={() => router.push('/app/signin')}>Connexion</div>,
			key: 'app',
			icon: <AppstoreOutlined onClick={() => router.push('/app/signin')} />,
		},
		{
			label: 'Profil',
			key: 'SubMenu',
			icon: <SettingOutlined />,
			children: [
				{
					type: 'group',
					label: 'Item 1',
					children: [
						{
							label: (
								<div onClick={() => router.push('/app/register')}>Enregistrer</div>
							),

							key: 'setting:1',
						},
						{
							label: 'Option 2',
							key: 'setting:2',
						},
					],
				},
				{
					type: 'group',
					label: 'Item 2',
					children: [
						{
							label: 'Option 3',
							key: 'setting:3',
						},
						{
							label: 'Option 4',
							key: 'setting:4',
						},
					],
				},
			],
		},
	];

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};

	return (
		<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
			<Menu>
				<Menu
					onClick={onClick}
					theme="dark"
					selectedKeys={[current]}
					mode="inline"
					items={items}
				/>
			</Menu>
		</Sider>
	);
};

export default HeaderDefault;
