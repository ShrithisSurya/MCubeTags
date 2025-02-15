import { BaseElement } from "./base.js";

class MCIToolTip extends BaseElement {
    constructor() {
        super();

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: absolute;
                    display: none;
                    background: black;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                    transition: opacity 0.3s ease;
                }

                .tooltip-arrow {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-style: solid;
                }

                :host([tooltip-direction="top"]) .tooltip-arrow {
                    bottom: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 5px 5px 0 5px;
                    border-color: black transparent transparent transparent;
                }

                :host([tooltip-direction="bottom"]) .tooltip-arrow {
                    top: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 0 5px 5px 5px;
                    border-color: transparent transparent black transparent;
                }

                :host([tooltip-direction="left"]) .tooltip-arrow {
                    right: -5px;
                    top: 50%;
                    transform: translateY(-50%);
                    border-width: 5px 0 5px 5px;
                    border-color: transparent transparent transparent black;
                }

                :host([tooltip-direction="right"]) .tooltip-arrow {
                    left: -5px;
                    top: 50%;
                    transform: translateY(-50%);
                    border-width: 5px 5px 5px 0;
                    border-color: transparent black transparent transparent;
                }
            </style>
            <span class="tooltip-text"></span>
            <div class="tooltip-arrow"></div>
        `;

        this.textElement = this.shadowRoot.querySelector(".tooltip-text");
    }

    connectedCallback() {
        super.connectedCallback();

        const targetId = this.getAttribute("for");
        this.targetElement = document.getElementById(targetId);

        if (this.targetElement) {
            this.targetElement.addEventListener("mouseenter", () => this.show());
            this.targetElement.addEventListener("mouseleave", () => this.hide());
        }

        this.updateStyles();
        this._updateText();
    }

    static get observedAttributes() {
        return [...BaseElement.observedAttributes, "value", "tooltip-direction"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);

        if (name === "value") {
            this._updateText();
        } else if (name === "tooltip-direction") {
            this.updatePosition();
        } else if (["width", "height", "border-radius", "padding"].includes(name)) {
            this.style[name] = newValue;
        }
    }

    _updateText() {
        this.textElement.textContent = this.getAttribute("value") || "Tooltip";
    }

    updateStyles() {
        this.style.fontSize = this.getAttribute("font-size") || "12px";
        this.style.color = this.getAttribute("text-color") || "white";
        this.style.backgroundColor = this.getAttribute("bg-color") || "black";
        this.style.width = this.getAttribute("width") || "auto";
        this.style.height = this.getAttribute("height") || "auto";
        this.style.borderRadius = this.getAttribute("border-radius") || "4px";
        this.style.padding = this.getAttribute("padding") || "5px 10px";
        this.updatePosition();
    }

    updatePosition() {
        if (!this.targetElement) return;

        const rect = this.targetElement.getBoundingClientRect();
        const tooltipDirection = this.getAttribute("tooltip-direction") || "top";

        requestAnimationFrame(() => {
            switch (tooltipDirection) {
                case "top":
                    this.style.top = `${rect.top - this.offsetHeight - 5}px`;
                    this.style.left = `${rect.left + rect.width / 2}px`;
                    break;
                case "bottom":
                    this.style.top = `${rect.bottom + 5}px`;
                    this.style.left = `${rect.left + rect.width / 2}px`;
                    break;
                case "left":
                    this.style.top = `${rect.top + rect.height / 2}px`;
                    this.style.left = `${rect.left - this.offsetWidth - 5}px`;
                    break;
                case "right":
                    this.style.top = `${rect.top + rect.height / 2}px`;
                    this.style.left = `${rect.right + 5}px`;
                    break;
            }
        });
    }

    show() {
        this.style.display = "block";
        this.updatePosition();
    }

    hide() {
        this.style.display = "none";
    }
}

customElements.define("mci-tool-tip", MCIToolTip);
