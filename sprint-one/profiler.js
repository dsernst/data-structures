var stacks = [];
var queues = [];
var tests = 5000;

console.log(variant + " * " + tests);

console.time("stack construction");
for (var example = 0; example < tests; example++){
    if(variant === 'pseudoclassical'){
      stacks[example] = new Stack();
    } else {
      stacks[example] = Stack();
    }
}
console.timeEnd("stack construction");


console.time("queue construction");
for (var example = 0; example < tests; example++){
    if(variant === 'pseudoclassical'){
      queues[example] = new Queue();
    } else {
      queues[example] = Queue();
    }
}
console.timeEnd("queue construction");

console.log("");
