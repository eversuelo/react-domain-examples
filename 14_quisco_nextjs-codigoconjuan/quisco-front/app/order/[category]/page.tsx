import { prisma } from '@/src/lib/prisma'
import { products } from '../../../prisma/data/products';
import ProductCard from '@/components/products/ProductCard';
async function getProducts(category: string) {
    return await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    })
}


async function OrderPage({ params }: { params: { category: string } }) {
    const products = await getProducts(params.category);
    return (
        <>
            <h1 className='text-3xl w-full p-4 text-center font-bold'>Elige y personaliza tu pedido a continuación</h1>
            <div className= 'p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default OrderPage