import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import Link from 'next/link';

const Signin = () => {
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	};

	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
		>
			<Form.Item
				name="username"
				rules={[
					{
						required: true,
						message: 'Please input your Username!',
					},
				]}
			>
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="Username"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your Password!',
					},
				]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Link className="login-form-forgot" href="">
					Forgot password
				</Link>
			</Form.Item>

			<Form.Item>
				<Space>
					<Button type="primary" htmlType="submit" className="login-form-button">
						Log in
					</Button>
					Or <Link href="/app/register">register now!</Link>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default Signin;
