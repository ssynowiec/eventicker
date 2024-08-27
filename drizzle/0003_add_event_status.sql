DO $$ BEGIN
 CREATE TYPE "public"."event_status" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "status" "event_status" DEFAULT 'DRAFT' NOT NULL;