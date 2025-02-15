import { BaseElement } from "./base.js";

class MCINotificationToast extends BaseElement {
  constructor() {
    super();
    this.timeoutId = null;
    this.fadeTimeoutId = null;
    this.render();
  }

  static get observedAttributes() {
    return [...BaseElement.observedAttributes, "duration"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateContent();
    this.updateStyles();
    this.updateTransitionSpeed();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "duration") {
      this.updateTransitionSpeed();
    }
  }

  updateContent() {
    super.updateContent();
    if (this.textElement) {
      this.textElement.textContent = this.getAttribute("value") || "Notification";
    }
  }

  updateTransitionSpeed() {
    const duration = this.getAttribute("duration") || "2000"; // Default to 2000ms
    this.style.setProperty("--transition-speed", `${duration}ms`);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          border-radius: 5px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          opacity: 0;
          transition: opacity var(--transition-speed, 2000ms) ease-in-out;
          display: flex;
          align-items: center; /* Centers vertically */
          justify-content: center; /* Centers horizontally */
          text-align: center;
          background: blue;
          color: white;
        }

        :host(.show) {
          opacity: 1;
        }

        :host(.hide) {
          opacity: 0;
        }

        .toast-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <div class="toast-container">
        <p>Notification</p>
      </div>
    `;

    this.outerElement = this.shadowRoot.querySelector(".toast-container");
    this.textElement = this.shadowRoot.querySelector("p");
  }
}

customElements.define("mci-notification-toast", MCINotificationToast);
