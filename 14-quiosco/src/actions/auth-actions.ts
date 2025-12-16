'use server';

import { prisma } from '@/lib/prisma';
import { RegisterUserSchema, LoginUserSchema } from '@/lib/schemas';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type AuthState = {
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  userId?: number;
};

export async function registerUser(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Validar con Zod
    const validationResult = RegisterUserSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validationResult.data.email },
    });

    if (existingUser) {
      return {
        success: false,
        errors: {
          _form: ['Este email ya está registrado'],
        },
      };
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(validationResult.data.password, 10);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name: validationResult.data.name,
        email: validationResult.data.email,
        password: hashedPassword,
        role: 'CUSTOMER',
      },
    });

    // Crear sesión
    const cookieStore = await cookies();
    cookieStore.set('userId', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return {
      success: true,
      userId: user.id,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      success: false,
      errors: {
        _form: ['Ocurrió un error al registrar el usuario. Por favor, intenta de nuevo.'],
      },
    };
  }
}

export async function loginUser(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Login attempt for email:', email);

    // Validar con Zod
    const validationResult = LoginUserSchema.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      console.log('Validation failed:', validationResult.error);
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    console.log('Looking for user with email:', validationResult.data.email);

    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { email: validationResult.data.email },
    });

    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return {
        success: false,
        errors: {
          _form: ['Email o contraseña incorrectos'],
        },
      };
    }

    // Verificar contraseña
    console.log('Comparing passwords...');
    const isValidPassword = await bcrypt.compare(
      validationResult.data.password,
      user.password
    );

    console.log('Password valid:', isValidPassword);

    if (!isValidPassword) {
      return {
        success: false,
        errors: {
          _form: ['Email o contraseña incorrectos'],
        },
      };
    }

    // Crear sesión
    console.log('Creating session for user:', user.id);
    const cookieStore = await cookies();
    cookieStore.set('userId', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    console.log('Login successful for user:', user.id);

    return {
      success: true,
      userId: user.id,
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      success: false,
      errors: {
        _form: ['Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.'],
      },
    };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('userId');
  redirect('/');
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
