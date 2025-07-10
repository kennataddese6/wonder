import { Lead } from "./validators"

export const validateLead = (formData: FormData) => {
  return Lead.parse({
    email: formData.get("email") ?? "",
    description: formData.get("description") ?? "",
  })
}
