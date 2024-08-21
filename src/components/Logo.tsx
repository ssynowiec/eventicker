import Image from 'next/image';

export const Logo = () => {
	return (
		<Image
			src="/draft-logo.png"
			alt="company logo"
			width={100}
			height={100}
			className="h-6 w-6"
		/>
	);
};
