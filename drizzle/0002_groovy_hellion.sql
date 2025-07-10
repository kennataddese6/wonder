ALTER TABLE "leads" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;