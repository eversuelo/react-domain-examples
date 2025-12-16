import { z } from 'zod';

// Schema para validar el registro de usuario
export const RegisterUserSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres'),
  email: z.string()
    .email('Ingresa un email válido')
    .toLowerCase(),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede tener más de 100 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

// Schema para validar el login
export const LoginUserSchema = z.object({
  email: z.string()
    .email('Ingresa un email válido')
    .toLowerCase(),
  password: z.string()
    .min(1, 'La contraseña es requerida'),
});

// Schema para validar un item del carrito
export const CartItemSchema = z.object({
  id: z.number().int().positive('El ID del producto debe ser un número positivo'),
  name: z.string().min(1, 'El nombre del producto es requerido'),
  price: z.number().positive('El precio debe ser mayor a 0'),
  quantity: z.number().int().positive('La cantidad debe ser un número positivo'),
  image: z.string().nullable().optional(),
});

// Schema para validar la creación de una orden
export const CreateOrderSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  items: z.array(CartItemSchema)
    .min(1, 'Debe agregar al menos un producto al carrito'),
  total: z.number().positive('El total debe ser mayor a 0'),
});

// Tipos inferidos de los schemas
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
