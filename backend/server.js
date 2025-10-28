const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 🐶 GET all puppies
app.get("/puppies", async (req, res) => {
  try {
    const puppies = await prisma.puppies.findMany();
    res.json(puppies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching puppies");
  }
});

// 🐶 POST new puppy
app.post("/puppies", async (req, res) => {
  const { name, breed, age_est, current_kennel_number } = req.body;
  try {
    const newPuppy = await prisma.puppies.create({
      data: { name, breed, age_est, current_kennel_number },
    });
    res.json(newPuppy);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding puppy");
  }
});

// 🐶 DELETE puppy
app.delete("/puppies/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.puppies.delete({ where: { pet_id: id } });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting puppy");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🐶 Server running on port ${PORT}`));
