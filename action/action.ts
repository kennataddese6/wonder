"use server"
import { db } from "@/src"
import { leadsTable } from "@/src/db/schema"
import { insertLead } from "@/utils/db-actions"
import handleCreateLeadError from "@/utils/error-handlers"
import { validateLead } from "@/utils/validations"
import { CohereClientV2 } from "cohere-ai"
import { desc, inArray } from "drizzle-orm"
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

export const getLeads = async () => {
  const leads = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt))
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
