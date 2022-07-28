import { expect } from 'chai';
import { Arrow } from '../src/pointer/Arrow.js';
import pkg from 'jsdom';
const { JSDOM } = pkg;


describe('Pointer Tests', () => {
    it('Should create an Arrow', () => {
        let a = new Arrow();
        expect(a).to.be.an.instanceOf(Arrow);
    });

    it('Should Build', () => {
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;

        let a = new Arrow();
        a.className = 'test-class';
        a.zIndex = 1;
        let z = a.build();

        expect(z).to.equal(a);
        expect(z.element).to.be.an.instanceof(Object);
    
    });

    it('Should Show', () => {
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;

        global.navigator = {
            userAgent: 'chrome'
          };

        let a = new Arrow();
        a.className = 'test-class';
        a.zIndex = 1;
        a.quadrant = 3;
        let z = a.build();

        a.show();

        const domText = dom.serialize();
        expect(a.className).to.equal('test-class');
        expect(domText).to.contain(a.className);
        expect(domText).to.contain(a.className + '-arrow');

    });

    it('Should Position the Pointer in quad 1', () => {
        let a = new Arrow()
            // target is the element we are wanting to position by...
        a.target = {
            getBoundingClientRect : () => {
                return {
                    width: 100,
                    left: 0,
                    right: 100,
                    bottom: 100,
                    top: 100
                }
            }
        };
        a.className = "test-class";
        // Create the element we are going to position
        let element = {
            getBoundingClientRect: () => {
                return {
                    height: 100
                }
            },
            style: {}
        };
        a.element = element;
        a.quadrant = 1;
        // set the window scrolls
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;
        window.scrollX = 0;
        window.scrollY = 0;

        // Set the navigator
        global.navigator = {
            userAgent: 'chrome'
        };

        // This is the test...
        a.position();
        //console.log("REsult", a);
        
        expect(a.element.style.left).to.equal('50px');
        expect(a.element.style.top).to.equal('100px');

    });

    it('Should Position the Pointer in quad 2', () => {
        let a = new Arrow()
            // target is the element we are wanting to position by...
        a.target = {
            getBoundingClientRect : () => {
                return {
                    width: 100,
                    left: 0,
                    right: 100,
                    bottom: 100,
                    top: 100
                }
            }
        };
        a.className = "test-class";
        // Create the element we are going to position
        let element = {
            getBoundingClientRect: () => {
                return {
                    height: 100
                }
            },
            style: {}
        };
        a.element = element;
        a.quadrant = 2;
        // set the window scrolls
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;
        window.scrollX = 0;
        window.scrollY = 0;

        // Set the navigator
        global.navigator = {
            userAgent: 'chrome'
        };

        // This is the test...
        a.position();
        
        expect(a.element.style.right).to.equal('50px');
        expect(a.element.style.top).to.equal('100px');


    });

    it('Should Position the Pointer in quad 3', () => {
        let a = new Arrow()
            // target is the element we are wanting to position by...
        a.target = {
            getBoundingClientRect : () => {
                return {
                    width: 100,
                    left: 0,
                    right: 100,
                    bottom: 100,
                    top: 100
                }
            }
        };
        a.className = "test-class";
        // Create the element we are going to position
        let element = {
            getBoundingClientRect: () => {
                return {
                    height: 100
                }
            },
            style: {}
        };
        a.element = element;
        a.quadrant = 3;
        // set the window scrolls
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;
        window.scrollX = 0;
        window.scrollY = 0;

        // Set the navigator
        global.navigator = {
            userAgent: 'chrome'
        };

        // This is the test...
        a.position();
        
        expect(a.element.style.right).to.equal('50px');
        expect(a.element.style.top).to.equal('0px');


    });

    it('Should Position the Pointer in quad 4', () => {
        let a = new Arrow()
            // target is the element we are wanting to position by...
        a.target = {
            getBoundingClientRect : () => {
                return {
                    width: 100,
                    left: 0,
                    right: 100,
                    bottom: 100,
                    top: 100
                }
            }
        };
        a.className = "test-class";
        // Create the element we are going to position
        let element = {
            getBoundingClientRect: () => {
                return {
                    height: 100
                }
            },
            style: {}
        };
        a.element = element;
        a.quadrant = 4;
        // set the window scrolls
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;
        window.scrollX = 0;
        window.scrollY = 0;

        // Set the navigator
        global.navigator = {
            userAgent: 'chrome'
        };

        // This is the test...
        a.position();
        
        expect(a.element.style.left).to.equal('50px');
        expect(a.element.style.top).to.equal('0px');


    });


    it('Should Position Text by Pointer in quad 1', () => {
        let a = new Arrow()
            // target is the element we are wanting to position by...
        a.target = {
            getBoundingClientRect : () => {
                return {
                    width: 100,
                    left: 0,
                    right: 100,
                    bottom: 100,
                    top: 100
                }
            }
        };
        a.className = "test-class";
        // Create the element we are going to position
        let element = {
            getBoundingClientRect: () => {
                return {
                    height: 100,
                    right: 0,
                    bottom: 200,
                    left: 300
                }
            },
            style: {}
        };
        a.element = element;
        a.quadrant = 1;
        // set the window scrolls
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;
        window.scrollX = 0;
        window.scrollY = 0;

        // Set the navigator
        global.navigator = {
            userAgent: 'chrome'
        };

        let textBox = {
            getBoundingClientRect: () => {
                return {
                    height: 100,
                    width: 100
                }
            },
            style: {}
        };

        // This is the test...
        a.positionText(textBox);
        
        expect(textBox.style.left).to.equal('0px');
        expect(textBox.style.top).to.equal('150px');

    });

    it('Should Position Text by Pointer in quad 2', () => {
        let a = new Arrow()
            // target is the element we are wanting to position by...
        a.target = {
            getBoundingClientRect : () => {
                return {
                    width: 100,
                    left: 0,
                    right: 100,
                    bottom: 100,
                    top: 100
                }
            }
        };
        a.className = "test-class";
        // Create the element we are going to position
        let element = {
            getBoundingClientRect: () => {
                return {
                    height: 100,
                    right: 0,
                    bottom: 200,
                    left: 300
                }
            },
            style: {}
        };
        a.element = element;
        a.quadrant = 2;
        // set the window scrolls
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;
        window.scrollX = 0;
        window.scrollY = 0;

        // Set the navigator
        global.navigator = {
            userAgent: 'chrome'
        };

        let textBox = {
            getBoundingClientRect: () => {
                return {
                    height: 100,
                    width: 100
                }
            },
            style: {}
        };

        // This is the test...
        a.positionText(textBox);
        
        expect(textBox.style.left).to.equal('200px');
        expect(textBox.style.top).to.equal('150px');
        expect(textBox.style.textAlign).to.equal('right');

    });
    
    it('Should Position Text by Pointer in quad 3', () => {
        let a = new Arrow()
            // target is the element we are wanting to position by...
        a.target = {
            getBoundingClientRect : () => {
                return {
                    width: 100,
                    left: 0,
                    right: 100,
                    bottom: 100,
                    top: 100
                }
            }
        };
        a.className = "test-class";
        // Create the element we are going to position
        let element = {
            getBoundingClientRect: () => {
                return {
                    height: 100,
                    right: 0,
                    bottom: 200,
                    left: 300,
                    top: 0
                }
            },
            style: {}
        };
        a.element = element;
        a.quadrant = 3;
        // set the window scrolls
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;
        window.scrollX = 0;
        window.scrollY = 0;

        // Set the navigator
        global.navigator = {
            userAgent: 'chrome'
        };

        let textBox = {
            getBoundingClientRect: () => {
                return {
                    height: 100,
                    width: 100
                }
            },
            style: {}
        };

        // This is the test...
        a.positionText(textBox);
        
        expect(textBox.style.left).to.equal('200px');
        expect(textBox.style.top).to.equal('-50px');
        expect(textBox.style.textAlign).to.equal('right');
    });
    
    it('Should Position Text by Pointer in quad 4', () => {
        let a = new Arrow()
            // target is the element we are wanting to position by...
        a.target = {
            getBoundingClientRect : () => {
                return {
                    width: 100,
                    left: 0,
                    right: 100,
                    bottom: 100,
                    top: 100
                }
            }
        };
        a.className = "test-class";
        // Create the element we are going to position
        let element = {
            getBoundingClientRect: () => {
                return {
                    height: 100,
                    right: 0,
                    bottom: 200,
                    left: 300,
                    top: 100
                }
            },
            style: {}
        };
        a.element = element;
        a.quadrant = 4;
        // set the window scrolls
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;
        window.scrollX = 0;
        window.scrollY = 0;

        // Set the navigator
        global.navigator = {
            userAgent: 'chrome'
        };

        let textBox = {
            getBoundingClientRect: () => {
                return {
                    height: 100,
                    width: 100,
                    top: 0
                }
            },
            style: {}
        };

        // This is the test...
        a.positionText(textBox);

        expect(textBox.style.left).to.equal('0px');
        expect(textBox.style.top).to.equal('50px');

    });

    it('Should Position Text in Mobile', () => {
        let a = new Arrow()
            // target is the element we are wanting to position by...
        a.target = {
            getBoundingClientRect : () => {
                return {
                    width: 100,
                    left: 0,
                    right: 100,
                    bottom: 100,
                    top: 100
                }
            }
        };
        a.className = "test-class";
        // Create the element we are going to position
        let element = {
            getBoundingClientRect: () => {
                return {
                    height: 100,
                    right: 0,
                    bottom: 200,
                    left: 300,
                    top: 100
                }
            },
            style: {}
        };
        a.element = element;
        a.quadrant = 4;
        // set the window scrolls
        const dom = new JSDOM(`<!DOCTYPE><html><body></body></html>`);
        global.window = dom.window;
        global.document = dom.window.document;
        window.scrollX = 0;
        window.scrollY = 0;

        // Set the navigator
        global.navigator = {
            userAgent: 'iPhone'
        };

        let textBox = {
            getBoundingClientRect: () => {
                return {
                    height: 100,
                    width: 100,
                    top: 0
                }
            },
            style: {}
        };

        // This is the test...
        a.positionText(textBox);

        expect(textBox.style.left).to.equal('0px');
        expect(textBox.style.top).to.equal('0px');

    });


});