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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
