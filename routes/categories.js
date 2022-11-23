import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const router = Router();
const prisma = new PrismaClient()

router.get('/categories', async (req, res, next) => {
  try {
    const category = await prisma.category.findMany()

    res.status(200).json({ status: 1, data: category });
  } catch (error) {
    next(error)
  }
});

export default router;