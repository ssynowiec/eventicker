import { LocalSwitcher } from '@/components/LocalSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export const DashboardTopBar = () => {
	return (
		<div className="flex items-center justify-between border-b-2 border-b-muted px-6 py-3">
			<div className="gap -4 flex"></div>
			<LocalSwitcher />
			<ThemeSwitcher />
		</div>
	);
};
