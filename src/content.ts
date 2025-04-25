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

function showFlashcardedTag(selection: Selection, text: string) {
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = `${window.scrollX + rect.left}px`;
  container.style.top = `${window.scrollY + rect.bottom + 5}px`;
  container.style.backgroundColor = "yellow";
  container.style.color = "red";
  container.style.fontWeight = "bold";
  container.style.padding = "8px";
  container.style.border = "1px solid red";
  container.style.borderRadius = "4px";
  container.style.zIndex = "9999";
  container.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";

  const tag = document.createElement("div");
  tag.textContent = "FLASHCARDED";
  tag.style.marginBottom = "8px";

  const btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.gap = "8px";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.style.padding = "4px 10px";
  saveBtn.style.cursor = "pointer";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.padding = "4px 10px";
  cancelBtn.style.cursor = "pointer";

  saveBtn.onclick = () => {
    fetch("http://localhost:5000/api/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Flashcard saved to DB:", data);
        container.remove();
      })
      .catch(error => {
        console.error("Error saving flashcard:", error);
        container.remove();
      });
  };

  cancelBtn.onclick = () => container.remove();

  btnContainer.appendChild(saveBtn);
  btnContainer.appendChild(cancelBtn);
  container.appendChild(tag);
  container.appendChild(btnContainer);
  document.body.appendChild(container);

  setTimeout(() => container.remove(), 10000);
}

document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  const text = selection?.toString().trim();
  if (text) {
    showFlashcardedTag(selection!, text);
  }
});
