// Data to be used.
const students = [
    { name: "Aisha", score: 85 },
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

// 2. ARROW FUNCTION
const addNumbers = (a, b) => a + b;
console.log("Arrow function result:", addNumbers(5, 7));

// 3. ARRAYS (forEach, map, filter, reduce)

// forEach
console.log("Student Names and Score:");
students.forEach(
    student => console.log(`${student.name}: ${student.score}`)
);

// map
const scores = students.map(student => student.score);
console.log("Mapped Scores:", scores);

// filter 
const passedStudents = students.filter(student => student.score >= 50);
console.log("Filtered (Passed Students):", passedStudents);


// reduce
const totalScore = students.reduce((total, student) => total + student.score, 0);
console.log("Total Score:", totalScore);


 // 4. OBJECTS & DESTRUCTURING
let school = {
    name: "Flexisaf Edu",
    location: "Hybrid",
    studentsCount: students.length
};

let { name: schoolName, location: schoolLocation } = school;
console.log("School Name:", schoolName);
console.log("School Location:", schoolLocation);



 // 5. HTML PAGE ARRAY IMPLEMENTATION
const displayStudents = () => {
    const table = document.getElementById("table");
    table.classList.remove("d-none");
    
    if(!table.classList.contains("filled")){
        students.forEach(({ name, score }) => {
            const tbody = document.getElementById("table-body");
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${name}</td>
            <td>${score}</td>`;
            
            tbody.appendChild(row);
           
        })
    }
    table.classList.add("filled");
    console.log("Table Data Filled");
}
