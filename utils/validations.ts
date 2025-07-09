import { Lead } from "./validators"

export const validateLead = (formData: FormData) => {
  Lead.parse({
    email: formData.get("email") ?? "",
    description: formData.get("description") ?? "",
  })
}
