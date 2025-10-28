import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

// ✅ GET all puppies
app.get("/puppies", async (req, res) => {
  try {
    const puppies = await prisma.puppy.findMany();
    res.json(puppies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch puppies" });
  }
});

// ✅ POST add a new puppy
app.post("/puppies", async (req, res) => {
  try {
    const { name, breed, age_est, current_kennel_number } = req.body;
    const newPuppy = await prisma.puppy.create({
      data: {
        name,
        breed,
        age_est: parseInt(age_est),
        current_kennel_number,
      },
    });
    res.json(newPuppy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add puppy" });
  }
});

// ✅ DELETE a puppy by ID
app.delete("/puppies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.puppy.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Puppy deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete puppy" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🐶 Server running on port ${PORT}`));
