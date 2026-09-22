console.log("1. Synchronous Code Started");


setImmediate(() => {
    console.log("4. setImmediate() executed");
});


setTimeout(() => {
    console.log("3. setTimeout() executed");
}, 0);

process.nextTick(() => {
    console.log("2. process.nextTick() executed");
});

console.log("1. Synchronous Code Ended");