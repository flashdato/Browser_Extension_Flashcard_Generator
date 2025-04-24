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
  