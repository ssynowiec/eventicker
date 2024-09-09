import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode } from 'react';
import { buttonVariants } from '@/components/ui/button';

interface StatusItemProps {
	status: 'TODO' | 'IN_PROGRESS' | 'DONE';
	icon: ReactNode;
	title: string;
	description?: string;
	link?: string;
}

export const StatusItem = ({
	status,
	title,
	description,
	icon,
	link,
}: StatusItemProps) => {
	const Tag = link ? Link : 'div';

	return (
		<Tag
			href={link ? link : ''}
			className={cn(
				buttonVariants({
					variant: 'ghost',
					className: 'flex items-center gap-2 p-8',
				}),
			)}
		>
			<div
				className={cn(
					'rounded-full bg-primary p-2 text-primary-foreground',
					status === 'DONE' && 'bg-green-500',
				)}
			>
				{icon}
			</div>
			<div>
				<div className="font-medium">{title}</div>
				{description && (
					<div className="text-xs text-muted-foreground">{description}</div>
				)}
			</div>
		</Tag>
	);
};
