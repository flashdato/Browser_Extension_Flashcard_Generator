const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route to save flashcard
app.post("/api/flashcards", async (req, res) => {
  const { text } = req.body;
  try {
    const newCard = await pool.query(
      "INSERT INTO flashcards (content) VALUES ($1) RETURNING *",
      [text]
    );
    res.status(201).json(newCard.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to save flashcard" });
  }
});

// Get all flashcards
app.get("/api/flashcards", async (req, res) => {
  try {
    const allCards = await pool.query("SELECT * FROM flashcards");
    res.json(allCards.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch flashcards" });
  }
});

// Update flashcard difficulty
app.patch("/api/flashcards/:id", async (req, res) => {
  const { id } = req.params;
  const { difficulty } = req.body;
  try {
    const update = await pool.query(
      "UPDATE flashcards SET status = $1 WHERE id = $2 RETURNING *",
      [difficulty, id]
    );
    res.json(update.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update flashcard" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
