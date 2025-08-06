"use server"
import { db } from "@/src"
import { leadsTable } from "@/src/db/schema"
import { insertLead } from "@/utils/db-actions"
import handleCreateLeadError from "@/utils/error-handlers"
import { validateLead } from "@/utils/validations"
import { CohereClientV2 } from "cohere-ai"
import { desc, eq, inArray, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export interface State {
  message: string
  errorMessage: string
}

export const generateColdEmail = async (
  prevState: State,
  formData: FormData,
) => {
  try {
    const client = new CohereClientV2({
      token: process.env.AI_API,
    })

    const response = await client.chat({
      model: "command-r-plus",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: formData.get("message") as string,
        },
      ],
    })
    if (!response || !response.message || !response.message.content)
      return { message: "No content", errorMessage: "" }
    return {
      message: response.message.content[0].text,
      errorMessage: "",
    }
  } catch (error) {
    return { message: "", errorMessage: "something went wrong" }
  }
}

export const login = async (prevState: State, formData: FormData) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000))
  return { message: "Successfully Created", errorMessage: "" }
}

export const createLead = async (prevState: State, formData: FormData) => {
  try {
    const lead = validateLead(formData)
    await insertLead(lead)
    revalidatePath("/ma/leads")
    return { message: "Successfully Created", errorMessage: "" }
  } catch (error: any) {
    return handleCreateLeadError(error)
  }
}

export const getLeads = async (status?: string) => {
  let query = db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt))

  if (status) {
    query = query.where(eq(leadsTable.status, status))
  }

  const leads = await query
  return leads
}

export const deleteLeads = async (leadIds: number[]) => {
  try {
    if (leadIds.length === 0) {
      return { message: "", errorMessage: "No leads selected" }
    }

    await db
      .update(leadsTable)
      .set({
        status: "Deleted",
        updatedAt: new Date(),
      })
      .where(inArray(leadsTable.id, leadIds))

    revalidatePath("/ma/leads")
    return {
      message: `Successfully deleted ${leadIds.length} lead(s)`,
      errorMessage: "",
    }
  } catch (error: any) {
    return { message: "", errorMessage: "Failed to delete leads" }
  }
}

export const getLead = async () => {}
export const updateLead = async () => {}
export const deleteLead = async () => {}

export const getLeadStats = async () => {
  try {
    // Get total count
    const totalResult = await db
      .select({ count: sql`count(*)` })
      .from(leadsTable)

    // Get count by status
    const statusCounts = await db
      .select({
        status: leadsTable.status,
        count: sql`count(*)`,
      })
      .from(leadsTable)
      .groupBy(leadsTable.status)

    const total = totalResult[0]?.count || 0
    const statusStats = statusCounts.reduce((acc, item) => {
      acc[item.status] = Number(item.count)
      return acc
    }, {} as Record<string, number>)

    return {
      total,
      statusStats,
    }
  } catch (error) {
    console.error("Error fetching lead stats:", error)
    return {
      total: 0,
      statusStats: {},
    }
  }
}
