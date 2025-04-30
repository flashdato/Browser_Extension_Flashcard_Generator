import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";

export async function startGestureRecognition(
  onEasy: () => void,
  onHard: () => void,
  onImpossible: () => void
) {
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

  await tf.setBackend("webgl");
  await tf.ready();

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  await video.play();

  const model = await handpose.load();
  let lastGesture = "";
  let lastTime = 0;

  function distance(a: number[], b: number[]) {
    return Math.hypot(a[0] - b[0], a[1] - b[1]);
  }

  async function detect() {
    const predictions = await model.estimateHands(video);
    const now = Date.now();

    if (predictions.length > 0 && now - lastTime > 1000) {
      const landmarks = predictions[0].landmarks;
      const [thumbTip, indexTip, middleTip] = [
        landmarks[4],
        landmarks[8],
        landmarks[12],
      ];

      const thumbToIndex = distance(thumbTip, indexTip);
      const indexToMiddle = distance(indexTip, middleTip);

      let gesture: string | null = null;

      if (thumbToIndex < 40) {
        gesture = "easy"; // thumbs up or pinch
      } else if (indexToMiddle < 30) {
        gesture = "hard"; // index + middle close = pinch
      } else if (indexToMiddle > 60 && thumbToIndex > 60) {
        gesture = "impossible"; // peace sign
      }

      if (gesture && gesture !== lastGesture) {
        lastGesture = gesture;
        lastTime = now;
        console.log("Gesture detected:", gesture);

        if (gesture === "easy") onEasy();
        else if (gesture === "hard") onHard();
        else if (gesture === "impossible") onImpossible();
      }
    }

    requestAnimationFrame(detect);
  }

  detect();
}
