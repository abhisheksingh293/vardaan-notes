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
        
        console.log(`\n============ ${chapter} SVGs ============`);
        
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('<svg')) {
                // look 5 lines before and after to get context
                console.log(`--- SVG at line ${i+1} ---`);
                for (let j = Math.max(0, i-2); j < Math.min(lines.length, i+3); j++) {
                    console.log(`L${j+1}: ${lines[j].trim()}`);
                }
            }
            if (lines[i].includes('<img')) {
                console.log(`--- IMG at line ${i+1} ---`);
                for (let j = Math.max(0, i-1); j < Math.min(lines.length, i+2); j++) {
                    console.log(`L${j+1}: ${lines[j].trim()}`);
                }
            }
        }
    }
}
