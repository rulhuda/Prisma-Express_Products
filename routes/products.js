import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const router = Router();
const prisma = new PrismaClient()

router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.products.findMany({
      include: {
        category: true,
      }
    })

    res.status(200).json({ status: 1, data: products });
  } catch (error) {
    next(error)
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const products = await prisma.products.findUnique({
      where: {
        id: Number(req.params.id),
      }
    })

    if (!products) return res.status(404).json({ status: 0, data: [] })

    res.status(200).json({ status: 1, data: products });

  } catch (error) {
    next(error)
  }
});

router.post('/products', async (req, res, next) => {
  try {
    const products = await prisma.products.create({
      data: req.body
    })

    if (!products) return res.status(403).json({ status: 0, data: [] })

    res.status(201).json({ status: 1, data: products });
  } catch (error) {
    next(error)
  }
});

router.patch('/products/:id', async (req, res, next) => {
  const { name, price, quantity, categoryId } = req.body;
  try {
    const products = await prisma.products.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        price,
        quantity,
        categoryId
      },
    })

    if (!products) return res.status(403).json({ status: 0, data: [] })

    res.status(200).json({ status: 1, data: products });
  } catch (error) {
    next(error)
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const products = await prisma.products.delete({
      where: {
        id: Number(req.params.id)
      }
    })

    if (!products) return res.status(404).json({ status: 0, data: [] })

    res.status(200).json({ status: 1, data: products });
  } catch (error) {
    next(error)
  }
});

export default router;