import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useEffect } from 'react';

export const useSidebarIsCollapsed = () => {
	const [isCollapsed, setIsCollapsed] = useLocalStorage({
		key: 'collapsed-sidebar',
		initialValue: false,
	});

	useEffect(() => {
		const handleResize = () => {
			setIsCollapsed(window.innerWidth < 768 ? false : isCollapsed);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isCollapsed, setIsCollapsed]);

	return [isCollapsed, setIsCollapsed] as const;
};
