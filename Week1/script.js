// Data to be used.
const students = [
    { name: "Asha", score: 85 },
    { name: "David", score: 42 },
    { name: "Musa", score: 67 },
    { name: "Zainab", score: 90 },
    { name: "John", score: 30 }
]

// 1. Scope: var, let, const

function scopeDemo() {
    {
        var x = 5;
        let y = 10;
        const z = 20;

        console.log("Inside block:", y, z);
    }

    // this will work regardless because in this case it is Function scope
    console.log('outside block:', x);

    // Uncommenting below lines will cause an error
    // because these(let, const) are block scope.

    // console.log('outside block:', y);
    // console.log('outside block:', z);
}
scopeDemo();
