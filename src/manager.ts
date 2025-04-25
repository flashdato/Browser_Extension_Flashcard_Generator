import browser from "webextension-polyfill";

export class FlashcardManager {
  private cards: string[] = [];

  async load() {
    const result = await browser.storage.local.get("cards");
    this.cards = Array.isArray(result.cards) ? result.cards : [];
  }

  async save() {
    await browser.storage.local.set({ cards: this.cards });
  }

  addCard(card: string) {
    this.cards.push(card);
    this.save();
  }

  getCards() {
    return this.cards;
  }
}
export async function saveFlashcard(text: string) {
  try {
    await fetch("http://localhost:3001/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch (error) {
    console.error("Error saving flashcard:", error);
  }
}
