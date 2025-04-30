import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";

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

// === Webcam Preview Setup ===
const video = document.createElement("video");
video.style.position = "fixed";
video.style.right = "10px";
video.style.bottom = "10px";
video.style.width = "160px";
video.style.border = "2px solid black";
video.style.zIndex = "9999";
video.setAttribute("autoplay", "true");
video.setAttribute("muted", "true");
video.setAttribute("playsinline", "true");
document.body.appendChild(video);

// === Flashcard Logic ===

async function fetchFlashcards() {
  try {
    const response = await fetch("http://localhost:5000/api/flashcards");
    if (!response.ok) throw new Error("Failed to fetch flashcards");
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty }),
    });
    if (!response.ok) throw new Error("Failed to update flashcard");
    currentIndex++;
    displayFlashcard();
  } catch (error) {
    console.error("Error updating flashcard:", error);
  }
}

easyBtn.addEventListener("click", () => markFlashcard("easy"));
hardBtn.addEventListener("click", () => markFlashcard("hard"));
impossibleBtn.addEventListener("click", () => markFlashcard("impossible"));

// === Gesture Recognition ===

function distance(a: number[], b: number[]) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function gestureToLabel(landmarks: number[][]): "easy" | "hard" | "impossible" | null {
  const [thumbTip, indexTip, middleTip, ringTip, pinkyTip] = [
    landmarks[4], landmarks[8], landmarks[12], landmarks[16], landmarks[20]
  ];

  const thumbToIndex = distance(thumbTip, indexTip);
  const indexToMiddle = distance(indexTip, middleTip);
  const spread = distance(indexTip, pinkyTip);

  if (thumbToIndex < 40) return "easy";             // Thumb and index touching
  if (indexToMiddle < 30) return "hard";            // Pinch
  if (spread > 100 && indexToMiddle > 50) return "impossible"; // Peace/open hand

  return null;
}

async function setupWebcam(): Promise<void> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await new Promise((resolve) => {
      video.onloadedmetadata = () => resolve(null);
    });
    await video.play();
  } catch (error) {
    console.error("Webcam error:", error);
    alert("Please allow webcam access.");
  }
}

async function startGestureRecognition() {
  await tf.setBackend("webgl");
  await tf.ready();
  await setupWebcam();

  const model = await handpose.load();
  let lastGesture: string | null = null;
  let lastTime = 0;

  async function detect() {
    const now = Date.now();
    const predictions = await model.estimateHands(video);

    if (predictions.length > 0 && now - lastTime > 1000) {
      const landmarks = predictions[0].landmarks;
      const gesture = gestureToLabel(landmarks);

      if (gesture && gesture !== lastGesture) {
        console.log("Gesture detected:", gesture);
        lastGesture = gesture;
        lastTime = now;

        if (gesture === "easy") markFlashcard("easy");
        else if (gesture === "hard") markFlashcard("hard");
        else if (gesture === "impossible") markFlashcard("impossible");
      }
    }

    requestAnimationFrame(detect);
  }

  detect();
}

// === Start App ===
fetchFlashcards();
startGestureRecognition();
