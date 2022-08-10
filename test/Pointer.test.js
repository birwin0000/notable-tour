import { expect } from 'chai';
import p from '../src/pointer/Pointer.js';
import util from "../src/NotableTourUtil.js";

describe('Pointer Tests', () => {
    it('Should Create a pointer', () => {
        p.util = util;
        expect(p).to.be.an.instanceOf(Object);
        expect(p.util).to.be.an.instanceOf(Object);
    });

    it('Should set and get screen size', () => {
        p.screenSize = 1234;
        expect(p.screenSize).to.equal(1234);
    });

    it('Should set and get zIndex', () => {
        let val = 1234;
        p.zIndex = val;
        expect(p.zIndex).to.equal(val);
    });

    it('Should set and get class name', () => {
        let className = "test-class";
        p.className = className;
        expect(p.className).to.equal(className);
    });

    it('Should set and get element', () => {
        let e = {};
        p.element = e;
        expect(p.element).to.equal(e);
    });

    it('Should set and get quadrant', () => {
        let val = 4;
        p.quadrant = val;
        expect(p.quadrant).to.equal(val);
    });

    it('Should set and get target', () => {
        let val = ".className";
        p.target = val;
        expect(p.target).to.equal(val);
    });

    it('Should set and get util', () => {
        p.util = util;
        expect(p.util).to.equal(util);

    });





});