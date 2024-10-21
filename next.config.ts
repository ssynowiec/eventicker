import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/env');

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: '/eventicker/image/upload/**',
			},
		],
	},
	reactStrictMode: true,
	experimental: {
		reactCompiler: true,
		after: true,
	},
};

export default withNextIntl(nextConfig);
