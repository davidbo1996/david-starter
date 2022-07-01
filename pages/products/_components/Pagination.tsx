import { Button } from 'antd';

function Pagination({ gotoNextPage, gotoPrevPage }) {
	return (
		<div className="flex flex-row justify-center gap-2">
			{gotoPrevPage && (
				<Button onClick={gotoPrevPage} type="primary">
					Previous
				</Button>
			)}
			{gotoNextPage && (
				<Button onClick={gotoNextPage} type="primary">
					Next
				</Button>
			)}
		</div>
	);
}

export default Pagination;
