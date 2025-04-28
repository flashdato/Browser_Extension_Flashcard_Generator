interface Flashcard {
    id: number;
    content: string;
    difficulty: string | null;
  }
  
  let flashcards: Flashcard[] = [];
  let currentIndex = 0;
  
  const flashcardDiv = document.getElementById("flashcard") as HTMLDivElement;
  const easyBtn = document.getElementById("easy") as HTMLButtonElement;
  const hardBtn = document.getElementById("hard") as HTMLButtonElement;
  const impossibleBtn = document.getElementById("impossible") as HTMLButtonElement;
  
  async function fetchFlashcards() {
    try {
      const response = await fetch("http://localhost:5000/api/flashcards");
      if (!response.ok) {
        throw new Error("Failed to fetch flashcards");
      }
      flashcards = await response.json();
      currentIndex = 0;
      displayFlashcard();
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      flashcardDiv.textContent = "Error loading flashcards.";
    }
  }
  
  function displayFlashcard() {
    if (currentIndex < flashcards.length) {
      flashcardDiv.textContent = flashcards[currentIndex].content;
    } else {
      flashcardDiv.textContent = "No more flashcards!";
      easyBtn.disabled = true;
      hardBtn.disabled = true;
      impossibleBtn.disabled = true;
    }
  }
  
  async function markFlashcard(difficulty: string) {
    const currentFlashcard = flashcards[currentIndex];
    try {
      const response = await fetch(`http://localhost:5000/api/flashcards/${currentFlashcard.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ difficulty }),
      });
      if (!response.ok) {
        throw new Error("Failed to update flashcard");
      }
      currentIndex++;
      displayFlashcard();
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  }
  
  easyBtn.addEventListener("click", () => markFlashcard("easy"));
  hardBtn.addEventListener("click", () => markFlashcard("hard"));
  impossibleBtn.addEventListener("click", () => markFlashcard("impossible"));
  
  fetchFlashcards();
  