import browser from "webextension-polyfill";

interface Message {
    type: string;
}

browser.runtime.onMessage.addListener((message: Message): Promise<string> | void => {
    if (message.type === "GET_SELECTION") {
        const selection: string = window.getSelection()?.toString() || "";
        return Promise.resolve(selection);
    }
});

function createFlashcardPopup(text: string, x: number, y: number) {
    const popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.top = `${y + 20}px`;
    popup.style.left = `${x}px`;
    popup.style.backgroundColor = "white";
    popup.style.border = "1px solid #ccc";
    popup.style.padding = "8px";
    popup.style.zIndex = "9999";
    popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    popup.textContent = text;
  
    document.body.appendChild(popup);
  
    setTimeout(() => popup.remove(), 5000);
  }
  
  document.addEventListener("mouseup", () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text) {
      const range = selection!.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      createFlashcardPopup(text, rect.left + window.scrollX, rect.top + window.scrollY);
  
      fetch("http://localhost:5000/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      })
      .then(response => response.json())
      .then(data => console.log("Flashcard saved to DB:", data))
      .catch(error => console.error("Error saving flashcard:", error));
      
    }
  });
  
