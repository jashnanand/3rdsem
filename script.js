// ===============================
// Content for Sidebar Buttons
// ===============================

const content = {
    btn1: [
        "<h2>HTML</h2><p>HTML is used to create the structure of a web page.</p>",
        "<h2>Elements</h2><p>HTML consists of tags like &lt;h1&gt;, &lt;p&gt;, &lt;img&gt;, etc.</p>",
        "<h2>Example</h2><pre>&lt;h1&gt;Hello World&lt;/h1&gt;</pre>"
    ],

    btn2: [
        "<h2>CSS</h2><p>CSS is used to style a web page.</p>",
        "<h2>Properties</h2><p>Some common properties are color, margin, padding and font-size.</p>",
        "<h2>Example</h2><pre>h1 { color: blue; }</pre>"
    ],

    btn3: [
        "<h2>JavaScript</h2><p>JavaScript makes a webpage interactive.</p>",
        "<h2>Features</h2><p>JavaScript can respond to button clicks and change page content.</p>",
        "<h2>Example</h2><pre>alert('Hello World');</pre>"
    ]
};


// ===============================
// Function to Change Content
// ===============================

function loadContent(button) {

    document.getElementById("box1").innerHTML = content[button][0];
    document.getElementById("box2").innerHTML = content[button][1];
    document.getElementById("box3").innerHTML = content[button][2];

}


// ===============================
// Sidebar Buttons
// ===============================

document.getElementById("btn1").addEventListener("click", function () {
    loadContent("btn1");
});

document.getElementById("btn2").addEventListener("click", function () {
    loadContent("btn2");
});

document.getElementById("btn3").addEventListener("click", function () {
    loadContent("btn3");
});


// ===============================
// Load Default Content
// ===============================

loadContent("btn1");


// ===============================
// Footer Navigation
// ===============================

document.getElementById("homeBtn").addEventListener("click", function () {
    window.location.href = "home.html";
});

document.getElementById("page1Btn").addEventListener("click", function () {
    window.location.href = "page1.html";
});

document.getElementById("page2Btn").addEventListener("click", function () {
    window.location.href = "page2.html";
});

document.getElementById("page3Btn").addEventListener("click", function () {
    window.location.href = "page3.html";
});