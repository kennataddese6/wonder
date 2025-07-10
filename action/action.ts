"use server"
import { leadsTable } from "@/src/db/schema"
import { insertLead } from "@/utils/db-actions"
import handleCreateLeadError from "@/utils/error-handlers"
import { validateLead } from "@/utils/validations"
import { CohereClientV2 } from "cohere-ai"
import { desc } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export interface State {
  message: string
  errorMessage: string
}
const db = drizzle(process.env.DATABASE_URL!)

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
  console.log("Here I am ")
  // await new Promise((resolve) => setTimeout(resolve, 3000))
  return { message: "Successfully Created", errorMessage: "" }
}

export const createLead = async (prevState: State, formData: FormData) => {
  await headers()
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
  await headers()
  const leads = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt))
  return leads
}

export const getLead = async () => {}
export const updateLead = async () => {}
export const deleteLead = async () => {}
