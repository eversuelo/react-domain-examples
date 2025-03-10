import { Product } from '@prisma/client';
import { products } from '../../prisma/data/products';
import { formatCurrency } from '../../src/utils/index';
import Image from 'next/image';
import AddProductButton from './AddProductButton';
type ProductCardProps = {
    product: Product
}
export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className='bg-white p-4 rounded-lg shadow-md border'>
      
              <Image src={`/products/${product.image}.jpg`} className='mx-auto rounded-2xl border-blue-500 border-2 my-2 ' alt={product.name} width={400} height={500} />
      
            <h3 className='text-xl font-bold'>{product.name}</h3>
            <p className='text-2xl text-amber-500  font-bold mt-5'>{formatCurrency(product.price)}</p>
            <AddProductButton 
            product={product}
            />

        </div>
    )
}
