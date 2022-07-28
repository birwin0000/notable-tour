import { expect } from 'chai';
import { Queue } from '../src/Queue.js';

describe('Queue Tests', () => {
    it('Creates a queue with an empty elements object', () => {
        let q = new Queue();
        expect(q.elements).to.be.empty;
        expect(q.isEmpty).to.equal(true);
    });

    it('Enqueues and object', () => {
        let q = new Queue();
        q.enqueue({})
        expect(q).to.have.lengthOf(1);
        expect(q.isEmpty).to.equal(false);
        expect(q.isStart).to.equal(false);
    });

    it('Enqueues several objects', () => {
        let q = new Queue();
        let amt = 5;
        for(let i = 0; i < amt; i++) {
            q.enqueue({})
        }
        expect(q).to.have.lengthOf(amt);
    });

    it ('Dequeues several objects', () => {
        let q = new Queue();
        let queues = 5;
        let dequeues = 3;
        for(let i = 0; i < queues; i++) {
            q.enqueue({});
        }
        for(let i = 0; i < dequeues; i++) {
            q.dequeue();
        }
        expect(q).to.have.lengthOf(queues - dequeues);
    });

    it ('Prequeus objects', () => {
        let q = new Queue();
        q.enqueue({num: 1});
        q.enqueue({num: 2});
        q.enqueue({num: 3});
        q.enqueue({num: 4});
        q.enqueue({num: 5});
        q.dequeue();
        q.dequeue();
        q.dequeue();
        let o = q.prequeue();
        expect(o.num).to.equal(2);
        expect(q.peek().num).to.equal(3);
    });

    it('Curqueues objects', () => {
        let q = new Queue();
        q.enqueue({num: 1});
        q.enqueue({num: 2});
        q.enqueue({num: 3});
        q.enqueue({num: 4});
        q.enqueue({num: 5});
        q.dequeue();
        q.dequeue();
        q.dequeue();
        let o = q.curqueue();
        expect(o.num).to.equal(3);
        expect(q.peek().num).to.equal(4);
    });

    it('Registers Start after first dequeue', () => {
        let q = new Queue();
        q.enqueue({num: 1});
        q.enqueue({num: 2});
        q.enqueue({num: 3});
        q.enqueue({num: 4});
        q.enqueue({num: 5});
        q.dequeue();
        expect(q.isStart).to.equal(true);
    });

});