var Queue = {
    elements: {},
    head: 0,
    tail: 0,
    enqueue: function(element) {
        this.elements[this.tail] = element;
        this.tail++;
    },
    dequeue: function() {
        const item = this.elements[this.head];
        this.head++;
        return item;
    },
    prequeue: function() {
        const item = this.elements[this.head - 2];
        this.head--;
        return item;
    },
    curqueue: function() {
        const item = this.elements[this.head - 1];
        return item;
    },
    peek: function() {
        return this.elements[this.head];
    },
    length: function() {
        return this.tail - this.head;
    },
    isEmpty: function() {
        return this.length() === 0;
    },
    isStart: function() {
        return this.head === 1;
    },
    clear: function() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
}

export default Queue;
// module.exports.Queue = Queue;