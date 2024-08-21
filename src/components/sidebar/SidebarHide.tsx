import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import type { SetStateAction } from 'react';

interface SidebarHideProps {
	isCollapsed: boolean;
	setIsCollapsed: (action: SetStateAction<boolean>) => void;
}

export const SidebarHide = ({
	isCollapsed,
	setIsCollapsed,
}: SidebarHideProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<Button
					onClick={() => setIsCollapsed((prev) => !prev)}
					variant="ghost"
					className="gap-2 rounded-none"
				>
					{isCollapsed ? (
						<>
							<TooltipTrigger>
								<ChevronsRight />
							</TooltipTrigger>
							<TooltipContent side="right">
								<p>Show sidebar</p>
							</TooltipContent>
						</>
					) : (
						<>
							<ChevronsLeft />
							<span>Hide sidebar</span>
						</>
					)}
				</Button>
			</Tooltip>
		</TooltipProvider>
	);
};
