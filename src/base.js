export class BaseElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.wrapper = document.createElement("div");
        this.shadowRoot.appendChild(this.wrapper);
    }

    static get observedAttributes() {
        return [
            "width", "height", "style", "value", "status", "bg-color", "text-color",
            "padding", "border", "border-radius", "set-position", "disabled", "hide",
            "font-size", "size"
        ];
    }

    connectedCallback() {
        setTimeout(() => this.updateStyles(), 0); // ✅ Prevent blocking UI
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return; // ✅ Prevent infinite loop

        if (name === "value") {
            this.updateContent();
        } else {
            this.updateStyles();
        }
    }

    updateStyles() {
        requestAnimationFrame(() => { // ✅ Ensure smooth UI update
            const statusColors = {
                primary: "#007bff",
                secondary: "#6c757d",
                success: "#28a745",
                danger: "#dc3545",
                warning: "#ffc107",
                info: "#17a2b8",
                light: "#f8f9fa",
                dark: "#343a40"
            };

            const sizeMap = {
                "small": "12px",
                "medium": "16px",
                "large": "20px",
                "x-small": "10px",
                "xx-small": "8px",
                "x-large": "24px",
                "xx-large": "32px",
                "smaller": "smaller",
                "larger": "larger"
            };

            const status = this.getAttribute("status");
            const backgroundColor = status && statusColors[status] ? statusColors[status] : this.getAttribute("bg-color");
            const textColor = status ? (status === "light" ? "#000" : "#fff") : this.getAttribute("text-color");
            const size = sizeMap[this.getAttribute("size")] || this.getAttribute("font-size");

            const styles = {
                width: this.getAttribute("width"),
                height: this.getAttribute("height"),
                color: textColor,
                backgroundColor: backgroundColor,
                borderRadius: this.getAttribute("border-radius"),
                padding: this.getAttribute("padding"),
                border: this.getAttribute("border"),
                display: this.hasAttribute("hide") ? "none" : "block",
                fontSize: size // ✅ Apply size mapping
            };

            Object.keys(styles).forEach((key) => {
                if (styles[key]) {
                    this.style[key] = styles[key];
                }
            });

            if (this.hasAttribute("set-position")) {
                this.setPosition(this.getAttribute("set-position"));
            }

            this.toggleAttribute("disabled", this.hasAttribute("disabled"));

            // ✅ Apply inline styles from `style` attribute
            if (this.hasAttribute("style")) {
                this.style.cssText += this.getAttribute("style");
            }
        });
    }

    updateContent() {
        if (this.shadowRoot) {
            const span = this.shadowRoot.querySelector("span");
            if (span) span.textContent = this.getAttribute("value") || "";
        }
    }

    setPosition(position) {
        const positions = {
            "top-left": { top: "0px", left: "0px" },
            "top-right": { top: "0px", right: "0px" },
            "top-center": { top: "0px", left: "50%", transform: "translateX(-50%)" },

            "middle-left": { top: "50%", left: "0px", transform: "translateY(-50%)" },
            "middle-right": { top: "50%", right: "0px", transform: "translateY(-50%)" },
            "middle-center": { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },

            "bottom-left": { bottom: "0px", left: "0px" },
            "bottom-right": { bottom: "0px", right: "0px" },
            "bottom-center": { bottom: "0px", left: "50%", transform: "translateX(-50%)" },

            "top": { top: "0px", left: "50%", transform: "translateX(-50%)" },
            "middle": { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
            "bottom": { bottom: "0px", left: "50%", transform: "translateX(-50%)" }
        };

        // Apply position styles to this element
        Object.assign(this.style, {
            position: "absolute",
            top: "",
            left: "",
            right: "",
            bottom: "",
            transform: ""
        });

        Object.assign(this.style, positions[position] || {});
    }

    // Common Methods
    show() { this.removeAttribute('hide'); this.style.display = "block"; }
    hide() { this.setAttribute('hide', ''); this.style.display = "none"; }
    enable() { this.removeAttribute('disabled'); }
    disable() { this.setAttribute('disabled', ''); }
    addClass(className) { this.classList.add(className); }
    removeClass(className) { this.classList.remove(className); }
    toggleClass(className) { this.classList.toggle(className); }
    reset() { this.removeAttribute('style'); this.updateStyles(); }
}
