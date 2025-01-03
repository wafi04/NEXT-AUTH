"use server";
import {
  LoginSchema,
  LoginSchemaData,
  RegisterSchema,
  RegisterSchemaData,
} from "@/validation/auth";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";
import { signOut } from "@/auth";
import { Role } from "@prisma/client";

export async function ActionRegister(values: RegisterSchemaData) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  let role : Role 
  email === "admin@admin.com"  ? role = "ADMIN"  : role = "USER"
  try {
    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    
    if (existingUser) {
      return { error: "Email already in use" };
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    await prisma.$queryRaw`
    INSERT INTO users (name, email, password, role) 
    VALUES (${name}, ${email}, ${hashedPassword}, ${role})
  `

    return { success: "User registered successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function ActionLogin(values: LoginSchemaData) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: result.error };
    }
    return { success: true };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials" };
        default:
          return { message: "Something Went Wrong." };
      }
    }
    return { error: "Unknown error occurred" };
  }
}

export const logout = async () => {
  // some server stuff
  await signOut();
};
