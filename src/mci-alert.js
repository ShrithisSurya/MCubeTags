import { BaseElement } from "./base.js";

class MCIAlert extends BaseElement {
    constructor() {
        super();
        this.render();
    }

    static get observedAttributes() {
        return ['value']; // No need to re-add 'status'
    }
    
    _updateAttributes(){
        if(this.hasAttribute("value")){
            let value=this.getAttribute("value");
            this.textElement.textContent=value
        }
    }
    _applystylesFromAttributes() {
        if (this.hasAttribute("height")) {
            let height = this.getAttribute("height");
            this.outerElement.style.height = height
        }
        if (this.hasAttribute("padding")) {
            let padding = this.getAttribute("padding");
            this.outerElement.style.padding = padding
        }
        if (this.hasAttribute("border-radius")) {
            let border_radius = this.getAttribute("border-radius")
            this.outerElement.style.borderRadius = border_radius
        }
        if (this.hasAttribute("text-color")) {
            let text_color = this.getAttribute("text-color");
            this.textElement.style.color = text_color
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "value") {
            this.textElement.textContent = newValue;
        }
        this._updateAttributes()
        this._applystylesFromAttributes()

    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                div {
                     display: flex;
                     align-items: center; /* Ensures vertical alignment */
                     justify-content: space-between;
                     border-radius: inherit;
                     box-sizing: border-box; /* Prevents content overflow */
                }
                
                p {
                     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                     font-size: 16px;
                     margin: 0;
                     flex-grow: 1;
                     display: flex;
                     align-items: center; /* Ensures text aligns properly */
                }
                
                button {
                        background: none;
                        border: none;
                        font-size: 18px; /* Make button size slightly larger */
                        cursor: pointer;
                        padding: 4px;
                        display: flex;
                        align-items: center; /* Ensures close button is centered */
                        justify-content: center;
                } 
            </style>
            <div>
                <p></p>
                <button>&times;</button>
            </div>
        `;

        this.outerElement = this.shadowRoot.querySelector("div");
        this.textElement = this.shadowRoot.querySelector("p");
        this.closeButton = this.shadowRoot.querySelector("button");

        this.closeButton.addEventListener("click", () => this.hide());
    }
}
customElements.define('mci-alert', MCIAlert);
