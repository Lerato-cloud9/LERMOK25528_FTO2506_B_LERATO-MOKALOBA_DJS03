# DJS02 Web Component Podcast Preview

This project is a **modular Vanilla JavaScript application** that uses a custom **Web Component** to render podcast cards. It embraces modern web standards such as **Shadow DOM**, **custom elements**, and **event-driven UI** design.

This version improves on DJS01 by replacing factory-based card rendering with a reusable `<podcast-card>` Web Component.

---

## Features

- Displays a responsive grid of podcast cards using a custom element
- Dispatches `podcast-selected` event when a card is clicked
- Uses utility services for formatting dates and resolving genre names
- Opens a modal with detailed information
- Emphasizes **modularity**, **encapsulation**, and **event-driven architecture**

---

## Project Structure

```
/src
│
├── /components
│ ├── PodcastCard.js # Web Component for podcast preview
│ └── createModal.js # Factory for modal control (open/close)
│
├── /utils
│ ├── DateUtils.js # Formats podcast dates
│ └── GenreService.js # Maps genre IDs to readable names
│
├── /views
│ └── createGrid.js # Places podcast-card elements into the page
│
├── data.js # Sample podcast and genre data
└── index.js # App entry point
```

---

## How it Works

### `<podcast-card>` Web Component

The `PodcastCard.js` module defines a fully encapsulated Web Component using the Shadow DOM. It takes in podcast data via `setPodcast(podcast)` and renders a stylized preview card.

When clicked, it dispatches a custom `podcast-selected` event containing the podcast data:

```js
const card = document.createElement("podcast-card");
card.setPodcast(podcastData);
card.addEventListener("podcast-selected", (e) => {
  console.log("Podcast clicked:", e.detail);
});
```

This makes it easy to plug into any system that listens for podcast selection.

### Grid Rendering with `createGrid`

The `createGrid` factory is responsible for rendering a list of podcast cards into a container. It does this by:

- Creating a `<podcast-card>` for each podcast in the list
- Setting its data using s`etPodcast(podcast)`
- Listening for the `podcast-selected` event to open a modal

## Learning Goals

- Learn how to create reusable Web Components with encapsulated styles and logic
- Apply Shadow DOM for style isolation
- Communicate between components using custom events
- Build composable UI modules using factory functions

## How to Run

1. Clone this project or open it locally.
2. Open index.html in your browser.
3. Browse the podcast cards and click one to open details.
4. Close the modal to return to the list.
