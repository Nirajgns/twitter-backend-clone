import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//create tweet
router.post("/", async (req, res) => {
  const { userId, content, image } = req.body;

  try {
    const tweet = await prisma.tweet.create({
      data: {
        userId,
        content,
        image,
      },
    });
    res.json(tweet);
  } catch (e: any | unknown) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

//get all tweets
router.get("/", async (req, res) => {
  try {
    const allTweets = await prisma.tweet.findMany();

    res.json(allTweets);
  } catch (e: any | unknown) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

//get one tweet
router.get("/:id", (req, res) => {
  const { id } = req.params;

  try {
    const tweet = prisma.tweet.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(tweet);
  } catch (e: any | unknown) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

//update tweet
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, image } = req.body;
  try {
    const tweet = await prisma.tweet.update({
      where: {
        id: Number(id),
      },
      data: {
        content,
        image,
      },
    });
    res.json(tweet);
  } catch (e: any | unknown) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

//delete tweet
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const tweet = prisma.tweet.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(tweet);
  } catch (e: any | unknown) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
