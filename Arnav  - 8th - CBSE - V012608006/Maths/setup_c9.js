const fs = require('fs');
const filePath = 'c:/Users/Ankit Raj Sharma/Desktop/Class 6 to 8/Arnav Mishra/Maths/C9_Linear Equations in One Variable/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

const cssBlock = `        /* --- NEWSPAPER STYLE IMAGES --- */
        .image-float-right { float: right; width: 45%; max-width: 360px; margin: 8px 0 14px 18px; border-radius: 0; border: none; box-shadow: none; transition: none; }
        .image-float-left { float: left; width: 45%; max-width: 360px; margin: 8px 18px 14px 0; border-radius: 0; border: none; box-shadow: none; transition: none; }
        html.dark-mode .image-float-right, html.dark-mode .image-float-left { filter: invert(1); opacity: 1; }

        @media (max-width: 768px) {
            .diagram-container,
            .diagram-container:nth-of-type(even),
            .image-float-right,
            .image-float-left {
                float: none !important;
                display: block !important;
                width: 90% !important;
                max-width: 500px !important;
                min-width: 0 !important;
                margin: 20px auto !important;
                clear: both !important;
            }
        }
        /* --- STRICT PRINT CONFIGURATION --- */`;

if (!content.includes('NEWSPAPER STYLE IMAGES')) {
    content = content.replace('/* --- STRICT PRINT CONFIGURATION --- */', cssBlock);
}

const targetImage = `<h2>1. Introduction to Linear Equations</h2>
        <p>
            <img src="../images/C9_LinearEquations.png" alt="Balancing Scale" class="image-float-right ai-image" style="width: 45%; max-width: 360px; margin-top: 5px;">
            Before diving into complex problem-solving`;

// The user's text:
// <h2>1. Introduction to Linear Equations</h2>
//         <p>Before diving into complex problem-solving

const pRegex = /<h2>1\. Introduction to Linear Equations<\/h2>\s*<p>Before diving into complex problem-solving/;
if (pRegex.test(content) && !content.includes('C9_LinearEquations')) {
    content = content.replace(pRegex, targetImage);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("C9 CSS and Image inserted!");
} else {
    console.log("C9 Could not find injection point.");
}
