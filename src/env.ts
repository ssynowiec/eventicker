import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),
		DATABASE_URL: z.string(),
		DATABASE_URL_UNPOOLED: z.string(),
		API_URL: z.string(),
		CLOUDINARY_API_KEY: z.string(),
		CLOUDINARY_API_SECRET: z.string(),
		RESEND_API_KEY: z.string(),
		STRIPE_SECRET_KEY: z.string(),
		STRIPE_PUBLIC_KEY: z.string(),
	},
	client: {
		NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
		NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
			process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
		NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	},
});
