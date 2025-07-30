CREATE TYPE "public"."status" AS ENUM('new', 'sent', 'followed_up', 'failed', 'deleted', 'converted');--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "status" "status" DEFAULT 'new';