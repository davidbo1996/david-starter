import { Button, Layout, Result } from 'antd';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Custom404: NextPageWithLayout = () => {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button type="primary" href="/">
					Back Home
				</Button>
			}
		/>
	);
};

Custom404.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Custom404;
