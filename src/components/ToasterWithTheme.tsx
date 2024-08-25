'use client';

import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';

export const ToasterWithTheme = () => {
	const { theme } = useTheme();

	const validatedTheme =
		theme === 'light' || theme === 'dark' || theme === 'system'
			? theme
			: undefined;

	return <Toaster theme={validatedTheme} />;
};
