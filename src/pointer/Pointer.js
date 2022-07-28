import { NotableTourUtil } from "../NotableTourUtil.js";

export class Pointer {

    constructor(util = new NotableTourUtil()) {
        this.util = util;
    }

    get screenSize() {
        return this._screenSize;
    }

    set screenSize(screenSize) {
        this._screenSize = screenSize;
    }

    get zIndex() {
        return this._zIndex;
    }

    set zIndex(zIndex) {
        this._zIndex = zIndex;
    }

    set className(className) {
        this._className = className;
    }

    get className() {
        return this._className;
    }

    set element(element) {
        this._element = element;
    }

    get element() {
        return this._element;
    }

    set quadrant(quadrant) {
        this._quadrant = quadrant;
    }

    get quadrant() {
        return this._quadrant;
    }

    set target(target) {
        this._target = target;
    }

    get target() {
        return this._target;
    }

    get util() {
        return this._util;
    }

    set util(util) {
        this._util = util;
    }



}