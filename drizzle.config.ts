import { defineConfig } from 'drizzle-kit';
import { env } from '@/env';

export default defineConfig({
	schema: './src/lib/auth/schema/*',
	dialect: 'postgresql',
	out: './drizzle',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
