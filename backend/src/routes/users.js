import express from 'express';
import { prisma } from '../utils/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, email, passwordHash } = req.body;

    const user = await prisma.user.create({
      data: { username, email, passwordHash },
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
