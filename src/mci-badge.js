import { BaseElement } from "./base.js";

class MCIBadge extends BaseElement {
    constructor() {
        super();
        this.render();
    }

    _applystylesFromAttributes(){
        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    border: none;
                    outline: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px 10px;
                }
                p {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 16px;
                    text-align: center;
                    margin: 0;
                }
            </style>
            <div>
                <p>MCI Badge</p>
            </div>
        `;

        this.outerElement = this.shadowRoot.querySelector("div");
        this.textElement = this.shadowRoot.querySelector("p");
    }


}

customElements.define("mci-badge", MCIBadge);
