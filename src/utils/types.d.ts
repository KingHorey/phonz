import { z } from "zod";

export const searchParamsSchema = z.object({
  name: z.string(),
});

const variantsSchema = z.object({
  id: z.string().uuid(),
  color: z.array(z.object({ id: z.string().uuid(), color: z.string() })),
  capacity: z.number(),
  price: z.string(),
  quantity: z.number(),
});

// export const

export const productCardSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  link: z.string(),
  images: z.array(
    z.object({
      id: z.number(),
      image: z.string(),
      product: z.string().uuid(),
    })
  ),
  variants: z.array(variantsSchema),
});

export const brandSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  link: z.string(),
  image: z.string(),
  category: z.string().uuid(),
});

export const productInfoSchema = productCardSchema.extend({
  brand: brandSchema,
  cpu: z.string(),
  battery: z.number(),
  rear_camera: z.string(),
  front_camera: z.string(),
  cpu_cores: z.number(),
  screen_size: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = loginSchema.extend({
  first_name: z
    .string()
    .min(3, {
      message: "Please ensure first name is at least 3 characters long",
    })
    .max(15, {
      message: "Please ensure last name is at most 15 characters long",
    }),
  last_name: z
    .string()
    .min(3, {
      message: "Please ensure first name is at least 3 characters long",
    })
    .max(15, {
      message: "Please ensure last name is at most 15 characters long",
    }),
  password: z
    .string()
    .min(8, {
      message: "Please ensure password is at least 8 characters long",
    })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{}|;:,.<>?~\\/-]).{8,}$/,
      {
        message:
          "Please ensure password contains at least one special character, a number, and a capital letter",
      }
    ),
});

export const cartItemPayload = z.object({
  name: z.string(),
  price: z.number(),
  color: z.string(),
  quantity: z.number(),
  capacity: z.number(),
  image: z.string(),
  variant_id: z.string().uuid(),
  product_id: z.string().uuid(),
  color_id: z.string().uuid(),
});

export const cartState = z.object({
  item: z.array(cartItemPayload),
});

export const filteringSchema = z.object({
  brand: z.array(z.string()).optional(),
  price: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .optional(),
  ram: z.array(z.string()).optional(),
  color: z.string().optional(),
  capacity: z.array(z.number()).optional(),
});

export const authUser = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

export const userProfileUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  first_name: z
    .string()
    .min(3, {
      message:
        "Please ensure that your first name is at least 3 characters long",
    })
    .max(15, {
      message:
        "Please ensure that your first name is at most 5 characters long",
    }),
  last_name: z
    .string()
    .min(3, {
      message:
        "Please ensure that your last name is at least 3 characters long",
    })
    .max(15, {
      message: "Please ensure that your last name is at most 5 characters long",
    }),
  email: z.string().email(),
  phone_number: z
    .string()
    .nullable()
    .optional()
    .refine((value) => value.startsWith("+"), {
      message: "Phone numbers must start with + ",
    }),
  address: z.string().nullable(),
  new_password: z.string().optional().nullable(),
  confirm_password: z.string().optional(),
});
