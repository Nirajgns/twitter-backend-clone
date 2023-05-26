import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prisma = new PrismaClient();

//create user
router.post("/", async (req, res) => {
  const { name, email, username, bio } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        bio,
      },
    });
    res.json(user);
  } catch (e: any | unknown) {
    res.json({ error: e.message });
  }
});

//get user
router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();

  res.json(allUsers);
});

//get one user
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id), //converting userId string to number
    },
  });
  res.json(user);
});

//update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { bio, name, image } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: { bio, name, image },
    });
    res.json(user);
  } catch (e: any | unknown) {
    res.json({ error: e.message });
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

export default router;
