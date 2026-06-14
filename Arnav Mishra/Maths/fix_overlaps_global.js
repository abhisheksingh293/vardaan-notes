const fs = require('fs');
const path = require('path');

const dirs = fs.readdirSync(__dirname, { withFileTypes: true })
               .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('C'))
               .map(dirent => dirent.name);

dirs.forEach(dir => {
    const filePath = path.join(__dirname, dir, 'ChapterNotes.html');
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Clean up my previous overflow: hidden rule if it exists
    content = content.replace('.blue-box, .yellow-box, .green-box, .pink-box { overflow: hidden; /* Fixes overlap with floated images */ }\n        ', '');
    
    const bfcCss = `.blue-box, .yellow-box, .green-box, .pink-box {\n            display: flow-root; /* Establishes BFC to prevent background overlap with floated images */\n        }\n        .blue-box {`;
    
    if (content.includes('.blue-box {') && !content.includes('display: flow-root; /* Establishes BFC')) {
        content = content.replace('.blue-box {', bfcCss);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed overlap CSS in ${dir}`);
    }
});
