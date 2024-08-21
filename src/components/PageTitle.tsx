import type { ReactNode } from 'react';

interface PageTitleProps {
	children: ReactNode;
}

export const PageTitle = ({ children }: PageTitleProps) => {
	return <h1 className="text-2xl font-bold">{children}</h1>;
};
