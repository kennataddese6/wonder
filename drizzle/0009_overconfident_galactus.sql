CREATE TYPE "public"."cron_status" AS ENUM('running', 'paused');--> statement-breakpoint
ALTER TABLE "cron" ADD COLUMN "cron_status" "cron_status" DEFAULT 'paused';--> statement-breakpoint
ALTER TABLE "cron" DROP COLUMN "status";