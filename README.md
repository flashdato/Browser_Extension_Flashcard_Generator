# Flashcard Gesture Extension for Firefox

## Overview

This Firefox browser extension enables users to interact with dynamically generated flashcards on web pages using hand gestures via webcam. The flashcards appear in the popup, and users can answer or navigate them using simple gestures, providing an intuitive and hands-free studying experience.

## Features

- Popup-based UI for accessing flashcards
- Hand gesture recognition (e.g., next, previous, reveal answer)
- Full backend integration for flashcard data storage and retrieval
- Works within Firefox browser context
- Built with TypeScript and modern WebExtension APIs

## Tech Stack

- **TypeScript**: Typed JavaScript for scalability
- **Webpack**: Bundles and builds project files
- **WebExtension Polyfill**: Ensures consistent browser API access
- **Node.js Backend**: Handles flashcard data and API endpoints
- **PostgreSQL**: Robust relational database for storing flashcard data
- *(Optional)* TensorFlow.js or other gesture libraries for future implementation

## Folder Structure

```
Browser_Extension_Flashcard_Generator/
├── backend/                # Backend server for flashcard data
│   ├── server.js           # Main server logic
│   ├── db.js               # Database connection and queries
│   └── routes/             # API routes for flashcard operations
├── dist/                   # Compiled build files (excluded from version control)
├── node_modules/           # Project dependencies (excluded from version control)
├── src/                    # Main source code
│   ├── popup.ts            # Extension popup logic
│   ├── content.ts          # Gesture and page interaction logic
│   └── manager.ts          # Manages flashcard state and logic
├── public/                 # Static files and manifest
│   └── manifest.json       # WebExtension configuration
├── package.json            # NPM scripts and dependencies
├── tsconfig.json           # TypeScript compiler configuration
├── webpack.config.js       # Webpack configuration
└── README.md               # Project documentation
```

## Database Integration

The backend now includes a `db.js` file to manage the connection to a PostgreSQL database. PostgreSQL is used to store and retrieve flashcard data efficiently. The database schema is designed to support features like user-specific flashcards, categories, and progress tracking.

### Setting Up PostgreSQL

1. **Install PostgreSQL**:
  Follow the instructions for your operating system to install PostgreSQL.

2. **Create a Database**:
  Use the following commands to create a database and user:

  ```sql
  CREATE DATABASE flashcards;
  CREATE USER flash_user WITH PASSWORD 'securepassword';
  GRANT ALL PRIVILEGES ON DATABASE flashcards TO flash_user;
  ```

3. **Configure `db.js`**:
  Update the `db.js` file with your database credentials:

  ```javascript
  const { Pool } = require('pg');

  const pool = new Pool({
     user: 'flash_user',
     host: 'localhost',
     database: 'flashcards',
     password: 'securepassword',
     port: 5432,
  });

  module.exports = pool;
  ```

4. **Run Migrations**:
  Create tables and seed data using SQL scripts or a migration tool.

### Example Query in `db.js`

```javascript
const pool = require('./db');

// Example function to fetch flashcards
async function getFlashcards() {
   const result = await pool.query('SELECT * FROM flashcards');
   return result.rows;
}

module.exports = { getFlashcards };
```

## Build and Run Instructions

1. **Install dependencies**:

```bash
npm install
```

2. **Build the extension**:

```bash
npm run build
```

3. **Start the backend server**:

```bash
node backend/server.js
```

4. **Load the extension in Firefox**:

- Open `about:debugging`
- Click **"This Firefox"**
- Click **"Load Temporary Add-on"**
- Select the `public/manifest.json` file

5. **Test the extension**:

- Click the extension icon
- The popup UI will open
- Use hand gestures in front of the webcam to interact with flashcards
- Flashcard data will be fetched from the PostgreSQL database via the backend

## Development Notes

- `dist/` and `node_modules/` are excluded using `.gitignore`
- Gesture recognition logic will be implemented in `content.ts`
- All browser API interactions should use the polyfill: `import browser from 'webextension-polyfill';`
- Backend API endpoints are defined in `backend/routes/`
- Database queries and logic are handled in `backend/db.js`

## Dependency Setup on Another System

To replicate the development environment, clone the repository and run:

```bash
npm install
```

### Key Dependencies

```json
"dependencies": {
  "webextension-polyfill": "^0.10.0",
  "express": "^4.x.x",
  "pg": "^8.x.x"
},
"devDependencies": {
  "webpack": "^5.x.x",
  "typescript": "^5.x.x"
}
```

## Download Link for Distribution

After building the extension, compress the following files:

```
/public
/dist
/backend
```

Then distribute the zipped archive for manual installation or submission to Firefox Add-ons.

---

FLASH TECH 2025