import { PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Alert, Button, Card } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Jobs = (props) => {
	const jobs = props.jobs.Items;
	console.log(jobs);

	const myCourse = props.courses.Items;
	const router = useRouter();
	const [visible, setVisible] = useState(false);

	console.log(myCourse);

	const handleClose = () => {
		setVisible(false);
	};
	console.log(jobs);
	return (
		<>
			<Head>
				<title>Jobs</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			{visible ? (
				<Alert
					message="You add this course"
					type="success"
					closable
					afterClose={handleClose}
				/>
			) : null}
			<div className="flex flex-col gap-2 items-center">
				{jobs.map((job, idx) => {
					return (
						<Card key={idx} style={{ width: 450 }}>
							<h1 key={idx}>{job.title}</h1>
							<p className="font-light text-xs"> {job.description}</p>
							<p className="font-light text-xs">
								<div className="font-semibold">Requirement:</div>
								<Button
									onClick={() => router.push(`/courses/${job.course_required}`)}
								>
									Lesson 1
								</Button>
							</p>
							<div className="flex flex-row justify-end">
								<Button type="primary" onClick={() => ''}>
									Apply for this job
								</Button>
							</div>
						</Card>
					);
				})}
			</div>
		</>
	);
};

export async function getServerSideProps(context) {
	const api = await fetch('https://pn3cs9mkb1.execute-api.eu-west-1.amazonaws.com/jobs');
	const res = await api.json();

	const myCourse = await fetch(
		'https://pn3cs9mkb1.execute-api.eu-west-1.amazonaws.com/user/user_1/course'
	);
	const myCourseResp = await myCourse.json();
	return {
		props: { jobs: res, courses: myCourseResp }, // will be passed to the page component as props
	};
}

export default Jobs;
