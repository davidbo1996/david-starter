import {
	Button,
	Cascader,
	Checkbox,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Space,
	Switch,
	TreeSelect,
} from 'antd';
import { useState } from 'react';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const FormLayout = () => {
	return (
		<Form
			labelAlign="left"
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 14,
			}}
			layout="horizontal"
		>
			<Form.Item label="Radio">
				<Radio.Group>
					<Radio value="male"> Male </Radio>
					<Radio value="female"> Female </Radio>
					<Radio value="undefined"> Undefined </Radio>
				</Radio.Group>
			</Form.Item>
			<Form.Item label="Name">
				<Input />
			</Form.Item>
			<Form.Item label="Given name">
				<Input />
			</Form.Item>
			<Form.Item label="Reason ?">
				<Select>
					<Select.Option value="demo">Demo</Select.Option>
					<Select.Option value="demo">Nothing</Select.Option>
					<Select.Option value="demo">Because I am kind</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item label="Birthdate">
				<DatePicker />
			</Form.Item>
			<Form.Item label="InputNumber">
				<Space>
					<InputNumber />
					<Input />
				</Space>
			</Form.Item>
			<Form.Item label="TextArea">
				<TextArea rows={4} />
			</Form.Item>
			<Form.Item label="Switch" valuePropName="checked">
				<Switch />
			</Form.Item>
		</Form>
	);
};

export default FormLayout;
