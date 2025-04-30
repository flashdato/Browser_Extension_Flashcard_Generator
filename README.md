# Flashcard Gesture Extension for Firefox

## Overview

This Firefox extension enables users to interact with flashcards on web pages using hand gestures via webcam. It includes a **Review Page** for testing knowledge on previously studied flashcards, offering a hands-free studying experience.

## Features

- Popup-based UI for flashcards
- **Review Page** for knowledge testing
- Hand gesture recognition (e.g., next, previous, reveal answer)
- Backend integration for flashcard data
- Built with TypeScript and modern WebExtension APIs

## Tech Stack

- **TypeScript**: Scalable JavaScript
- **Webpack**: Build tool
- **WebExtension Polyfill**: Browser API compatibility
- **Node.js**: Backend server
- **PostgreSQL**: Flashcard data storage

## Folder Structure

```
Browser_Extension_Flashcard_Generator/
├── backend/                # Backend server
├── dist/                   # Compiled files
├── src/                    # Source code
├── public/                 # Static files and manifest
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── webpack.config.js       # Webpack config
└── README.md               # Documentation
```

## Database Setup

1. **Install PostgreSQL** and create a database:
  ```sql
  CREATE DATABASE flashcards;
  CREATE USER flash_user WITH PASSWORD 'securepassword';
  GRANT ALL PRIVILEGES ON DATABASE flashcards TO flash_user;
  ```

2. **Configure `db.js`**:
  ```javascript
  const pool = new Pool({
    user: 'flash_user',
    host: 'localhost',
    database: 'flashcards',
    password: 'securepassword',
    port: 5432,
  });
  module.exports = pool;
  ```

3. **Run Migrations** to create tables and seed data.

## Build and Run

1. Install dependencies:
  ```bash
  npm install
  ```

2. Build the extension:
  ```bash
  npm run build
  ```

3. Start the backend server:
  ```bash
  node backend/server.js
  ```

4. Load the extension in Firefox:
  - Open `about:debugging`
  - Click **"This Firefox"**
  - Click **"Load Temporary Add-on"**
  - Select `public/manifest.json`

## Testing

- Use the popup UI or **Review Page** to interact with flashcards.
- Hand gestures control navigation and answer reveal.
- Flashcard data is fetched from the PostgreSQL backend.

## Distribution

Compress the following directories for distribution:
```
/public
/dist
/backend
```

---

FLASH TECH 2025
