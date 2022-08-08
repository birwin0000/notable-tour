import Queue from './Queue.js';
import Arrow from './pointer/Arrow.js';
import NotableTourUtil from './NotableTourUtil.js';

import style from './style.css'; // assert { type: "css" };
import light from './theme/light.css';
import dark from './theme/dark.css';
import elegant from './theme/elegant.css';
import fantasy from './theme/fantasy.css';
import robot from './theme/robot.css';

export default class NotableTour {

    constructor(conf = {}, pointer = new Arrow(), queue = new Queue(), util = new NotableTourUtil()) {
        this.queue = queue;
        this.util = util;
        var config = {
            backgroundColor: 'black',
            color: '#ffffff',
            highestZ: 999,
            opacity: .8,
            className: 'notable-tour',
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

        this.pointer = pointer;
        pointer.zIndex = this.util.findHighestZ + 1;
        pointer.className = this.config.className;


        this.loadTheme();
    }


    /**
     * Loads the theme identified in the configuration object along with the base stylesheet
     */
    loadTheme() {
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
            case "elegant":
                ret = elegant;
                break;
            case "fantasy":
                ret = fantasy;
                break;
            case "robot":
                ret = robot;
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
     * TODO: I believe we can eliminate this function.
     * Encircles an element with divs at a higher z-index than any other component on the web page
     * @param {string} divName Name of component to encircle 
     * @param {object} config Configuration
     */
    /*
    encircle(divName) {
        let box = document.getElementById(divName);
        this.encircleComponent(box, this.config);
    };
    */

    /**
     * Encircles Component with divs
     * @param {HTMLElement} comp Component to encircle with dark background 
     */
    encircleComponent(comp) {
        this.util.removeDivs("." + this.config.className);
        let bounding = document.body.getBoundingClientRect();
        let height = Math.floor(bounding.height);
        let width = Math.floor(bounding.width);

        if (comp) {
            let info = comp.getBoundingClientRect();
            let zIndex = this.config.highestZ + 1;
            let rightDiv = this.util.addAbsoluteDiv(width - info.right, height, info.right + window.scrollX, 0, [this.config.className, `${this.config.className}-background`], zIndex);
            let leftDiv = this.util.addAbsoluteDiv(info.left + window.scrollX, height, 0, 0, [this.config.className, `${this.config.className}-background`], zIndex);
            let bottomDiv = this.util.addAbsoluteDiv(info.width, height - (info.bottom + window.scrollY), info.left + window.scrollX, info.bottom + window.scrollY, [this.config.className, `${this.config.className}-background`], zIndex);
            let topDiv =  this.util.addAbsoluteDiv(info.width, info.top + window.scrollY, info.left + window.scrollX, 0, [this.config.className, `${this.config.className}-background`], zIndex);
        }
        
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

            let textBox = this.buildTextBox(text);

            let quadrant = this.util.getQuadrant(e);
            this.pointer.quadrant = quadrant;
            this.pointer.target = e;
            this.pointer
                .build() // TODO: Should I have an "Add" function to add it to the document?
                .position()
                .show()
                .positionText(textBox);
            
            // TODO: This almost belongs somewhere else???
            let out = this.util.isOutOfViewport(textBox);
            if (out.any) {
                textBox.scrollIntoView();
                out = this.util.isOutOfViewport(textBox); // Gotta check again because I scrolled
                if (out.any) {
                    this.util.removeDivs(`.${this.config.className}-arrow-div`);
                    // this.pointer.position();
                    //this.positionArrow(quadrant, textBox, e);  // Why am I positioning the arrow here???
                    if (quadrant == (3 || 4)) {
                        textBox.scrollIntoView();
                    }    
                }
            }
        }
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
                this.util.removeDivs("." + this.config.className);
//                this.util.removeDivs(`.${this.config.className}-arrow-div`);
//                this.util.removeDivs(".textbox-div");
                this.clearInterval(interval);
            }
            else {
                delegate(array[i - 1]);
            }
            
        }, delay)
        return interval
    }



    /**
     * Builds a text box containing the text passed to it
     * @param {string} txt Text to include in the text box
     * @returns Text enclosed in a div tag
     */
    buildTextBox(txt) {
        let highestZ = this.util.findHighestZ;
        let e = document.createElement("div");
        document.body.appendChild(e);


        e.style.position = "absolute";
        e.style.zIndex = highestZ + 2; // TODO: Why 2? Also, should I ust find the highest z once and set it in the constructor?
        e.classList.add(this.config.className);
        //e.classList.add("textbox-div");
        e.classList.add(`${this.config.className}-text`);
        e.innerHTML = txt + "<br />";
        // e.style.color = this.config.color;
        e.style.display = "table-cell";
        e.style.verticalAlign = "middle";
        if (!this.queue.isEmpty) {
            let n = document.createElement("button");
            n.textContent = "Next";
            //this.config.buttons.next.classes.forEach(c => n.classList.add(c));
            n.classList.add(...this.config.buttons.next.classes);
            n.classList.add(...[`${this.config.className}-button`, `${this.config.className}-button-next`]);
            n.addEventListener('click', () => this.nextTour());
            e.appendChild(n);
        }

        if (!this.queue.isStart) {
            let n = document.createElement("button");
            n.textContent = "Prev";
            n.classList.add(...this.config.buttons.previous.classes);
            n.classList.add(...[`${this.config.className}-button`, `${this.config.className}-button-previous`]);
            n.addEventListener('click', () => this.prevTour());
            e.appendChild(n);
        }
        let q = document.createElement("button");
        q.textContent = this.queue.isEmpty ? "End" : "Exit";
        q.classList.add(...this.config.buttons.end.classes);
        q.classList.add(...[`${this.config.className}-button`, `${this.config.className}-button-end`]);
        q.addEventListener('click', () => {
            this.util.removeDivs("." + this.config.className);
            this.tourRunning = false;
        });
        e.appendChild(q);
        return e;
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
        // This allows the tour to be overridden
        if (this.config.tour) {
            this.config.tour.forEach(t => {
                let component = document.getElementById(t.id);
                component.setAttribute("data-tour", t.text);
                components.push(component);
            });
            
        } else {
            // TODO - data-tour name should be configurable.
            components = document.querySelectorAll('[data-tour]');
        }
        components.forEach(c => this.queue.enqueue(c));
    };


    start() {
        this.initTour();
        this.nextTour();
        this.tourRunning = true;
    };

}



