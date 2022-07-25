import { Pointer } from './Pointer.js';
import { NotableTourUtil } from "../NotableTourUtil";

export class Arrow extends Pointer {

    // TODO: The Util may belong in the superclass constructor
    constructor() {
        super();
    }


    /**
     * Builds a pointer
     */
    build() {
        let e = this.util.addDiv([this.className, `${this.className}-arrow-div`]);
        e.style.position = "absolute";

        let arrowHTML = `
            <div id="${this.className}-arrow-box" style="position: relative; z-index: ${this.zIndex}">
                <svg width="275" height="155" class="arrow_canvas">
                    <defs>
                        <marker id="arrowMarker" viewBox="0 0 36 21" refX="21" refY="10" markerUnits="strokeWidth" orient="auto" markerWidth="16" markerHeight="12">
                            <path class="${this.className}-arrow" d="M0,0 c30,11 30,9 0,20" id="${this.className}-arrow-head"></path>
                        </marker>
                    </defs>
                    <path class="${this.className} ${this.className}-arrow" marker-end="url(#arrowMarker)" d="M15,15 Q245,15 245,147" id="${this.className}-arrow-quadrant-3"></path>
                    <path class="${this.className} ${this.className}-arrow" marker-end="url(#arrowMarker)" d="M245,147 Q8,147 15,15" id="${this.className}-arrow-quadrant-1"></path>
                    <path class="${this.className} ${this.className}-arrow" marker-end="url(#arrowMarker)" d="M15,147 Q245,147 245,15" id="${this.className}-arrow-quadrant-2"></path>
                    <path class="${this.className} ${this.className}-arrow" marker-end="url(#arrowMarker)" d="M245,15 Q15,15 15,147" id="${this.className}-arrow-quadrant-4"></path>
                </svg>
            </div>
        `;

        e.insertAdjacentHTML('beforeend', arrowHTML);
        this.element = e;
        return this;
    }


    /**
     * Shows the pointer
     */
    show() {
        if (!this.util.isMobile) {
            document.getElementById(`${this.className}-arrow-quadrant-${this.quadrant}`).style.display = "block";
            document.getElementById(`${this.className}-arrow-head`).style.display = "block";
        }
        return this;
    }



    /**
     * Positions the pointer
     */
    position() {
        if (!this.util.isMobile) {
            this.positionByTarget(this.element);
        }
        return this;
    }

    positionByTarget(element, centered = true) {
        let box = this.target.getBoundingClientRect();
        let leftOffset = centered ? box.width / 2 : 0;
        let rightOffset = centered ? box.width / 2 : box.width;
        let arrowBox = element.getBoundingClientRect();
        switch(this.quadrant) {
            case 1:
                element.style.left = (box.left  + window.scrollX + leftOffset) + "px";
                element.style.top = (box.bottom + window.scrollY) + "px";
                break;
            case 2:
                // top should be bottom
                element.style.top = (box.bottom + window.scrollY) + "px";
                // right should be left of element
                element.style.right = (box.right - rightOffset + window.scrollX) + "px";
                break;
            case 3:
                // bottom should be top of element
                element.style.top = (box.top - arrowBox.height + window.scrollY) + "px";
                // right should be left of element
                element.style.right = (box.right - rightOffset  + window.scrollX) + "px";
                break;
            case 4:
                // bottom should be top of element
                element.style.top = (box.top - arrowBox.height + window.scrollY) + "px";
                // right should be right of element
                element.style.left = (box.left + leftOffset + window.scrollX) + "px";
                break;
        }
        return this;
    }
  

    /**
     * Positions a textbox
     * @param {HtmlElement} box 
     */
    positionText(textBox) {
        if (this.util.isMobile) {
            this.positionByTarget(textBox, false);
        } 
        else {
            let box = this.element.getBoundingClientRect();
            let tBox = textBox.getBoundingClientRect();
            switch(this.quadrant) {
                case 1:
                    textBox.style.left = box.right + "px";
                    textBox.style.top = (box.bottom + window.scrollY - (tBox.height / 2))  + "px";
                    break;
                case 2:
                    textBox.style.top = (box.bottom + window.scrollY - (tBox.height / 2)) + "px";
                    textBox.style.left = (window.scrollX + box.left - tBox.width) + "px";
                    textBox.style.textAlign = "right"
                    break;
                case 3:
                    textBox.style.top = (box.top - (tBox.height / 2) + window.scrollY) + "px";
                    textBox.style.left = (window.scrollX + box.left - tBox.width) + "px";
                    textBox.style.textAlign = "right"
                    break;
                case 4:
                    textBox.style.top = (box.top - (tBox.height / 2) + window.scrollY) + "px";
                    textBox.style.left = (box.right + window.scrollX) + "px";
                    break;
            }
        }
    }
}