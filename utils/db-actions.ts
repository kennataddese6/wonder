import { db } from "@/src"
import { leadsTable } from "@/src/db/schema"

export async function insertLead(lead: typeof leadsTable.$inferInsert) {
  await db.insert(leadsTable).values(lead)
}
