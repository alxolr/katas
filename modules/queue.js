function Queue(nodes = []) {
  this.nodes = nodes;
  this.length = nodes.length;
}

Queue.prototype.dequeue = function dequeue() {
  const node = this.nodes.splice(0, 1);
  this.length = this.nodes.length;

  return node.pop();
};

Queue.prototype.enqueue = function enqueue(node) {
  this.nodes.push(node);
  this.length = this.nodes.length;
};

module.exports = Queue;
