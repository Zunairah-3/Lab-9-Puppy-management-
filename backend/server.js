import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// ✅ Root route (just to test)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ GET all puppies
app.get("/puppies", async (req, res) => {
  const puppies = await prisma.puppy.findMany();
  res.json(puppies);
});

// ✅ POST new puppy
app.post("/puppies", async (req, res) => {
  const { name, breed, age_est, current_kennel_number } = req.body;
  const newPuppy = await prisma.puppy.create({
    data: { name, breed, age_est: parseInt(age_est), current_kennel_number },
  });
  res.json(newPuppy);
});

// ✅ DELETE puppy
app.delete("/puppies/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.puppy.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Puppy deleted" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

