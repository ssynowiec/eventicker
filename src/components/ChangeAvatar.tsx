import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';

export const ChangeAvatar = async () => {
	const { user } = await validateRequest();

	if (!user) {
		return redirect('/login');
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between">
				<Avatar className="h-28 w-28">
					<div className="relative w-28 text-center">
						<AvatarImage src={user.avatar} className="absolute" />
						<AvatarFallback className="absolute">{user.name}</AvatarFallback>
						{/*<div className="group absolute flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-full text-center opacity-60 transition duration-100 hover:bg-gray-200">*/}
						{/*	<Upload className="hidden w-12 group-hover:block" />*/}
						{/*	<span className="hidden w-12 group-hover:block">Change</span>*/}
						{/*</div>*/}
					</div>
				</Avatar>
			</div>
		</div>
	);
};
