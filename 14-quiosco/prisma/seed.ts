import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const seed = async () => {
    try {
        // Limpiar datos existentes en el orden correcto
        await prisma.orderProduct.deleteMany();
        await prisma.order.deleteMany();
        await prisma.product.deleteMany();
        await prisma.category.deleteMany();
        await prisma.user.deleteMany();
        
        console.log('✅ Datos existentes eliminados');
        
        // Crear usuario administrador por defecto
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const adminUser = await prisma.user.create({
            data: {
                email: 'admin@quiosco.com',
                name: 'Administrador',
                password: hashedPassword,
                role: 'ADMIN',
            },
        });
        
        console.log('✅ Usuario administrador creado');
        console.log('📧 Email: admin@quiosco.com');
        console.log('🔑 Contraseña: admin123');
        
        // Crear usuario cliente de ejemplo
        const clientHashedPassword = await bcrypt.hash('cliente123', 10);
        await prisma.user.create({
            data: {
                email: 'cliente@ejemplo.com',
                name: 'Cliente Ejemplo',
                password: clientHashedPassword,
                role: 'CUSTOMER',
            },
        });
        
        console.log('✅ Usuario cliente creado');
        
        // Insertar categorías
        const createdCategories = await Promise.all(
            categories.map((category) => 
                prisma.category.create({
                    data: category,
                })
            )
        );
        
        console.log('✅ Categorías insertadas');
        
        // Crear un mapa de slug a ID
        const categoryMap = new Map(
            createdCategories.map((cat) => [cat.slug, cat.id])
        );
        
        // Mapear los productos con los IDs correctos
        const productsWithCorrectIds = products.map((product) => {
            const categorySlug = categories[product.categoryId - 1].slug;
            return {
                ...product,
                categoryId: categoryMap.get(categorySlug)!,
            };
        });
        
        // Insertar productos
        await prisma.product.createMany({
            data: productsWithCorrectIds,
        });
        
        console.log('✅ Productos insertados');
        console.log('🎉 Seed completado exitosamente'); 
    } catch (error) {
        console.error('Error durante el seed:', error);
        throw error;
    }
};

seed()
    .then(() => console.log("Seeds completed"))
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    }); 