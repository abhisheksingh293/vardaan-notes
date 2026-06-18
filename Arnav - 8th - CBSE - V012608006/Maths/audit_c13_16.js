const fs = require('fs');
const path = require('path');

const basePath = 'c:/Users/Ankit Raj Sharma/Desktop/Class 6 to 8/Arnav Mishra/Maths';
const chapters = [
    'C13_Introduction to Graphs',
    'C14_Mensuration',
    'C15_Statistics and Probability',
    'C16_Rotational Symmetry'
];

for (const chapter of chapters) {
    const filePath = path.join(basePath, chapter, 'ChapterNotes.html');
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const svgMatches = content.match(/<svg/g);
        console.log(`\n============ ${chapter} ============`);
        console.log(`Length: ${content.length} bytes`);
        console.log(`SVGs count: ${svgMatches ? svgMatches.length : 0}`);
        if (content.length < 100) {
            console.log("WARNING: File appears to be empty or missing content.");
        }
    } else {
        console.log(`\n============ ${chapter} ============`);
        console.log("File not found.");
    }
}
