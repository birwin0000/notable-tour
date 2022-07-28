import { expect, assert } from 'chai';
import { NotableTourUtil } from "../src/NotableTourUtil.js";
import pkg from 'jsdom';
const { JSDOM } = pkg;

describe('Notable Tour Util - Is Mobile', () => {

    it('Should detect Chrome browser is not mobile', () => {
        let util = new NotableTourUtil();
        global.navigator = {
            userAgent: 'chrome'
          };
        expect(util).to.be.a('object');
        assert.equal(util.isMobile, false);
    });


    it('Should detect iPhone browser is mobile', () => {
        let util = new NotableTourUtil();
        global.navigator = {
            userAgent: 'iPhone'
          };
        expect(util).to.be.a('object');
        assert.equal(util.isMobile, true);
    });


});


describe('Notable Tour Util - Add Absolute Div', () => {
  it ('Should add div with absolute position', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;
  
    let util = new NotableTourUtil();
    // width, height, left, top, classNames, zIndex
    let div = util.addAbsoluteDiv(200, 100, 10, 5, ['test', 'test2'], 53);
    let divsCount = dom.window.document.querySelectorAll("div").length;
    expect(divsCount).to.equal(1);
    expect(div.style.zIndex).to.equal('53');
    expect(div.style.width).to.equal('200px');
    expect(div.style.height).to.equal('100px');
    expect(div.style.left).to.equal('10px');
    expect(div.style.top).to.equal('5px');
    expect(div.style.position).to.equal("absolute");
  });

});


describe('Notable Tour Util - Add Div', () => {
  it ('Should add Div with no classes', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;
  
    let util = new NotableTourUtil();
    util.addDiv([]);
    let finalCount = dom.window.document.querySelectorAll("div").length;
    expect(finalCount).to.equal(1);  
  });

  it('Should add Div with 1 class', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;
  
    let util = new NotableTourUtil();
    util.addDiv(['test']);
    let finalCount = dom.window.document.querySelectorAll(".test").length;
    expect(finalCount).to.equal(1);
  });

  it('Should add Div with multiple class', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;
  
    let util = new NotableTourUtil();
    util.addDiv(['test', 'test2']);
    let count1 = dom.window.document.querySelectorAll(".test").length;
    let count2 = dom.window.document.querySelectorAll(".test2").length;
    let count3 = dom.window.document.querySelectorAll(".test3").length;
    expect(count1).to.equal(1);
    expect(count2).to.equal(1);
    expect(count3).to.equal(0);
  });
  

});


describe('Notable Tour Util - Remove Divs', () => {

  it ('Should remove 1 Div', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div class='test-class'></div><div></div><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;
  
    let util = new NotableTourUtil();
    util.removeDivs(".test-class");
    let finalCount = dom.window.document.querySelectorAll("div").length;
    expect(finalCount).to.equal(2);  
  });

  it ('Should remove 2 Divs', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div class='test-class'></div><div class='test-class'></div><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;
  
    let util = new NotableTourUtil();
    util.removeDivs(".test-class");
    let finalCount = dom.window.document.querySelectorAll("div").length;
    expect(finalCount).to.equal(1);  
  });

  it ('Should remove all Divs', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div class='test-class'></div><div class='test-class'></div><div class='test-class'></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;
  
    let util = new NotableTourUtil();
    util.removeDivs(".test-class");
    let finalCount = dom.window.document.querySelectorAll("div").length;
    expect(finalCount).to.equal(0);  
  });

});


describe('Notable Tour Util - Get Quadrant', () => {
  it('Should detect Quadrant 1', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;


    Object.defineProperty(document.body, 'scrollHeight', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'offsetHeight', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 400, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetHeight', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'scrollWidth', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'offsetWidth', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 400, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollWidth', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetWidth', {value: 0, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 0, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 0, writeable: true});
    Object.defineProperty(window, "scrollX", {value: 0, writeable: true});
    Object.defineProperty(window, "scrollY", {value: 0, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = {
      getBoundingClientRect : () => {
        return {
          top: 0,
          left: 0,
          height: 300,
          width: 300
        }
      }
    }
    let util = new NotableTourUtil();
    var quadrant = util.getQuadrant(elem);
    expect(quadrant).to.equal(1);
  });

  it('Should detect Quadrant 2', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;


    Object.defineProperty(document.body, 'scrollHeight', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'offsetHeight', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 400, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetHeight', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'scrollWidth', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'offsetWidth', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 400, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollWidth', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetWidth', {value: 0, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 0, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 0, writeable: true});
    Object.defineProperty(window, "scrollX", {value: 0, writeable: true});
    Object.defineProperty(window, "scrollY", {value: 0, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = {
      getBoundingClientRect : () => {
        return {
          top: 0,
          left: 100,
          height: 300,
          width: 300
        }
      }
    }
    let util = new NotableTourUtil();
    var quadrant = util.getQuadrant(elem);
    expect(quadrant).to.equal(2);
  });

  it('Should detect Quadrant 3', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;


    Object.defineProperty(document.body, 'scrollHeight', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'offsetHeight', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 400, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetHeight', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'scrollWidth', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'offsetWidth', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 400, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollWidth', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetWidth', {value: 0, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 0, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 0, writeable: true});
    Object.defineProperty(window, "scrollX", {value: 0, writeable: true});
    Object.defineProperty(window, "scrollY", {value: 0, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = {
      getBoundingClientRect : () => {
        return {
          top: 100,
          left: 90,
          height: 300,
          width: 300
        }
      }
    }
    let util = new NotableTourUtil();
    var quadrant = util.getQuadrant(elem);
    expect(quadrant).to.equal(3);
  });

  it('Should detect Quadrant 4', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;


    Object.defineProperty(document.body, 'scrollHeight', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'offsetHeight', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 400, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetHeight', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'scrollWidth', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'offsetWidth', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 400, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollWidth', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetWidth', {value: 0, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 0, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 0, writeable: true});
    Object.defineProperty(window, "scrollX", {value: 0, writeable: true});
    Object.defineProperty(window, "scrollY", {value: 0, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = {
      getBoundingClientRect : () => {
        return {
          top: 100,
          left: 10,
          height: 300,
          width: 300
        }
      }
    }
    let util = new NotableTourUtil();
    var quadrant = util.getQuadrant(elem);
    expect(quadrant).to.equal(4);
  });

  it('Should detect no element', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;


    Object.defineProperty(document.body, 'scrollHeight', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'offsetHeight', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 400, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetHeight', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'scrollWidth', {value: 0, writeable: true});
    Object.defineProperty(document.body, 'offsetWidth', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 400, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollWidth', {value: 0, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetWidth', {value: 0, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 0, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 0, writeable: true});
    Object.defineProperty(window, "scrollX", {value: 0, writeable: true});
    Object.defineProperty(window, "scrollY", {value: 0, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = undefined;
    let util = new NotableTourUtil();
    var quadrant = util.getQuadrant(elem);
    expect(quadrant).to.equal(0);

  });


});


describe('Notable Tour Util - Is Out of Viewport', () => {

  it('Should detect when component is off screen Bottom', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    Object.defineProperty(document.documentElement, 'clientHeight', {value: 500, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 400, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 1, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 1, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = {
      getBoundingClientRect : () => {
        return {
          top: 0,
          bottom: 501,
          left: 0,
          right: 10
        }
      }
    }
    let util = new NotableTourUtil();
    var out = util.isOutOfViewport(elem);
    expect(out.bottom).to.equal(true);
    expect(out.any).to.equal(true);
    expect(out.all).to.equal(false);
  });


  it('Should detect when component is off screen Top', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    document.documentElement.clientHeight
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 500, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 400, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 0, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 0, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = {
      getBoundingClientRect : () => {
        return {
          top: -1,
          bottom: 10,
          left: 0,
          right: 10
        }
      }
    }
    let util = new NotableTourUtil();
    var out = util.isOutOfViewport(elem);
    expect(out.bottom).to.equal(false);
    expect(out.top).to.equal(true);
    expect(out.left).to.equal(false);
    expect(out.right).to.equal(false);
    expect(out.any).to.equal(true);
    expect(out.all).to.equal(false);
  });


  it('Should detect when component is off screen Left', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    Object.defineProperty(document.documentElement, 'clientHeight', {value: 500, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 400, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 500, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 500, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = {
      getBoundingClientRect : () => {
        return {
          top: 0,
          bottom: 10,
          left: -1,
          right: 10
        }
      }
    }
    let util = new NotableTourUtil();
    var out = util.isOutOfViewport(elem);
    expect(out.bottom).to.equal(false);
    expect(out.top).to.equal(false);
    expect(out.left).to.equal(true);
    expect(out.right).to.equal(false);
    expect(out.any).to.equal(true);
    expect(out.all).to.equal(false);
  });



  it('Should detect when component is off screen Right', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    Object.defineProperty(document.documentElement, 'clientHeight', {value: 500, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 400, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 500, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 500, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = {
      getBoundingClientRect : () => {
        return {
          top: 0,
          bottom: 10,
          left: 0,
          right: 501
        }
      }
    }
    let util = new NotableTourUtil();
    var out = util.isOutOfViewport(elem);
    expect(out.bottom).to.equal(false);
    expect(out.top).to.equal(false);
    expect(out.left).to.equal(false);
    expect(out.right).to.equal(true);
    expect(out.any).to.equal(true);
    expect(out.all).to.equal(false);
  });


  it('Should detect when component is not off screen', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    Object.defineProperty(document.documentElement, 'clientHeight', {value: 500, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 400, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 500, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 500, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = {
      getBoundingClientRect : () => {
        return {
          top: 0,
          bottom: 10,
          left: 0,
          right: 10
        }
      }
    }
    let util = new NotableTourUtil();
    var out = util.isOutOfViewport(elem);
    expect(out.bottom).to.equal(false);
    expect(out.top).to.equal(false);
    expect(out.left).to.equal(false);
    expect(out.right).to.equal(false);
    expect(out.any).to.equal(false);
    expect(out.all).to.equal(false);
  });

  it('Should detect all out of viewport', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    Object.defineProperty(document.documentElement, 'clientHeight', {value: 10, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 10, writeable: true});
    Object.defineProperty(window, "innerHeight", {value: 10, writeable: true});
    Object.defineProperty(window, "innerWidth", {value: 10, writeable: true});

    // OK... Build a component and pass it to the function...
    var elem = {
      getBoundingClientRect : () => {
        return {
          top: -1,
          bottom: 11,
          left: -1,
          right: 11
        }
      }
    }
    let util = new NotableTourUtil();
    var out = util.isOutOfViewport(elem);
    expect(out.bottom).to.equal(true);
    expect(out.top).to.equal(true);
    expect(out.left).to.equal(true);
    expect(out.right).to.equal(true);
    expect(out.any).to.equal(true);
    expect(out.all).to.equal(true);
  });

});


describe('Notable Tour Util - Get Height and Width', () => {

  it('Should detect Height and Width of Browser scrollHeight and scrollWidth', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    Object.defineProperty(document.body, 'scrollHeight', {value: 500, writeable: true});
    Object.defineProperty(document.body, 'offsetHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetHeight', {value: 499, writeable: true});
    
    Object.defineProperty(document.body, 'scrollWidth', {value: 400, writeable: true});
    Object.defineProperty(document.body, 'offsetWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetWidth', {value: 399, writeable: true});

    let util = new NotableTourUtil();
    let z = util.HW
    expect(z.height).to.equal(500);
    expect(z.width).to.equal(400);
  });

  it('Should detect Height and Width of Browser offsetHeight and offsetWidth', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    Object.defineProperty(document.body, 'scrollHeight', {value: 500, writeable: true});
    Object.defineProperty(document.body, 'offsetHeight', {value: 532, writeable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetHeight', {value: 499, writeable: true});
    
    Object.defineProperty(document.body, 'scrollWidth', {value: 400, writeable: true});
    Object.defineProperty(document.body, 'offsetWidth', {value: 432, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetWidth', {value: 399, writeable: true});

    let util = new NotableTourUtil();
    let z = util.HW
    expect(z.height).to.equal(532);
    expect(z.width).to.equal(432);
  });


  it('Should detect Height and Width of Element clientHeight and clientWidth', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    Object.defineProperty(document.body, 'scrollHeight', {value: 500, writeable: true});
    Object.defineProperty(document.body, 'offsetHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 501, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetHeight', {value: 499, writeable: true});
    
    Object.defineProperty(document.body, 'scrollWidth', {value: 400, writeable: true});
    Object.defineProperty(document.body, 'offsetWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 401, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetWidth', {value: 399, writeable: true});

    let util = new NotableTourUtil();
    let z = util.HW
    expect(z.height).to.equal(501);
    expect(z.width).to.equal(401);
  });


  it('Should detect Height and Width of Element scrollHeight and scrollWidth', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    Object.defineProperty(document.body, 'scrollHeight', {value: 500, writeable: true});
    Object.defineProperty(document.body, 'offsetHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 599, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetHeight', {value: 499, writeable: true});
    
    Object.defineProperty(document.body, 'scrollWidth', {value: 400, writeable: true});
    Object.defineProperty(document.body, 'offsetWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollWidth', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetWidth', {value: 399, writeable: true});

    let util = new NotableTourUtil();
    let z = util.HW
    expect(z.height).to.equal(599);
    expect(z.width).to.equal(499);
  });


  it('Should detect Height and Width of Element offsetHeight and offsetWidth', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;

    Object.defineProperty(document.body, 'scrollHeight', {value: 500, writeable: true});
    Object.defineProperty(document.body, 'offsetHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'clientHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollHeight', {value: 499, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetHeight', {value: 999, writeable: true});
    
    Object.defineProperty(document.body, 'scrollWidth', {value: 400, writeable: true});
    Object.defineProperty(document.body, 'offsetWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'clientWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'scrollWidth', {value: 399, writeable: true});
    Object.defineProperty(document.documentElement, 'offsetWidth', {value: 899, writeable: true});

    let util = new NotableTourUtil();
    let z = util.HW
    expect(z.height).to.equal(999);
    expect(z.width).to.equal(899);
  });

});


describe('Notable Tour Util - Find Highest Z', () => {
  
  it('Should find z-index of one component', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div style='z-index: 5;'></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;
    let util = new NotableTourUtil();
    let z = util.findHighestZ;
    expect(z).to.equal(5);
  });

  it('Should find highest z-index of multiple components', () => {
    const dom = new JSDOM(`<!DOCTYPE><html><body><div></div><div style='z-index: 5;'></div><div style='z-index: 50;'></div><div style='z-index: 25;'></div></body></html>`);
    global.window = dom.window;
    global.document = dom.window.document;
    let util = new NotableTourUtil();
    let z = util.findHighestZ;
    expect(z).to.equal(50);
  });


});