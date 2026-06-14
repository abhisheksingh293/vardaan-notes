const fs = require('fs');
const glob = require('fs').promises; // we'll just use synchronous fs for simplicity

const baseDir = '.'; // Maths folder
const folders = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('C'))
    .map(dirent => dirent.name);

const targetMediaCSS = /@media\s*\(max-width:\s*768px\)\s*\{\s*\.diagram-container,\s*\.diagram-container:nth-of-type\(even\),\s*\.image-float-right,\s*\.image-float-left\s*\{\s*float:\s*none;\s*width:\s*100%;\s*max-width:\s*100%;\s*min-width:\s*0;\s*margin:\s*12px\s*0;\s*\}/g;

const replacementMediaCSS = `@media (max-width: 768px) {
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
            }`;

let count = 0;

for (const folder of folders) {
    const filePath = `${baseDir}/${folder}/ChapterNotes.html`;
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Let's use a more flexible regex in case formatting differs
        const flexibleRegex = /@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*?\.image-float-left\s*\{[\s\S]*?margin:\s*12px\s*0;\s*\}/;
        
        if (flexibleRegex.test(content)) {
            content = content.replace(flexibleRegex, replacementMediaCSS);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated CSS in ${folder}`);
            count++;
        }
    }
}

console.log(`Successfully patched mobile CSS in ${count} chapters!`);
