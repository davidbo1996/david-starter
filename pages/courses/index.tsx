import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Footer } from 'antd/lib/layout/layout';
import { Alert, Card, Checkbox, Rate } from 'antd';
import {
	EditOutlined,
	EllipsisOutlined,
	PlusCircleOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';

const Courses = (props) => {
	const router = useRouter();
	const courses = props.courses.Items;
	console.log(courses);
	const [value, setValue] = useState(3);
	const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
	const [visible, setVisible] = useState(false);

	function addCourse(e) {
		setVisible(true);
		axios
			.post('https://pn3cs9mkb1.execute-api.eu-west-1.amazonaws.com/user/course', {
				user_id: 'user_1',
				course_id: e.course_id,
			})
			.then((response) => {
				console.log(response);
			});

		setTimeout(() => {
			setVisible(false);
		}, 2000);
	}

	const handleClose = () => {
		setVisible(false);
	};

	return (
		<>
			<Head>
				<title>Courses</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="flex flex-col gap-2 items-center">
				{visible ? (
					<Alert
						message="You add this course"
						type="success"
						closable
						afterClose={handleClose}
					/>
				) : null}
				{courses.map((course, idx) => {
					return (
						<Card
							key={idx}
							style={{ width: 450 }}
							actions={[
								<div
									key={idx}
									onClick={() => router.push(`/courses/${course.course_id}`)}
								>
									<SettingOutlined key="setting" />
								</div>,
								<div
									key={idx}
									onClick={() => {
										addCourse(course);
									}}
								>
									<PlusCircleOutlined key={idx} />
								</div>,
							]}
						>
							<h1 key={idx}>{course.title}</h1>
							<div className="font-light text-xs">{course.description}</div>
							<div className="font-light text-xs">
								<span>
									<Rate
										tooltips={desc}
										onChange={setValue}
										value={course.rating}
									/>
									{value ? (
										<span className="ant-rate-text">{desc[value - 1]}</span>
									) : (
										''
									)}
								</span>
								{course.rating}
							</div>
							<div className="flex flex-row text-xs font-extralight">
								{course.hours} total hours - {course.instructor_student_count}{' '}
								lectures
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

export default Courses;
