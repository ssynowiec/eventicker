import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		reactCompiler: true,
		ppr: 'incremental',
		after: true,
	},
};

export default withNextIntl(nextConfig);
