import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { env } from '@/env';
import { sessionTable } from '@/schema/session';
import { userTable } from '@/schema/user';

const pool = new Pool({ connectionString: env.DATABASE_URL });
export const db = drizzle(pool);

export const adapter = new DrizzlePostgreSQLAdapter(
	db,
	sessionTable,
	userTable,
);
