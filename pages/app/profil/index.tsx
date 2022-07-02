import { AntDesignOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';
import { useRouter } from 'next/router';
function ProfileUser(props) {
	const coursesUser = props.courses.Items;
	const experienceUser = props.experiences.Items;
	const router = useRouter();

	const courses = JSON.parse(experienceUser[0].courses);
	console.log('course', courses);
	console.log(experienceUser);
	console.log(coursesUser);
	return (
		<>
			<div className="flex flex-col justify-center items-center gap-4">
				<h1 className="flex flex-row items-center justify-center text-2xl">Profil</h1>
				<div className="flex flex-row gap-2">
					<Card style={{ width: 350 }}>
						<div className="flex flex-col gap-2 justify-center items-center text-2xl">
							Profil
							<Avatar size={40}>D</Avatar>
							<div className="text-sm font-light">David BO</div>
						</div>
					</Card>
					<Card style={{ width: 350 }}>
						<div className="flex flex-col gap-6 justify-center items-center text-2xl">
							Certification
							<Button onClick={() => router.push('/')} type="primary">
								Show me
							</Button>
						</div>
					</Card>
				</div>
				<h1 className="flex flex-row items-center justify-center text-2xl">My course</h1>
				<div className="flex flex-row gap-4">
					{coursesUser.map((e, idx) => {
						return (
							<Card
								key={idx}
								style={{ width: 350, border: 10 }}
								actions={[
									<div
										key={idx}
										onClick={() => router.push(`/courses/${e.course_id}`)}
									>
										<SettingOutlined key="setting" />
									</div>,
								]}
							>
								<h1 key={idx}>{e.title}</h1>
								<div className="font-light text-xs">{e.description}</div>
								{/* <div className="flex flex-row text-xs font-extralight">
									{e.hours} total hours - {e.instructor_student_count} lectures
								</div> */}
							</Card>
						);
					})}
				</div>
				<h1 className="flex flex-row items-center justify-center text-2xl">
					My experience
				</h1>
				{experienceUser.map((e, idx) => {
					return (
						<Card
							key={idx}
							style={{ width: 350, border: 10 }}
							actions={[
								<div
									key={idx}
									onClick={() => router.push(`/courses/${e.course_id}`)}
								>
									<EllipsisOutlined key="ellipsis" />
								</div>,
							]}
						>
							<h1 key={idx}>{e.title}</h1>
							<div className="font-light text-xs">
								<b>Description:</b> {e.description}
							</div>
							<div className="flex flex-row text-xs font-extralight">
								<b>Date Start:</b> &nbsp;&nbsp;{e.date_start}
							</div>
							<div className="flex flex-row text-xs font-extralight">
								<b>Date End:</b> &nbsp;&nbsp;{e.date_end}
							</div>
							<div className="flex flex-col text-xs font-extralight">
								<b>Required course:</b>{' '}
								{courses.map((course) => {
									return <div> {course.title} </div>;
								})}
							</div>
						</Card>
					);
				})}
			</div>
		</>
	);
}
export async function getServerSideProps(context) {
	const api = await fetch(
		'https://pn3cs9mkb1.execute-api.eu-west-1.amazonaws.com/user/user_1/course'
	);
	const res = await api.json();
	const xpApi = await fetch(
		'https://pn3cs9mkb1.execute-api.eu-west-1.amazonaws.com/user/user_1/experience'
	);
	const xpRes = await xpApi.json();
	return {
		props: { courses: res, experiences: xpRes }, // will be passed to the page component as props
	};
}
export default ProfileUser;
