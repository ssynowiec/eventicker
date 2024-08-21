'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { LocalSwitcher } from '@/components/LocalSwitcher';

export const DashboardTopBar = () => {
	const { theme, setTheme } = useTheme();

	const changeTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<div className="flex items-center justify-between border-b-2 border-b-muted px-6 py-3">
			<div className="gap -4 flex"></div>
			<LocalSwitcher />
			<Button variant="outline" size="icon" onClick={changeTheme}>
				{theme === 'dark' ? <Sun /> : <Moon />}
				<span className="sr-only">
					Change theme to {theme === 'dark' ? 'light' : 'dark'}
				</span>
			</Button>
		</div>
	);
};
