# Project TODO List

This file is used to track the progress of tasks for the Browser Extension Flashcard Generator project.

## Tasks

- [x] **Project Initialization**:
    - [x] Set up the project folder structure.
    - [x] Initialize `npm` and configure `package.json`.
    - [x] Install necessary dependencies (`typescript`, `webpack`, `webextension-polyfill`, etc.).
    - [x] Create a basic `tsconfig.json` for TypeScript configuration.

- [x] **Popup UI Development**:
    - [x] Create `popup.html` with a basic structure.
    - [x] Add `popup.css` for styling the popup interface.
    - [x] Implement `popup.ts` to handle user interactions and logic.
    - [x] Test the popup UI for functionality and responsiveness.

- [x] **Core Extension Development**:
    - [x] Create `manifest.json` with necessary permissions and configurations.
    - [x] Implement the background script (`background.js`) for handling extension events.
    - [x] Add content script (`content.ts`) for interacting with web pages.
    - [x] Test the extension's basic functionality in the browser.

- [x] **Popup and Extension Collaboration**:
    - [x] Set up message passing between the popup and background scripts.
    - [x] Implement logic in `popup.ts` to send and receive messages.
    - [x] Test the communication flow between the popup and the extension.

- [x] **Backend Development**:
    - [x] Set up the Node.js backend server.
    - [x] Implement database connection logic in `db.js`.
    - [x] Create API routes for flashcard operations (`backend/routes/`).
    - [x] Write database queries for flashcard storage and retrieval.

- [x] **Database Setup**:
    - [x] Design the PostgreSQL schema for flashcards and user progress.
    - [x] Write migration scripts to create necessary tables.
    - [x] Seed the database with sample data for testing.

- [x] **Review Page Development**:
    - [x] Create `review.html` with a basic structure.
    - [x] Add `review.css` for styling the review page.
    - [x] Implement `review.ts` to handle review logic and user interactions.
    - [x] Test the review page for functionality and responsiveness.

- [x] **Review Page and Backend Integration**:
    - [x] Implement API calls in `review.ts` to fetch flashcard data.
    - [x] Add logic to update user progress in the database.
    - [x] Test the integration between the review page and the backend.

- [X] **Camera Input on Review Page**:
    - [X] Add a webcam feed to `review.html` for gesture recognition.
    - [X] Implement gesture detection logic in `review.ts`.
    - [X] Test the camera input and gesture recognition functionality.

