import { Breadcrumb, Card, Collapse, Rate, Space } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const { Panel } = Collapse;

function Course(props) {
	const router = useRouter();
	const { course_id } = router.query;
	const courses = props.courses;
	// console.log('Course_id', course_id);
	// console.log('Courses', courses);
	const course = courses.Items.find((e) => e.course_id === course_id);
	// console.log('Course', course);

	const requirements = course.requirements.split(',');
	const learns = course.learn_items.split(',');

	// console.log(learns);
	const [value, setValue] = useState(3);
	const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

	const onChange = (key: string | string[]) => {
		console.log(key);
	};

	const contents = JSON.parse(course.course_items);

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>
					<a href="/courses">Courses</a>
				</Breadcrumb.Item>
				<Breadcrumb.Item>{course.title}</Breadcrumb.Item>
			</Breadcrumb>
			<div className="pt-4 flex flex-col justify-center items-center gap-4">
				<Card style={{ width: 700 }}>
					<p className="font-bold text-xl">{course.title}</p>
					<p className="font-light text-xs">{course.description}</p>
					<p className="font-light text-xs">
						<span>
							<Rate tooltips={desc} onChange={setValue} value={course.rating} />
							{value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
						</span>
						{course.rating}
					</p>
					<p className="flex flex-row text-xs font-extralight">
						{course.hours} total hours - {course.instructor_student_count} lectures
					</p>
				</Card>
				<div className="flex flex-row gap-2 ">
					<Card style={{ width: 350 }}>
						<p className="font-bold text-lg">What you'll learn ?</p>
						{learns.map((requirement, index) => {
							return (
								<ul className="font-light text-xs" key={index}>
									{requirement}
								</ul>
							);
						})}
					</Card>
					<Card style={{ width: 350 }}>
						<p className="font-bold text-lg">Requirement:</p>
						<li>
							{requirements.map((requirement, index) => {
								return (
									<ul className="font-light text-xs" key={index}>
										{requirement}
									</ul>
								);
							})}
						</li>
					</Card>
				</div>
				<Card style={{ width: 700, margin: 20 }}>
					<Collapse defaultActiveKey={['1']} onChange={onChange}>
						{contents.map((content, idx) => {
							return (
								<>
									<Panel header={content.title} key={idx}>
										{content.content.map((e) => {
											return (
												<div className="grid grid-cols-2 gap-1  text-xs">
													<p className="flex flex-row justify-start items-start font-light">
														{e.title}
													</p>
													<p className="flex flex-row justify-end items-end font-semibold">
														{e.time}
													</p>
												</div>
											);
										})}
									</Panel>
								</>
							);
						})}
					</Collapse>
				</Card>
			</div>
		</>
	);
}

export async function getStaticProps(context) {
	const course_id: string = context.params.course_id;
	const api = await fetch('https://pn3cs9mkb1.execute-api.eu-west-1.amazonaws.com/course');
	const res = await api.json();

	console.log(res);
	return {
		props: { courses: res }, // will be passed to the page component as props
	};
}

export async function getStaticPaths() {
	const api = await fetch('https://pn3cs9mkb1.execute-api.eu-west-1.amazonaws.com/course');

	const res = await api.json();
	console.log(res);
	const paths = res.Items.map((e) => {
		return {
			params: {
				course_id: `${e.course_id}`,
			},
		};
	});

	return { paths: paths, fallback: false };
}

export default Course;
