"use server"
import { usersTable } from "@/src/db/schema"
import "dotenv/config"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { State } from "./action"

const db = drizzle(process.env.DATABASE_URL!)

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
  console.log("User info updated!")
}

export async function getUsers() {
  const users = await db.select().from(usersTable)
  return users
}

export async function deleteUser() {
  await db
    .delete(usersTable)
    .where(eq(usersTable.email, "kennataddese6@gmail.com"))
  console.log("User deleted!")
}
