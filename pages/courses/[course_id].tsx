import { Breadcrumb, Card, Space } from 'antd';
import { useRouter } from 'next/router';

function Course(props) {
	const router = useRouter();
	const { course_id } = router.query;
	const courses = props.courses;
	console.log('Course_id', course_id);
	console.log('Courses', courses);
	const course = courses.Items.find((e) => e.course_id === course_id);
	console.log('Course', course);

	const requirements = course.requirements.split(',');
	const learns = course.learn_items.split(',');

	console.log(learns);
	// console.log(requirements);

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
					<p className="font-light text-sm">{course.description}</p>
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
