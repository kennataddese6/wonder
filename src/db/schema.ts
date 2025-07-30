import { integer, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
})

export const leadsStatusEnum = pgEnum("status", [
  "new",
  "sent",
  "followed_up",
  "failed",
  "deleted",
  "converted",
])

export const leadsTable = pgTable("leads", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }).notNull(),
  status: leadsStatusEnum("status").default("new"),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "date" }).defaultNow().notNull(),
})
