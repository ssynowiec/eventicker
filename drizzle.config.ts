import { defineConfig } from 'drizzle-kit';
import { env } from '@/env';

export default defineConfig({
	schema: './src/schema/*',
	dialect: 'postgresql',
	out: './drizzle',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
