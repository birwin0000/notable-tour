import {Queue} from './Queue.js';

// Themes
import style from './style.css';
import light from './theme/light.css';
import dark from './theme/dark.css';

export class NotableTour {

    constructor(conf = {}, queue = new Queue()) {
        this.queue = queue;
        let config = {
            backgroundColor: 'black',
            color: '#ffffff',
            highestZ: 999,
            opacity: .8,
            className: 'notable-div-dyn',
            buttons: {
                next: {
                    classes: ["btn", "btn-primary"]
                },
                previous: {
                    classes: ["btn", "btn-primary"]
                },
                end: {
                    classes: ["btn", "btn-primary"]
                },
            },
            theme : 'light'
        };
        this.config = {...config, ...conf};
        var theme = this.getTheme(this.config.theme)
        var sheet = new CSSStyleSheet();
        sheet.replace(theme);
        var baseSheet = new CSSStyleSheet();
        baseSheet.replace(style);
        document.adoptedStyleSheets = [baseSheet, sheet];
    }

    // TODO: Get this theme loader to be more dynamic
    getTheme(theme = 'light') {
        //return await import(theme ? `./theme/${theme}.css` : './theme/light.css');
        var ret = light;
        switch(theme) {
            case "dark":
                ret = dark;
                break;
        }
        return ret;
    }

    /**
     * Displays the next tour item
     */
    nextTour() {
        let e = this.queue.dequeue();
        this.doTour(e, e.dataset.tour);
    };

    /**
     * Displays previous tour item
     */
    prevTour() {
        let e = this.queue.prequeue();
        this.doTour(e, e.dataset.tour);
    };

    /**
     * Re-does the current tour element
     */
    currTour() {
        let e = this.queue.curqueue();
        this.doTour(e, e.dataset.tour);
    };


    /**
     * Finds the highest z-index component in the body of the document
     */
     get findHighestZ() {
        return [...document.querySelectorAll('body *')]
        .map(elt => parseFloat(getComputedStyle(elt).zIndex))
        .reduce((highest, z) => z > highest ? z : highest, 1);
    }


    /**
     * Adds the four divs to the page based upon the config (Should we decouple this from the config?)
     * @param {int} width Width of the div
     * @param {int} height Height of the div 
     * @param {int} left Left position of the div
     * @param {int} top top of the div
     * @returns Component - The div created
     */
    addDiv(width, height, left, top) {
        let div = document.createElement("div");
        document.body.appendChild(div);

        div.style.backgroundColor = this.config.backgroundColor;
        div.style.zIndex = this.config.highestZ + 1;
        
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.left = left + "px";
        div.style.top = top + "px";
        
        div.style.position = "absolute";
        div.style.opacity = this.config.opacity;
        div.classList.add(this.config.className);
        
        return div;
    };


    /**
     * Removes all Divs with a class name
     * @param {string} className name to remove
     */
    removeDivs(className) {
        const boxes = document.querySelectorAll('.' + className);
        boxes.forEach(box => {
            box.remove();
        });
    };

    /**
     * Removes all components used in the tour step
     */
    clear() {
        this.removeDivs(this.config.className);
        this.removeDivs("arrow-div");
        this.removeDivs("textbox-div");
    };


    /**
     * TODO: I believe we can eliminate this function.
     * Encircles an element with divs at a higher z-index than any other component on the web page
     * @param {string} divName Name of component to encircle 
     * @param {object} config Configuration
     */
    encircle(divName) {
        let box = document.getElementById(divName);
        this.encircleComponent(box, this.config);
    };

    /**
     * Encircles Component with divs
     * @param {HTMLElement} comp Component to encircle with dark background 
     */
    encircleComponent(comp) {
        this.clear();

        let body = document.body, html = document.documentElement;
        let height = Math.max( body.scrollHeight, body.offsetHeight, 
                html.clientHeight, html.scrollHeight, html.offsetHeight );
        let width = Math.max(body.scrollWidth, body.offsetWidth,
                html.clientWidth, html.scrollWidth, html.offsetWidth);

        let highestZ = this.findHighestZ;
        // let box = document.getElementById(divName);
        if (comp) {
            let info = comp.getBoundingClientRect();
            let rightDiv = this.addDiv(width - info.right, height, info.right + window.scrollX, 0);
            let leftDiv = this.addDiv(info.left + window.scrollX, height, 0, 0);
            let bottomDiv = this.addDiv(info.width, height - (info.bottom + window.scrollY), info.left + window.scrollX, info.bottom + window.scrollY);
            let topDiv =  this.addDiv(info.width, info.top + window.scrollY, info.left + window.scrollX, 0);
        }
    }


    /**
     * Gets Window Height and Width
     */
    getHW() {
        let body = document.body, html = document.documentElement;
        let height = Math.max( body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight );
        let width = Math.max(body.scrollWidth, body.offsetWidth,
            html.clientWidth, html.scrollWidth, html.offsetWidth);			
        return {height: height, width: width};
    }


    /**
     * Tours the element with the string
     * @param {Element} e 
     * @param {string} text 
     */
    doTour(e, text) {
        if (!e instanceof Element) {
            console.log("Not an Element?", e);
            e = document.getElementById(e);
        }
        if (e) {
            e.scrollIntoView();
            this.encircleComponent(e);
            let quadrant = this.getQuadrant(e);
            let arrow = this.buildArrow(e);
            document.getElementById("notabletour-arrow-quadrant-" + quadrant).style.display = "block";
            document.getElementById("notabletour-arrow-head").style.display = "block";
            this.positionArrow(quadrant, arrow, e);
            let textBox = this.buildTextBox(text);
            this.positionTextBox(quadrant, textBox, arrow);
            let out = this.isOutOfViewport(textBox);
            if (out.any) {
                textBox.scrollIntoView();
                out = this.isOutOfViewport(textBox);
                if (out.any) {
                    this.removeDivs("arrow-div");
                    this.positionArrow(quadrant, textBox, e);
                    if (quadrant == (3 || 4)) {
                        textBox.scrollIntoView();
                    }    
                }
            }
        }
    };


    /**
     * Give the quadrant the highlighted element resides in
     * @param {component} element Element to find quadrant of 
     * @returns number indicating which quadrant of the screen
     * the component resides in 
     */
    getQuadrant(element) {
        if (!element) 
            return 0;
        let wind = this.getHW();
        let box = element.getBoundingClientRect();
        let windowVCenter = wind.height / 2;
        let windowHCenter = wind.width / 2;
        let boxHCenter = box.width / 2 + box.left + window.scrollX;
        let boxVCenter = box.height / 2 + box.top + window.scrollY;
        return boxVCenter < windowVCenter ?
            (boxHCenter < windowHCenter ? 1 : 2) :
            (boxHCenter < windowHCenter ? 4 : 3);
    }


    /**
     * Check if an element is out of the viewport
     * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
     * @param  {Node}  elem The element to check
     * @return {Object}     A set of booleans for each side of the element
     */
    isOutOfViewport (elem) {

        // Get element's bounding
        var bounding = elem.getBoundingClientRect();

        // Check if it's out of the viewport on each side
        var out = {};
        out.top = bounding.top < 0;
        out.left = bounding.left < 0;
        out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
        out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
        out.any = out.top || out.left || out.bottom || out.right;
        out.all = out.top && out.left && out.bottom && out.right;
        return out;
    };


    /**
     * Launches auto help
     * TODO: This can be removed eventually, but I would like to use the code for the auto tour.
     * @param {Array} array Set of components to tour 
     * @param {function} delegate Function to execute on each interval 
     * @param {int} delay Delay time 
     * @returns 
     */
    ArrayPlusDelay(array, delegate, delay) {
        var i = 0;
        var interval = setInterval(function() {
            if (i++ >= array.length) {
                this.removeDivs(this.config.className);
                this.removeDivs("arrow-div");
                this.removeDivs("textbox-div");
                this.clearInterval(interval);
            }
            else {
                delegate(array[i - 1]);
            }
            
        }, delay)
        return interval
    }


    /**
     * Builds Arrow
     */
    buildArrow() {
        let highestZ = this.findHighestZ;
        let e = document.createElement("div");
        document.body.appendChild(e);	
        e.style.position = "absolute";
        e.style.color = this.config.color;

        let arrowHTML = `
            <div id="arrow-box" style="position: relative; z-index: ${highestZ + 2}">
                <svg width="275" height="155" class="arrow_canvas">
                    <defs>
                        <marker id="arrowMarker" viewBox="0 0 36 21" refX="21" refY="10" markerUnits="strokeWidth" orient="auto" markerWidth="16" markerHeight="12">
                            <path class="notabletour-arrow" d="M0,0 c30,11 30,9 0,20" id="notabletour-arrow-head"></path>
                        </marker>
                    </defs>
                    <path class="notabletour-arrow" marker-end="url(#arrowMarker)" d="M15,15 Q245,15 245,147" id="notabletour-arrow-quadrant-3"></path>
                    <path class="notabletour-arrow" marker-end="url(#arrowMarker)" d="M245,147 Q8,147 15,15" id="notabletour-arrow-quadrant-1"></path>
                    <path class="notabletour-arrow" marker-end="url(#arrowMarker)" d="M15,147 Q245,147 245,15" id="notabletour-arrow-quadrant-2"></path>
                    <path class="notabletour-arrow" marker-end="url(#arrowMarker)" d="M245,15 Q15,15 15,147" id="notabletour-arrow-quadrant-4"></path>
                </svg>
            </div>
        `;

        e.insertAdjacentHTML('beforeend', arrowHTML);
        e.classList.add("arrow-div");
        return e;
    };

    /**
     * Positions the arrow component 
     * @param {int} quadrant Which section of the screen to place the arrow
     * @param {HTMLElement} arrow The arrow component 
     * @param {HTMLElement} element The element the arrow is pointing to 
     */
    positionArrow(quadrant, arrow, element) {
        let box = element.getBoundingClientRect();
        let arrowBox = arrow.getBoundingClientRect();
        switch(quadrant) {
            case 1:
                arrow.style.left = (box.left  + window.scrollX + (box.width / 2)) + "px";
                arrow.style.top = (box.bottom + window.scrollY) + "px";
                break;
            case 2:
                // top should be bottom
                arrow.style.top = (box.bottom + window.scrollY) + "px";
                // right should be left of element
                arrow.style.right = (box.right - (box.width / 2) + window.scrollX) + "px";
                break;
            case 3:
                // bottom should be top of element
                arrow.style.top = (box.top - arrowBox.height + window.scrollY) + "px";
                // right should be left of element
                arrow.style.right = (box.right - (box.width / 2)  + window.scrollX) + "px";
                break;
            case 4:
                // bottom should be top of element
                arrow.style.top = (box.top - arrowBox.height + window.scrollY) + "px";
                // right should be right of element
                arrow.style.left = (box.left + (box.width / 2) + window.scrollX) + "px";
                break;
        }
    };


    /**
     * Builds a text box containing the text passed to it
     * @param {string} txt Text to include in the text box
     * @returns Text enclosed in a div tag
     */
    buildTextBox(txt) {
        let highestZ = this.findHighestZ;
        let e = document.createElement("div");
        document.body.appendChild(e);


        e.style.position = "absolute";
        e.style.zIndex = highestZ + 2;
        e.classList.add("textbox-div");
        e.classList.add("notable-text");
        e.innerHTML = txt + "<br />";
        // e.style.color = this.config.color;
        e.style.display = "table-cell";
        e.style.verticalAlign = "middle";
        if (!this.queue.isEmpty) {
            let n = document.createElement("button");
            n.textContent = "Next";
            this.config.buttons.next.classes.forEach(c => n.classList.add(c));
            n.classList.add(...this.config.buttons.next.classes);
            n.addEventListener('click', () => this.nextTour());
            e.appendChild(n);
        }

        if (!this.queue.isStart) {
            let n = document.createElement("button");
            n.textContent = "Prev";
            n.classList.add(...this.config.buttons.previous.classes);
            n.addEventListener('click', () => this.prevTour());
            e.appendChild(n);
        }
        let q = document.createElement("button");
        q.textContent = this.queue.isEmpty ? "End" : "Exit";
        q.classList.add(...this.config.buttons.end.classes)
        q.addEventListener('click', () => {
            this.clear();
            this.tourRunning = false;
        });
        e.appendChild(q);
        return e;
    };


    /**
     * Positions text box relative to the arrow
     * 
     * @param {int} quadrant One of four quadrants on the screen starting with 1 in upper-left
     * side of the screen and rotating clockwise until the lower-left side of the screen is 4
     * @param {HTMLElement} textBox The text box to position
     * @param {HTMLElement} arrow The arrow relating to the text box
     */
    positionTextBox(quadrant, textBox, arrow) {
        let box = arrow.getBoundingClientRect();
        let tBox = textBox.getBoundingClientRect();
        switch(quadrant) {
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

    };


    /*
    window.addEventListener('resize', () => {
        if (tourRunning) 
            currTour();
        }
    );
    */

    /*
    var inter = ArrayPlusDelay([ {id: 'test1', text: 'blah\nblahblah\nBlah again!!!'}, {id: 'test2', text: 'Blah 2\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line'},{id : 'test3', text: 'Blah 3\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line'}, {id: "test4", text: 'Blah 4\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line\nAnother Line\nAnotherLine\nAnotherLine\nAnother Line'}], function(obj) {doHelpWithID(obj, config)},5000);
    */

    /**
     * Initializes Tour
     * @param {object} conf Configuration to override default config
     */
    initTour() {
        // this.queue = new Queue();
        let components = [];
        if (this.config.tour) {
            this.config.tour.forEach(t => {
                let component = document.getElementById(t.id);
                component.setAttribute("data-tour", t.text);
                components.push(component);
            });
            
        } else {
            components = document.querySelectorAll('[data-tour]');
        }
        components.forEach(c => this.queue.enqueue(c));
    };


    start(conf = {}) {
        this.initTour(conf);
        this.nextTour();
        this.tourRunning = true;
    };

}
