const fs = require('fs');

const baseDir = '.'; // Maths directory
const folders = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('C'))
    .map(dirent => dirent.name);

// 1. Global CSS updates
const cssRegexRight = /\.image-float-right\s*\{\s*float:\s*right;\s*width:\s*\d+%;\s*max-width:\s*\d+px;/g;
const cssRegexLeft = /\.image-float-left\s*\{\s*float:\s*left;\s*width:\s*\d+%;\s*max-width:\s*\d+px;/g;

const inlineStyleRegex = /style="width:\s*\d+%;\s*max-width:\s*\d+px;/g;

folders.forEach(ch => {
    const filePath = `${baseDir}/${ch}/ChapterNotes.html`;
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update CSS classes
        content = content.replace(cssRegexRight, '.image-float-right { float: right; width: 45%; max-width: 360px;');
        content = content.replace(cssRegexLeft, '.image-float-left { float: left; width: 45%; max-width: 360px;');
        
        // Update Inline Styles
        content = content.replace(inlineStyleRegex, 'style="width: 45%; max-width: 360px;');

        // 2. Secretly Fix C6 missing injections from earlier bug
        if (ch === 'C6_Compound Interest') {
            if (!content.includes('C6_InterestGraph.png')) {
                // Inject at <h2>2. Formula
                const t1 = `<h2>2. Formula for Compound Interest`;
                if (content.includes(t1)) {
                    content = content.replace(t1, `<img src="../images/C6_InterestGraph.png" alt="Graph" class="image-float-right ai-image" style="width: 45%; max-width: 360px; margin-top: 5px;">\n        ` + t1);
                }
            }
            if (!content.includes('C6_CompoundingTimeline.png')) {
                // Inject at the yellow box terminology
                const t2 = `<span class="box-label">Important Terminology</span>`;
                if (content.includes(t2)) {
                    content = content.replace(t2, t2 + `\n            <img src="../images/C6_CompoundingTimeline.png" alt="Timeline" class="image-float-right ai-image" style="width: 45%; max-width: 360px; margin-top: 5px;">`);
                }
            }
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
console.log("Global resize to 45% (360px limit) complete.");
