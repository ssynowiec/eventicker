CREATE TABLE IF NOT EXISTS "privacy_policies" (
	"event_id" integer PRIMARY KEY NOT NULL,
	"privacy_text" text,
	"last_updated" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "privacy_policies" ADD CONSTRAINT "privacy_policies_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
