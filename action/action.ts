"use server"
import { CohereClientV2 } from "cohere-ai"

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
  console.log("Here I am ")
  // await new Promise((resolve) => setTimeout(resolve, 3000))
  return { message: "Successfully Created", errorMessage: "" }
}
export const createLead = async (prevState: State, formData: FormData) => {
  console.log("Here I am ")
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return { message: "Successfully Created", errorMessage: "" }
}
export const getLeads = async () => {}
export const getLead = async () => {}
export const updateLead = async () => {}
export const deleteLead = async () => {}
