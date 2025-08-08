import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
})

export const leadsStatusEnum = pgEnum("status", [
  "New",
  "Sent",
  "Followed Up",
  "Failed",
  "Deleted",
  "Converted",
])

export const leadsTable = pgTable("leads", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }).notNull(),
  status: leadsStatusEnum("status").default("New"),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "date" }).defaultNow().notNull(),
})

export const cronStatusEnum = pgEnum("cron_status", ["running", "paused"])

export const cronTable = pgTable("cron", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  index: integer().default(0),
  cron_status: cronStatusEnum("cron_status").default("paused"),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "date" }).defaultNow().notNull(),
})
