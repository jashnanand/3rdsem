console.log("1. Synchronous Code Started");

// 2. setImmediate (Check Phase)
setImmediate(() => {
    console.log("4. setImmediate() executed");
});

// 3. setTimeout (Timers Phase)
setTimeout(() => {
    console.log("3. setTimeout() executed");
}, 0);

// 4. process.nextTick (Microtask)
process.nextTick(() => {
    console.log("2. process.nextTick() executed");
});

console.log("1. Synchronous Code Ended");