'use client';

import { createStripeAccountAction } from '@/actions/createStripeAccountAction';
import { Button } from '@/components/ui/button';
import { FaStripeS } from 'react-icons/fa6';
import { completeStripeAccountAction } from '@/actions/completeStripeAccountAction';
import { useMutation } from '@tanstack/react-query';
import { User } from 'lucia';

interface StripeConnectButtonProps {
	user: User;
}

export const StripeConnectButton = ({ user }: StripeConnectButtonProps) => {
	if (!user) {
		return null;
	}

	const connectedAccountId = user.stripe_account_id ?? '';

	const {
		mutate: createStripeAccount,
		isPending: createStripeAccountIsPending,
		isError: createStripeAccountIsError,
	} = useMutation({
		mutationFn: createStripeAccountAction,
	});

	const {
		mutate: completeStripeAccount,
		isPending: completeStripeAccountIsPending,
		isError: completeStripeAccountIsError,
	} = useMutation({
		mutationFn: async () => {
			const data = await completeStripeAccountAction({
				account: connectedAccountId,
			});
			return data?.data.url;
		},
		onSuccess: (data) => {
			if (data) {
				window.location.href = data;
			}
		},
	});

	return (
		<div className="flex flex-col gap-2 py-4">
			<h2 className="text-xl font-medium">Stripe connection</h2>
			<div className="flex w-1/3 flex-col gap-2">
				{!createStripeAccountIsPending && !connectedAccountId && (
					<Button
						className="flex items-center justify-center gap-2 rounded-lg bg-[#635BFF] px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-[#8983FF]"
						onClick={() => {
							createStripeAccount();
						}}
					>
						<FaStripeS />
						Connect with Stripe
					</Button>
				)}
				{connectedAccountId && !completeStripeAccountIsPending && (
					<Button
						className="flex items-center justify-center gap-2 rounded-lg bg-[#635BFF] px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-[#8983FF]"
						onClick={() => {
							completeStripeAccount();
						}}
					>
						<FaStripeS />
						Complete setup
					</Button>
				)}
				{createStripeAccountIsError ||
					(completeStripeAccountIsError && (
						<p className="text-red-500">Something went wrong!</p>
					))}
				{(connectedAccountId ||
					createStripeAccountIsPending ||
					completeStripeAccountIsPending) && (
					<div>
						{connectedAccountId && (
							<p>
								Your connected account ID is:{' '}
								<code className="font-bold">{connectedAccountId}</code>
							</p>
						)}
						{createStripeAccountIsPending && (
							<p>Creating a connected account...</p>
						)}
						{completeStripeAccountIsPending && (
							<p>Creating a new Account Link...</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
