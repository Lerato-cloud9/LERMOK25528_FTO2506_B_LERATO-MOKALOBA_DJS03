import { GenreService } from "../utils/GenreService.js";
import { DateUtils } from "../utils/DateUtils.js";

/**
 * Template containing the markup and styles for the podcast card.
 */
const template = document.createElement("template");
template.innerHTML = /* html */ `
  <style>
    .card {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s;
    }

    .card:hover {
      transform: scale(1.02);
    }

    .card img {
      width: 100%;
      border-radius: 6px;
    }

    .card h3 {
      margin: 0.5rem 0;
    }

    .card p {
      margin: 0px;
      font-size: 0.8rem;
      color: var(--grey-text);
    }

    .tags {
      margin: 0.5rem 0;
    }

    .tag {
      background: #eee;
      padding: 0.3rem 0.6rem;
      margin-right: 0.5rem;
      margin-top: 0.5rem;
      border-radius: 4px;
      display: inline-block;
      font-size: 0.8rem;
    }

    .updated-text {
      font-size: 0.8rem;
      color: var(--grey-text);
    }
  </style>
  <div class="card">
    <img />
    <h3></h3>
    <p class="seasons"></p>
    <div class="tags"></div>
    <p class="updated-text"></p>
  </div>
`;

/**
 * Custom Web Component to render a podcast card preview.
 *
 */
class PodcastCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    /** @type {Object.<string, HTMLElement>} */
    this.elements = {
      card: shadow.querySelector(".card"),
      img: shadow.querySelector("img"),
      title: shadow.querySelector("h3"),
      seasons: shadow.querySelector(".seasons"),
      tags: shadow.querySelector(".tags"),
      updated: shadow.querySelector(".updated-text"),
    };
  }

  /**
   * Stores the podcast data and triggers UI rendering.
   * @param {Object} podcast - The podcast data object.
   */
  setPodcast(podcast) {
    this._podcast = podcast;
    this.renderPodcast();
  }

  /**
   * Updates the UI with the stored podcast data.
   *
   */
  renderPodcast() {
    if (!this._podcast) return;

    const { image, title, seasons, genres, updated } = this._podcast;
    const genreNames = GenreService.getNames(genres);

    this.elements.img.src = image;
    this.elements.img.alt = `${title} cover`;
    this.elements.title.textContent = title;
    this.elements.seasons.textContent = `${seasons} season${
      seasons > 1 ? "s" : ""
    }`;
    this.elements.tags.innerHTML = genreNames
      .map((g) => `<span class="tag">${g}</span>`)
      .join("");
    this.elements.updated.textContent = DateUtils.format(updated);

    this.elements.card.onclick = () => {
      console.log("podcast clicked");
      this.dispatchEvent(
        new CustomEvent("podcast-selected", {
          detail: this._podcast,
          bubbles: true,
          composed: true,
        })
      );
    };
  }
}

customElements.define("podcast-card", PodcastCard);
