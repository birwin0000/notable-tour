export class Queue {
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
    }
    dequeue() {
        const item = this.elements[this.head];
        this.head++;
        return item;
    }
    prequeue() {
        const item = this.elements[this.head - 2];
        this.head--;
        return item;
    }
    curqueue() {
        const item = this.elements[this.head - 1];
        return item;
    }
    peek() {
        return this.elements[this.head];
    }
    get length() {
        return this.tail - this.head;
    }
    get isEmpty() {
        return this.length === 0;
    }
    get isStart() {
        return this.head === 1;
    }
}