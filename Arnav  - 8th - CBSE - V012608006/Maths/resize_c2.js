const fs = require('fs');
const filePath = 'C2_Cubes and Cube Roots/ChapterNotes.html';
let content = fs.readFileSync(filePath, 'utf8');

const t1 = `style="width: 45%; max-width: 320px; margin-top: 5px;"`;
const t2 = `style="width: 45%; max-width: 310px; margin-top: 5px;"`; // fallback
const r1 = `style="width: 30%; max-width: 200px; margin-top: 5px;"`;

content = content.replace(/style="width: 45%; max-width: 320px; margin-top: 5px;"/g, r1);

// Let's also ensure no overlap issues happen
fs.writeFileSync(filePath, content, 'utf8');
console.log("Reduced image sizes in C2 to prevent huge whitespace/clearfix drop-down issues.");
