'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

export const Logo = () => {
	const { theme } = useTheme();

	const logoColor = theme === 'dark' ? 'light' : 'dark';
	console.log(theme);

	return (
		<Image
			src={`/draft-logo-${logoColor}.png`}
			alt="company logo"
			width={100}
			height={100}
			className="h-6 w-6"
		/>
	);
};
