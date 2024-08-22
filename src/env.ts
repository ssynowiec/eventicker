import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),
		DATABASE_URL: z.string(),
		DATABASE_URL_UNPOOLED: z.string(),
		API_URL: z.string(),
	},
	client: {},
	experimental__runtimeEnv: {},
});
