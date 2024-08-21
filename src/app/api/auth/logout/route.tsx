import { logout } from '@/lib/auth/signOut';

export const GET = async () => {
	return logout();
};
