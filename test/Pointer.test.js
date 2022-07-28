import { expect } from 'chai';
import { Pointer } from '../src/pointer/Pointer.js';
import { NotableTourUtil } from "../src/NotableTourUtil.js";

describe('Pointer Tests', () => {
    it('Should Create a pointer', () => {
        let p = new Pointer();
        expect(p).to.be.an.instanceOf(Pointer);
        expect(p.util).to.be.an.instanceOf(NotableTourUtil);
    });

    it('Should set and get screen size', () => {
        let p = new Pointer();
        p.screenSize = 1234;
        expect(p.screenSize).to.equal(1234);
    });

    it('Should set and get zIndex', () => {
        let p = new Pointer();
        let val = 1234;
        p.zIndex = val;
        expect(p.zIndex).to.equal(val);
    });

    it('Should set and get class name', () => {
        let p = new Pointer();
        let className = "test-class";
        p.className = className;
        expect(p.className).to.equal(className);
    });

    it('Should set and get element', () => {
        let p = new Pointer();
        let e = {};
        p.element = e;
        expect(p.element).to.equal(e);
    });

    it('Should set and get quadrant', () => {
        let p = new Pointer();
        let val = 4;
        p.quadrant = val;
        expect(p.quadrant).to.equal(val);
    });

    it('Should set and get target', () => {
        let p = new Pointer();
        let val = ".className";
        p.target = val;
        expect(p.target).to.equal(val);
    });

    it('Should set and get util', () => {
        let p = new Pointer();
        let util = new NotableTourUtil();
        p.util = util;
        expect(p.util).to.equal(util);

    });





});