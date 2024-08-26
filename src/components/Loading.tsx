export const Loading = () => {
	return (
		<div className="flex w-full flex-1 flex-col items-center justify-center gap-1">
			<div className="h-12 w-12 animate-spin rounded-full border-[5px] border-gray-300 border-t-black dark:border-gray-700 dark:border-t-white" />
			<p>Loading...</p>
		</div>
	);
};
