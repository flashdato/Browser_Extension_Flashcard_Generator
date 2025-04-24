# Flashcard Gesture Extension for Firefox

## Overview

This Firefox browser extension enables users to interact with dynamically generated flashcards on web pages using hand gestures via webcam. The flashcards appear in the popup, and users can answer or navigate them using simple gestures, providing an intuitive and hands-free studying experience.

## Features

- Popup-based UI for accessing flashcards
- Hand gesture recognition (e.g., next, previous, reveal answer)
- Works within Firefox browser context
- Built with TypeScript and modern WebExtension APIs

## Tech Stack

- **TypeScript**: Typed JavaScript for scalability
- **Webpack**: Bundles and builds project files
- **WebExtension Polyfill**: Ensures consistent browser API access
- *(Optional)* TensorFlow.js or other gesture libraries for future implementation

## Folder Structure

```
Browser_Extension_Flashcard_Generator/
├── dist/                    # Compiled build files (excluded from version control)
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

## Build and Run Instructions

1. **Install dependencies**:

```bash
npm install
```

2. **Build the extension**:

```bash
npm run build
```

3. **Load the extension in Firefox**:

- Open `about:debugging`
- Click **"This Firefox"**
- Click **"Load Temporary Add-on"**
- Select the `public/manifest.json` file

4. **Test the extension**:

- Click the extension icon
- The popup UI will open
- Use hand gestures in front of the webcam to interact with flashcards

## Development Notes

- `dist/` and `node_modules/` are excluded using `.gitignore`
- Gesture recognition logic will be implemented in `content.ts`
- All browser API interactions should use the polyfill: `import browser from 'webextension-polyfill';`

## Dependency Setup on Another System

To replicate the development environment, clone the repository and run:

```bash
npm install
```

### Key Dependencies

```json
"dependencies": {
  "webextension-polyfill": "^0.10.0"
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
```

Then distribute the zipped archive for manual installation or submission to Firefox Add-ons.

---

FLASH TECH 2025

