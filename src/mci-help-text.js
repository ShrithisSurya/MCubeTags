import { BaseElement } from "./base.js";

class MCIHelpText extends BaseElement {
    constructor() {
        super();

        // Create a span element inside shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block; /* Always visible */
                    margin-left: 8px;
                    transition: opacity 0.3s ease;
                }
                span {
                    display: inline-block;
                }
            </style>
            <span></span>
        `;

        this.textElement = this.shadowRoot.querySelector("span");
    }

    connectedCallback() {
        super.connectedCallback(); // Ensure BaseElement logic runs

        // Get the target input field
        const targetId = this.getAttribute("for");
        this.targetInput = document.getElementById(targetId);

        if (this.targetInput) {
            // Show help text when input is focused
            this.targetInput.addEventListener("focus", () => this.show());

            // Keep visible while typing
            this.targetInput.addEventListener("input", () => this.show());

            // ❌ Removed blur event to keep text always visible
        }

        // Apply attributes and styles
        this.updateStyles();
        this._updateText();
    }

    static get observedAttributes() {
        return [...BaseElement.observedAttributes, "value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue); // Handle BaseElement updates

        if (name === "value") {
            this._updateText();
        }
    }

    _updateText() {
        this.textElement.textContent = this.getAttribute("value") || "Enter your input"; // Default help text
    }

    updateStyles() {
        this.style.fontSize = this.getAttribute("font-size") || "12px";
        this.style.color = this.getAttribute("text-color") || "red";
    }

    show() {
        this.style.display = "block";
        this.style.visibility = "visible";
        this.style.opacity = "1";
    }

    // ❌ Removed hide() function since text should always be visible
}

// Define the custom element
customElements.define("mci-help-text", MCIHelpText);
