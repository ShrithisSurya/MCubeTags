import { BaseElement } from "./base.js";

class ToggleButtonElement extends BaseElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
        this.label = this.shadowRoot.querySelector('.switch');
        this.slider = this.shadowRoot.querySelector('.slider');

        // Sync the initial state
        this.checkbox.checked = this.hasAttribute('active');
        this.updateStyles();
        
        // Toggle state on click
        this.checkbox.addEventListener('change', () => this.toggle());
    }

    static get observedAttributes() {
        return [...BaseElement.observedAttributes, 'active', 'bg-color', 'width', 'height'];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    toggle() {
        this.checkbox.checked ? this.setAttribute('active', true) : this.removeAttribute('active');
        this.updateStyles();
    }

    updateStyles() {
        if (!this.label || !this.slider) return;

        const activeColor = this.getAttribute('bg-color') || '#2196F3';
        const inactiveColor = '#ccc';
        const width = this.getAttribute('width') || '50px';
        const height = this.getAttribute('height') || '25px';
        const knobSize = `calc(${height} - 8px)`;
        const transformDistance = `calc(${width} - ${knobSize} - 8px)`;

        this.label.style.backgroundColor = this.checkbox.checked ? activeColor : inactiveColor;
        this.label.style.width = width;
        this.label.style.height = height;
        this.slider.style.transform = this.checkbox.checked ? `translateX(${transformDistance})` : 'translateX(0)';

    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .switch {
                    position: relative;
                    display: inline-block;
                    width: ${this.getAttribute("width") || "50px"};
                    height: ${this.getAttribute("height") || "25px"};
                    background-color: #ccc;
                    border-radius: 34px;
                    cursor: pointer;
                    transition: background 0.4s, width 0.2s, height 0.2s;
                }

                .switch input { 
                    display: none;
                }

                .slider {
                    position: absolute;
                    height: calc(${this.getAttribute("height") || "25px"} - 8px);
                    width: calc(${this.getAttribute("height") || "25px"} - 8px);
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    border-radius: 50%;
                    transition: transform 0.4s;
                }

                input:checked + .switch {
                    background-color: ${this.getAttribute("bg-color") || "#2196F3"};
                }

                input:checked + .switch .slider {
                    transform: translateX(calc(${this.getAttribute("width") || "50px"} - calc(${this.getAttribute("height") || "25px"} - 8px) - 8px));
                }
            </style>
            <label class="switch">
                <input type="checkbox">
                <span class="slider"></span>
            </label>
        `;
    }
}

customElements.define('mci-toggle-button', ToggleButtonElement);
