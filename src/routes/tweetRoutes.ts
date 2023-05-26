import { Router } from "express";

const router = Router();

//get user
router.get("/", (req, res) => {
  res.status(501).json({ error: "not implemented" });
});

//create user
router.post("/", (req, res) => {
  res.status(501).json({ error: "not implemented" });
});

//update user
router.put("/:id", (req, res) => {
  const { id } = req.params;

  res.status(501).json({ error: `not implemented:${id}` });
});

//delete user
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.status(501).json({ error: `not implemented:${id}` });
});

//get one user
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `not implemented:${id}` });
});

export default router;
