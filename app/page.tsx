"use client"
import { useActionState } from "react"
import { generateColdEmail, State } from "../action/action"
export default function Home() {
  const initialState: State = {
    message: "",
    errorMessage: "",
  }
  const [state, formAction, isPending] = useActionState(
    generateColdEmail,
    initialState,
  )
  return (
    <form action={formAction}>
      <input placeholder="SOme Text" name="message" />
      {state && <p>{state.message?.toString()}</p>}
      {isPending && <p>Loading....</p>}
      {state.errorMessage && <p>{state.errorMessage}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}
