import {prisma} from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export default async function OrderPage({params}: {params: Promise<{category: string}>}) {
    const {category: categorySlug} = await params;
    
    const products = await prisma.product.findMany({
        where: {
            category:{
                slug: categorySlug
            }
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    const category = await prisma.category.findUnique({
        where: {
            slug: categorySlug
        }
    });
    
    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50/30 via-white to-pink-50/30">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                        {category?.name || 'Productos'}
                    </h1>
                    <p className="text-slate-500">
                        {products.length} {products.length === 1 ? 'producto disponible' : 'productos disponibles'}
                    </p>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-8xl mb-4 opacity-30">🍽️</div>
                        <p className="text-slate-400 font-medium text-lg">No hay productos en esta categoría</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}