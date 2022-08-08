export default class NotableTourUtil {

    /**
     * Finds the highest z-index component in the body of the document
     */
    get findHighestZ() {
        return [...document.querySelectorAll('body *')]
        .map(elt => parseFloat(window.getComputedStyle(elt).zIndex))
        .reduce((highest, z) => z > highest ? z : highest, 1);
    }


    /**
     * Gets Window Height and Width
     */
    get HW() {
        let body = document.body, html = document.documentElement;
        let height = Math.max( body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight );
        let width = Math.max(body.scrollWidth, body.offsetWidth,
            html.clientWidth, html.scrollWidth, html.offsetWidth);			
        return {height: height, width: width};
    }


    /**
     * Check if an element is out of the viewport
     * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
     * @param  {Node}  elem The element to check
     * @return {Object}     A set of booleans for each side of the element
     */
    isOutOfViewport(elem) {
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
     * Give the quadrant the highlighted element resides in
     * @param {component} element Element to find quadrant of 
     * @returns number indicating which quadrant of the screen
     * the component resides in 
     */
    getQuadrant(element) {
        if (!element) 
            return 0;
        let wind = this.HW;
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
     * Removes all Divs with a class name
     * @param {string} selector to remove
     */
    removeDivs(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.remove();
        });
    };


    addDiv(classNames) {
        let div = document.createElement("div");
        document.body.appendChild(div);
        classNames.forEach(className => div.classList.add(className));
        return div;
    }


    /**
     * Adds the four divs to the page based upon the config (Should we decouple this from the config?)
     * @param {int} width Width of the div
     * @param {int} height Height of the div 
     * @param {int} left Left position of the div
     * @param {int} top top of the div
     * @returns Component - The div created
     */
     addAbsoluteDiv(width, height, left, top, classNames, zIndex) {
        let div = this.addDiv(classNames);
        div.style.zIndex = zIndex;
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.left = left + "px";
        div.style.top = top + "px";
        div.style.position = "absolute";
        return div;
    };
    

    /**
     * Checks if device is Mobile
     *
     * @readonly
     * @memberof NotableTourUtil
     */
    get isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}