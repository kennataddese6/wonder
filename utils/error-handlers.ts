import * as z from "zod/v4"

export default function handleCreateLeadError(error: any) {
  if (error instanceof z.ZodError) {
    return { message: "", errorMessage: error.issues[0].message }
  }
  if (error?.cause?.code === "23505") {
    return { message: "", errorMessage: "Email already exists" }
  }
  return { message: "", errorMessage: "Something went wrong" }
}
