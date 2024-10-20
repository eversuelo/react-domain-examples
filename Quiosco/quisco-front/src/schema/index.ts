import {z} from 'zod';

export const OrderSchema=z.object({
    name:z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    total:z.number().min(1, 'Hay un error en el total'),
    order:z.array(z.object({
        id:z.number(),
        name:z.string(),
        price:z.number(),
        quantity:z.number(),
        subtotal:z.number()
    }))

});
