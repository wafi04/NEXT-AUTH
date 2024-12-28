import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(6, { message: "username min length 6 characters" })
    .regex(/^[a-zA-Z0-9\s]*$/, {
      message: "Name can only contain letters, numbers and spaces",
    }),

  email: z.string().email({ message: "Email is Required" }),

  password: z
    .string()
    .min(8, { message: "password min length 8 characters" })
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
      message: "Password contains invalid characters",
    }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is Required" }),

  password: z
    .string()
    .min(8, { message: "password min length 8 characters" })
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
      message: "Password contains invalid characters",
    }),
});

export type RegisterSchemaData = z.infer<typeof RegisterSchema>;
export type LoginSchemaData = z.infer<typeof LoginSchema>;
