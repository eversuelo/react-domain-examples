import { Request, Response } from 'express';
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        const product = await Product.create({ name, description, price });
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}