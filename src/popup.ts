import browser from "webextension-polyfill";
import { FlashcardManager } from "./manager";

const manager = new FlashcardManager();
const list = document.getElementById("cards")!;
const addButton = document.getElementById("add")!;

async function renderCards() {
  await manager.load();
  list.innerHTML = "";
  for (const card of manager.getCards()) {
    const li = document.createElement("li");
    li.textContent = card;
    list.appendChild(li);
  }
}

addButton.addEventListener("click", async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (tab.id) {
    const selection: string = await browser.tabs.sendMessage(tab.id, {
      type: "GET_SELECTION"
    });

    if (selection) {
      manager.addCard(selection);
      renderCards();
    }
  }
});

renderCards();
