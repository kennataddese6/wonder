"use server"
import { db } from "@/src"
import { usersTable } from "@/src/db/schema"
import "dotenv/config"
import { eq } from "drizzle-orm"
import { State } from "./action"

export async function createUser(prevState: State, formData: FormData) {
  const user: typeof usersTable.$inferInsert = {
    name: "Kenna",
    email: "kennataddese6@gmail.com",
    password: "Whereareyou",
  }

  await db.insert(usersTable).values(user)
  return { message: "User Created", errorMessage: "" }
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */
}

export async function updateUser() {
  await db
    .update(usersTable)
    .set({
      password: "Whereareyou",
    })
    .where(eq(usersTable.email, "kennataddese6@gmail.com"))
}

export async function getUsers() {
  const users = await db.select().from(usersTable)
  return users
}

export async function deleteUser() {
  await db
    .delete(usersTable)
    .where(eq(usersTable.email, "kennataddese6@gmail.com"))
}
