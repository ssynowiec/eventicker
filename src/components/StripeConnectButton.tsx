'use client';

import { createStripeAccountAction } from '@/actions/createStripeAccountAction';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FaStripeS } from 'react-icons/fa6';
import { completeStripeAccountAction } from '@/actions/completeStripeAccountAction';

export const StripeConnectButton = () => {
	const [accountCreatePending, setAccountCreatePending] = useState(false);
	const [accountLinkCreatePending, setAccountLinkCreatePending] =
		useState(false);
	const [error, setError] = useState(false);
	const [connectedAccountId, setConnectedAccountId] = useState(
		'acct_1PxPAEQZJJOxibZm',
	);

	return (
		<div className="container">
			<div className="content">
				{!accountCreatePending && !connectedAccountId && (
					<Button
						className="flex items-center justify-center gap-2 rounded-lg bg-[#635BFF] px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-[#8983FF]"
						onClick={async () => {
							setAccountCreatePending(true);
							setError(false);
							const json = await createStripeAccountAction();

							const { account, error } = json?.data;

							if (account) {
								console.log('stripe account', account);
								setConnectedAccountId(account);
							}

							if (error) {
								setError(true);
							}
							setAccountCreatePending(false);
						}}
					>
						<FaStripeS />
						Connect with Stripe
					</Button>
				)}
				{connectedAccountId && !accountLinkCreatePending && (
					<Button
						onClick={async () => {
							setAccountLinkCreatePending(true);
							setError(false);
							const json = await completeStripeAccountAction({
								account: connectedAccountId,
							});

							const { url, error } = json?.data;
							console.log('url', url);
							if (url) {
								window.location.href = url;
							}

							if (error) {
								setError(true);
							}

							setAccountLinkCreatePending(false);
						}}
					>
						Add information
					</Button>
				)}
				{error && <p className="error">Something went wrong!</p>}
				{(connectedAccountId ||
					accountCreatePending ||
					accountLinkCreatePending) && (
					<div className="dev-callout">
						{connectedAccountId && (
							<p>
								Your connected account ID is:{' '}
								<code className="bold">{connectedAccountId}</code>
							</p>
						)}
						{accountCreatePending && <p>Creating a connected account...</p>}
						{accountLinkCreatePending && <p>Creating a new Account Link...</p>}
					</div>
				)}
			</div>
		</div>
	);
};
