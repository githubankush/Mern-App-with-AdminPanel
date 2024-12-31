const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must be at most 255 characters" }),

    email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .email({ message: "Invalid Email" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must be at most 255 characters" }),

  password: z
    .string({ required_error: "Password is Required" })
    .trim()
    .min(3, { message: "Password must be at least 3 characters" })
    .max(255, { message: "Password must be at most 255 characters" }),

  phone: z
    .string({ required_error: "Phone is Required" })
    .trim()
    .min(5, { message: "Phone must be at least 5 characters" })
    .max(255, { message: "Phone must be at most 255 characters" }),
});

module.exports = signupSchema;
