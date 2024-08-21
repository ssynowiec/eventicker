'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

export const ThemeSwitcher = () => {
	const t = useTranslations('Theme');

	const { theme, setTheme } = useTheme();

	const changeTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};
	return (
		<Button variant="outline" size="icon" onClick={changeTheme}>
			{theme === 'dark' ? <Sun /> : <Moon />}
			<span className="sr-only">
				{`${t('change')} ${theme === 'dark' ? t('light') : t('dark')}`}
			</span>
		</Button>
	);
};
