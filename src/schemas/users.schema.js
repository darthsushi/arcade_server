import { z } from 'zod'

const userExtraSchema = z.object({
  experience: z
    .number()
    .int()
    .min(0, { message: 'La experiencia no puede ser menor a 0' })
    .max(5000, { message: 'La experiencia no puede ser mayor a 5000' }),
  level: z
    .number()
    .int()
    .min(0, { message: 'El nivel no puede ser menor a 0' })
    .max(1000, { message: 'El nivel no puede ser mayor a 1000' }),
  free_coin: z
    .number()
    .int()
    .min(0, { message: 'Las monedas gratuitas no pueden ser negativas' }),
  coin: z
    .number()
    .int()
    .min(0, { message: 'Las monedas no pueden ser negativas' }),
  weapon_1: z.boolean({ required_error: 'El valor de weapon debe ser booleano' }),
  weapon_2: z.boolean({ required_error: 'El valor de weapon debe ser booleano' }),
  weapon_3: z.boolean({ required_error: 'El valor de weapon debe ser booleano' })
})

const userBasicSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no debe exceder los 50 caracteres'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .max(50, 'La contraseña no puede tener más de 50 caracteres.')
    .regex(/[A-Z]/, 'La contraseña debe incluir al menos una letra mayúscula.')
    .regex(/[a-z]/, 'La contraseña debe incluir al menos una letra minúscula.')
    .regex(/[0-9]/, 'La contraseña debe incluir al menos un número.'),
  nickname: z
    .string()
    .min(4, 'El nombre de usuario debe tener al menos 4 caracteres.')
    .max(20, 'El nombre de usuario no puede tener más de 20 caracteres.')
    .regex(/^[a-zA-Z0-9_.-]/, 'El nombre de usuario solo puede contener letras, números, y lo siguiente: "_", "-" y "."')
})

function validateRegisterUser (input) {
  return userBasicSchema.safeParse(input)
}

function validateLoginUser (input) {
  return userBasicSchema.partial().safeParse(input)
}

function validatePartialUser (input) {
  return userExtraSchema.partial().safeParse(input)
}

export { validatePartialUser, validateRegisterUser, validateLoginUser }
