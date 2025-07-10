import { leadsTable } from "@/src/db/schema"
import { drizzle } from "drizzle-orm/node-postgres"
const db = drizzle(process.env.DATABASE_URL!)

export async function insertLead(lead: typeof leadsTable.$inferInsert) {
  await db.insert(leadsTable).values(lead)
}
