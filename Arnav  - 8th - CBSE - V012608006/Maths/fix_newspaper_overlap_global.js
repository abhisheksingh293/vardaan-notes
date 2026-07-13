const fs = require('fs');
const path = require('path');

const dirs = fs.readdirSync(__dirname, { withFileTypes: true })
               .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('C'))
               .map(dirent => dirent.name);

let modifiedCount = 0;

dirs.forEach(dir => {
    const filePath = path.join(__dirname, dir, 'ChapterNotes.html');
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Remove the flow-root property to allow full width and overlapping
    const bfcFix = `.blue-box, .yellow-box, .green-box, .pink-box {\n            display: flow-root; /* Establishes BFC to prevent background overlap with floated images */\n        }\n        `;
    if (content.includes(bfcFix)) {
        content = content.replace(bfcFix, '');
    }
    
    // 2. Reduce dimensions of diagram-container
    const oldDiagram = `.diagram-container { width: 34%; max-width: 230px; min-width: 170px; float: right; margin: 8px 0 14px 18px; text-align: center; }`;
    const newDiagram = `.diagram-container { width: 28%; max-width: 190px; min-width: 140px; float: right; margin: 8px 0 14px 18px; text-align: center; }`;
    if (content.includes(oldDiagram)) {
        content = content.replace(oldDiagram, newDiagram);
    }
    
    // 3. Reduce dimensions of image-float-right
    const oldRight = `.image-float-right { float: right; width: 32%; max-width: 220px; margin: 8px 0 14px 18px; border-radius: 0; border: none; box-shadow: none; transition: none; }`;
    const newRight = `.image-float-right { float: right; width: 25%; max-width: 180px; margin: 8px 0 14px 18px; border-radius: 0; border: none; box-shadow: none; transition: none; }`;
    if (content.includes(oldRight)) {
        content = content.replace(oldRight, newRight);
    }
    
    // 4. Reduce dimensions of image-float-left
    const oldLeft = `.image-float-left { float: left; width: 32%; max-width: 220px; margin: 8px 18px 14px 0; border-radius: 0; border: none; box-shadow: none; transition: none; }`;
    const newLeft = `.image-float-left { float: left; width: 25%; max-width: 180px; margin: 8px 18px 14px 0; border-radius: 0; border: none; box-shadow: none; transition: none; }`;
    if (content.includes(oldLeft)) {
        content = content.replace(oldLeft, newLeft);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
        console.log(`Updated layout for full-width overlapping in ${dir}`);
    }
});

console.log("Total updated: " + modifiedCount);
